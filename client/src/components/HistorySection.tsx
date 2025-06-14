import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Target, Flame, Clock, Filter, Search, Undo, Tag } from 'lucide-react';
import { getState, subscribe, uncompleteTodo, uncompleteHabit, formatDate } from '../utils/globalState';

const HistorySection: React.FC = () => {
  const [state, setState] = useState(getState());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Tags');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  
  useEffect(() => {
    return subscribe(setState);
  }, []);

  const { history, tags } = state;
  const categories = ['All Tags', ...tags];
  const types = ['All Types', 'todo', 'habit'];

  // Filter history data
  const filteredHistory = history.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Tags' || item.tags.includes(selectedCategory);
    const matchesType = selectedType === 'All Types' || item.type === selectedType;
    const matchesDate = !selectedDate || item.timestamp.startsWith(selectedDate);
    
    return matchesSearch && matchesCategory && matchesType && matchesDate;
  });

  const getActionColor = (action: string) => {
    switch (action) {
      case 'completed': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30';
      case 'uncompleted': return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30';
      case 'added': return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30';
      case 'edited': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30';
      case 'deleted': return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'todo' ? <Target className="w-4 h-4" /> : <Flame className="w-4 h-4" />;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: formatDate(timestamp),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400';
      case 'hard': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400';
      case 'extreme': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">History</h1>
        <p className="text-gray-600 dark:text-gray-300">Track your activity and see what you've accomplished</p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200/50 dark:border-gray-700/50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4 pointer-events-none" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {types.map(type => (
              <option key={type} value={type}>
                {type === 'All Types' ? 'All Types' : type === 'todo' ? 'To Dos' : 'Habits'}
              </option>
            ))}
          </select>

          {/* Date Filter */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* History List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200/50 dark:border-gray-700/50">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
            Activity History ({filteredHistory.length})
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
          {filteredHistory.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
              <p>No activity found</p>
              <p className="text-sm">Try adjusting your filters or add some to dos and habits!</p>
            </div>
          ) : (
            filteredHistory.map(item => {
              const { date, time } = formatTimestamp(item.timestamp);
              return (
                <div key={item.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-start space-x-3">
                    {/* Type Icon */}
                    <div className={`p-2 rounded-lg ${item.type === 'todo' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'}`}>
                      {getTypeIcon(item.type)}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2 mb-1">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${getActionColor(item.action)}`}>
                          {item.action}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(item.difficulty)}`}>
                          {item.difficulty}
                        </span>
                        {item.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1">{item.title}</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {date}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {time}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm">
                          {(item.expGained !== undefined || item.healthChange !== undefined) && (
                            <>
                              {item.expGained !== undefined && item.expGained !== 0 && (
                                <span className={`px-2 py-1 rounded-full ${item.expGained > 0 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'}`}>
                                  {item.expGained > 0 ? '+' : ''}{item.expGained} EXP
                                </span>
                              )}
                              {item.healthChange !== undefined && item.healthChange !== 0 && (
                                <span className={`px-2 py-1 rounded-full ${item.healthChange > 0 ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'}`}>
                                  {item.healthChange > 0 ? '+' : ''}{item.healthChange} HP
                                </span>
                              )}
                            </>
                          )}
                          {item.action === 'completed' && (
                            <button
                              onClick={() => {
                                const itemToFind = item.type === 'todo' 
                                  ? state.todos.find(t => t.title === item.title)
                                  : state.habits.find(h => h.title === item.title);
                                
                                if (itemToFind) {
                                  if (item.type === 'todo') {
                                    uncompleteTodo(itemToFind.id);
                                  } else {
                                    uncompleteHabit(itemToFind.id);
                                  }
                                }
                              }}
                              className="text-gray-400 hover:text-blue-600 transition-colors"
                              title="Undo this completion"
                            >
                              <Undo className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default HistorySection;