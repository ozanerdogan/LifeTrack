import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Target, CheckCircle, Tag } from 'lucide-react';
import { getState, subscribe } from '../utils/globalState';

const ProgressSection: React.FC = () => {
  const [state, setState] = useState(getState());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  useEffect(() => {
    return subscribe(setState);
  }, []);

  // Generate calendar data for each tag based on actual completion history
  const generateTagCalendarData = (tag: string) => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
    const data = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      data.push({ day: null, intensity: 0 });
    }

    // Calculate actual completions for each day
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      // Count completions for this tag on this day from history
      // Only count positive progress (todos and positive habits)
      const completions = state.history.filter(entry => {
        const entryDate = entry.timestamp.split('T')[0];
        if (entryDate !== dateStr || entry.action !== 'completed' || !entry.tags.includes(tag)) {
          return false;
        }
        
        // Include all todo completions
        if (entry.type === 'todo') {
          return true;
        }
        
        // For habits, only include positive habits
        if (entry.type === 'habit') {
          const habit = state.habits.find(h => h.title === entry.title);
          return habit && habit.type === 'positive';
        }
        
        return false;
      }).length;

      // Convert to intensity (0-4 scale)
      const intensity = Math.min(4, completions);
      data.push({ day, intensity });
    }

    return data;
  };

  // Get tag color based on index
  const getTagColor = (index: number) => {
    const colorSchemes = [
      { bg: ['bg-blue-100', 'bg-blue-200', 'bg-blue-400', 'bg-blue-600'], accent: 'bg-blue-50 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' },
      { bg: ['bg-emerald-100', 'bg-emerald-200', 'bg-emerald-400', 'bg-emerald-600'], accent: 'bg-emerald-50 dark:bg-emerald-900/30', text: 'text-emerald-600 dark:text-emerald-400' },
      { bg: ['bg-purple-100', 'bg-purple-200', 'bg-purple-400', 'bg-purple-600'], accent: 'bg-purple-50 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400' },
      { bg: ['bg-orange-100', 'bg-orange-200', 'bg-orange-400', 'bg-orange-600'], accent: 'bg-orange-50 dark:bg-orange-900/30', text: 'text-orange-600 dark:text-orange-400' },
      { bg: ['bg-pink-100', 'bg-pink-200', 'bg-pink-400', 'bg-pink-600'], accent: 'bg-pink-50 dark:bg-pink-900/30', text: 'text-pink-600 dark:text-pink-400' },
      { bg: ['bg-cyan-100', 'bg-cyan-200', 'bg-cyan-400', 'bg-cyan-600'], accent: 'bg-cyan-50 dark:bg-cyan-900/30', text: 'text-cyan-600 dark:text-cyan-400' }
    ];
    return colorSchemes[index % colorSchemes.length];
  };

  const getIntensityColor = (intensity: number, colorScheme: any) => {
    if (intensity === 0) return 'bg-gray-100 dark:bg-gray-700';
    return colorScheme.bg[intensity - 1];
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get statistics for each tag
  const getTagStats = (tag: string) => {
    const todoItems = state.todos.filter(t => t.tags.includes(tag));
    const positiveHabitItems = state.habits.filter(h => h.tags.includes(tag) && h.type === 'positive');
    const completedTodos = todoItems.filter(t => t.completed).length;
    
    // Only count completions from todos and positive habits
    const completions = state.history.filter(entry => {
      if (entry.action !== 'completed' || !entry.tags.includes(tag)) {
        return false;
      }
      
      // Include all todo completions
      if (entry.type === 'todo') {
        return true;
      }
      
      // For habits, only include positive habits
      if (entry.type === 'habit') {
        const habit = state.habits.find(h => h.title === entry.title);
        return habit && habit.type === 'positive';
      }
      
      return false;
    }).length;
    
    return {
      totalItems: todoItems.length + positiveHabitItems.length,
      completedItems: completions,
      completionRate: todoItems.length > 0 ? (completedTodos / todoItems.length) * 100 : 0
    };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Progress by Tags</h1>
        <p className="text-gray-600 dark:text-gray-300">Track your monthly progress across different categories</p>
      </div>

      {/* Month/Year Selector */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {monthNames[selectedMonth]} {selectedYear}
            </h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {monthNames.map((month, index) => (
                <option key={index} value={index}>{month}</option>
              ))}
            </select>
            
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {[2023, 2024, 2025].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tag Heatmaps */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {state.tags.map((tag, index) => {
          const tagData = generateTagCalendarData(tag);
          const colorScheme = getTagColor(index);
          const stats = getTagStats(tag);
          
          return (
            <div key={tag} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 ${colorScheme.accent} ${colorScheme.text} rounded-lg`}>
                    <Tag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">#{tag}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Activity in this category</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`text-2xl font-bold ${colorScheme.text}`}>{stats.completedItems}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">completions</p>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="space-y-2">
                {/* Day headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {dayNames.map(day => (
                    <div key={day} className="text-xs text-gray-500 dark:text-gray-400 text-center py-1">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar days */}
                <div className="grid grid-cols-7 gap-1">
                  {tagData.map((item, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`
                        aspect-square rounded-sm flex items-center justify-center text-xs
                        ${item.day ? getIntensityColor(item.intensity, colorScheme) : ''}
                        ${item.day ? 'hover:ring-2 hover:ring-gray-300 cursor-pointer' : ''}
                        ${item.intensity > 2 ? 'text-white' : 'text-gray-700 dark:text-gray-300'}
                      `}
                      title={item.day ? `${item.intensity} ${tag} completions on day ${item.day}` : ''}
                    >
                      {item.day}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend and Stats */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Less</span>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-gray-100 dark:bg-gray-700 rounded-sm"></div>
                    {colorScheme.bg.map((color, i) => (
                      <div key={i} className={`w-3 h-3 ${color} rounded-sm`}></div>
                    ))}
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">More</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>{stats.totalItems} items</span>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Show message if no tags exist */}
        {state.tags.length === 0 && (
          <div className="col-span-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-12 border border-gray-200/50 dark:border-gray-700/50 text-center">
            <Tag className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No tags yet</h3>
            <p className="text-gray-600 dark:text-gray-300">Start adding tags to your tasks and habits to see progress tracking here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressSection;