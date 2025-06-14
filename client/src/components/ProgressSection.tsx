import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Target, CheckCircle } from 'lucide-react';
import { getState, subscribe } from '../utils/globalState';

const ProgressSection: React.FC = () => {
  const [state, setState] = useState(getState());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  useEffect(() => {
    return subscribe(setState);
  }, []);

  // Generate calendar data for heatmap
  const generateCalendarData = (type: 'todos' | 'habits') => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
    const data = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      data.push({ day: null, intensity: 0 });
    }

    // Add days of the month with random completion data
    for (let day = 1; day <= daysInMonth; day++) {
      const intensity = Math.random();
      data.push({ 
        day, 
        intensity: intensity > 0.3 ? Math.floor(intensity * 4) + 1 : 0 
      });
    }

    return data;
  };

  const todoData = generateCalendarData('todos');
  const habitData = generateCalendarData('habits');

  const getIntensityColor = (intensity: number, type: 'todos' | 'habits') => {
    if (intensity === 0) return 'bg-gray-100';
    
    const colors = {
      todos: [
        'bg-blue-100',
        'bg-blue-200', 
        'bg-blue-400',
        'bg-blue-600'
      ],
      habits: [
        'bg-emerald-100',
        'bg-emerald-200',
        'bg-emerald-400', 
        'bg-emerald-600'
      ]
    };
    
    return colors[type][intensity - 1];
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const stats = {
    totalTasks: state.todos.length,
    completedTasks: state.todos.filter(t => t.completed).length,
    totalHabits: state.habits.length,
    streak: Math.max(...state.habits.map(h => h.streak), 0),
    weekProgress: state.todos.length > 0 ? state.todos.filter(t => t.completed).length / state.todos.length : 0
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Progress</h1>
        <p className="text-gray-600">Track your monthly progress with visual heatmaps</p>
      </div>

      {/* Month/Year Selector */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              {monthNames[selectedMonth]} {selectedYear}
            </h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {monthNames.map((month, index) => (
                <option key={index} value={index}>{month}</option>
              ))}
            </select>
            
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {[2023, 2024, 2025].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Heatmap Calendars */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Todos Heatmap */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Tasks Completed</h3>
                <p className="text-sm text-gray-600">Daily task completion heatmap</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{stats.todos.completed}</p>
              <p className="text-sm text-gray-600">of {stats.todos.total} tasks</p>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="space-y-2">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map(day => (
                <div key={day} className="text-xs text-gray-500 text-center py-1">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {todoData.map((item, index) => (
                <div
                  key={index}
                  className={`
                    aspect-square rounded-sm flex items-center justify-center text-xs
                    ${item.day ? getIntensityColor(item.intensity, 'todos') : ''}
                    ${item.day ? 'hover:ring-2 hover:ring-blue-300 cursor-pointer' : ''}
                    ${item.intensity > 2 ? 'text-white' : 'text-gray-700'}
                  `}
                  title={item.day ? `${item.day} tasks completed` : ''}
                >
                  {item.day}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-600">Less</span>
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
                <div className="w-3 h-3 bg-blue-100 rounded-sm"></div>
                <div className="w-3 h-3 bg-blue-200 rounded-sm"></div>
                <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
                <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
              </div>
              <span className="text-xs text-gray-600">More</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4" />
              <span>{stats.todos.streak} day streak</span>
            </div>
          </div>
        </div>

        {/* Habits Heatmap */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Habits Completed</h3>
                <p className="text-sm text-gray-600">Daily habit completion heatmap</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{stats.habits.completed}</p>
              <p className="text-sm text-gray-600">of {stats.habits.total} habits</p>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="space-y-2">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map(day => (
                <div key={day} className="text-xs text-gray-500 text-center py-1">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {habitData.map((item, index) => (
                <div
                  key={index}
                  className={`
                    aspect-square rounded-sm flex items-center justify-center text-xs
                    ${item.day ? getIntensityColor(item.intensity, 'habits') : ''}
                    ${item.day ? 'hover:ring-2 hover:ring-emerald-300 cursor-pointer' : ''}
                    ${item.intensity > 2 ? 'text-white' : 'text-gray-700'}
                  `}
                  title={item.day ? `${item.day} habits completed` : ''}
                >
                  {item.day}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-600">Less</span>
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
                <div className="w-3 h-3 bg-emerald-100 rounded-sm"></div>
                <div className="w-3 h-3 bg-emerald-200 rounded-sm"></div>
                <div className="w-3 h-3 bg-emerald-400 rounded-sm"></div>
                <div className="w-3 h-3 bg-emerald-600 rounded-sm"></div>
              </div>
              <span className="text-xs text-gray-600">More</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4" />
              <span>{stats.habits.streak} day streak</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;