import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Target, Flame, Clock, Filter, Search, Undo } from 'lucide-react';
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
      case 'completed': return 'text-green-600 bg-green-50';
      case 'uncompleted': return 'text-orange-600 bg-orange-50';
      case 'added': return 'text-blue-600 bg-blue-50';
      case 'edited': return 'text-yellow-600 bg-yellow-50';
      case 'deleted': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
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
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-orange-100 text-orange-800';
      case 'extreme': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">History</h1>
        <p className="text-gray-600">Track your activity and see what you've accomplished</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* History List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Clock className="w-5 h-5 text-blue-600 mr-2" />
            Activity History ({filteredHistory.length})
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
          {filteredHistory.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No activity found</p>
              <p className="text-sm">Try adjusting your filters or add some to dos and habits!</p>
            </div>
          ) : (
            filteredHistory.map(item => {
              const { date, time } = formatTimestamp(item.timestamp);
              return (
                <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-3">
                    {/* Type Icon */}
                    <div className={`p-2 rounded-lg ${item.type === 'todo' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
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
                          <span key={tag} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
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
                                <span className={`px-2 py-1 rounded-full ${item.expGained > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                  {item.expGained > 0 ? '+' : ''}{item.expGained} EXP
                                </span>
                              )}
                              {item.healthChange !== undefined && item.healthChange !== 0 && (
                                <span className={`px-2 py-1 rounded-full ${item.healthChange > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
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