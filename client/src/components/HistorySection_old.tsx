import React, { useState } from 'react';
import { Calendar, CheckCircle, Target, Search, Filter, Clock } from 'lucide-react';

const HistorySection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const completedTodos = [
    { id: 1, text: 'Review project proposal', completedAt: '2024-01-15 14:30', category: 'work' },
    { id: 2, text: 'Call dentist for appointment', completedAt: '2024-01-15 11:20', category: 'personal' },
    { id: 3, text: 'Update portfolio website', completedAt: '2024-01-14 16:45', category: 'work' },
    { id: 4, text: 'Buy groceries for dinner', completedAt: '2024-01-14 09:15', category: 'personal' },
    { id: 5, text: 'Finish quarterly report', completedAt: '2024-01-13 17:30', category: 'work' },
    { id: 6, text: 'Plan weekend trip', completedAt: '2024-01-13 12:00', category: 'personal' },
    { id: 7, text: 'Submit expense reports', completedAt: '2024-01-12 15:20', category: 'work' },
    { id: 8, text: 'Clean garage', completedAt: '2024-01-12 10:30', category: 'personal' },
  ];

  const completedHabits = [
    { id: 1, name: 'Morning Exercise', completedAt: '2024-01-15 07:00', streak: 6, category: 'health' },
    { id: 2, name: 'Drink 8 glasses water', completedAt: '2024-01-15 20:00', streak: 8, category: 'health' },
    { id: 3, name: 'Write in Journal', completedAt: '2024-01-15 22:30', streak: 2, category: 'personal' },
    { id: 4, name: 'Read 30 minutes', completedAt: '2024-01-14 19:45', streak: 4, category: 'learning' },
    { id: 5, name: 'Meditation', completedAt: '2024-01-14 06:30', streak: 3, category: 'wellness' },
    { id: 6, name: 'Morning Exercise', completedAt: '2024-01-14 07:15', streak: 5, category: 'health' },
    { id: 7, name: 'Drink 8 glasses water', completedAt: '2024-01-14 21:00', streak: 7, category: 'health' },
    { id: 8, name: 'Write in Journal', completedAt: '2024-01-13 23:00', streak: 1, category: 'personal' },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      work: 'bg-blue-50 text-blue-700',
      personal: 'bg-purple-50 text-purple-700',
      health: 'bg-emerald-50 text-emerald-700',
      learning: 'bg-orange-50 text-orange-700',
      wellness: 'bg-pink-50 text-pink-700'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-50 text-gray-700';
  };

  const filteredTodos = completedTodos.filter(todo => {
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || todo.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredHabits = completedHabits.filter(habit => {
    const matchesSearch = habit.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || habit.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">History</h1>
        <p className="text-gray-600">Review your completed tasks and habits</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search completed items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="all">All Tags</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="health">Health</option>
              <option value="learning">Learning</option>
              <option value="wellness">Wellness</option>
            </select>
          </div>
        </div>
      </div>

      {/* History Content - Two Segments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Completed Tasks */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden">
          <div className="p-6 border-b border-gray-200/50">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Completed To Dos</h2>
                <p className="text-sm text-gray-600">{filteredTodos.length} to dos completed</p>
              </div>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 font-medium">{todo.text}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{formatDate(todo.completedAt)}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(todo.category)}`}>
                      {todo.category}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No completed tasks found</p>
              </div>
            )}
          </div>
        </div>

        {/* Completed Habits */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden">
          <div className="p-6 border-b border-gray-200/50">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Completed Habits</h2>
                <p className="text-sm text-gray-600">{filteredHabits.length} habits completed</p>
              </div>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {filteredHabits.length > 0 ? (
              filteredHabits.map((habit) => (
                <div
                  key={habit.id}
                  className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <Target className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 font-medium">{habit.name}</p>
                        <div className="flex items-center space-x-3 mt-1">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{formatDate(habit.completedAt)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-orange-600">🔥 {habit.streak} streak</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(habit.category)}`}>
                      {habit.category}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                <Target className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No completed habits found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistorySection;