import React, { useState } from 'react';
import { Plus, CheckCircle, Circle, Target, Flame, TrendingUp, Calendar, Heart, Star, Search, Filter, Minus, X } from 'lucide-react';

const Dashboard: React.FC = () => {
  // State for stats
  const [health, setHealth] = useState(33);
  const [maxHealth] = useState(50);
  const [exp, setExp] = useState(12);
  const [maxExp] = useState(100);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<number | null>(null);

  // Todo data with additional details
  const [todos, setTodos] = useState([
    { 
      id: 1, 
      text: 'Review project proposal', 
      completed: false, 
      priority: 'high',
      date: '2024-06-15',
      tag: 'Work',
      subtodos: ['Check budget section', 'Review timeline', 'Validate requirements']
    },
    { 
      id: 2, 
      text: 'Call dentist for appointment', 
      completed: true, 
      priority: 'medium',
      date: '2024-06-14',
      tag: 'Health',
      subtodos: []
    },
    { 
      id: 3, 
      text: 'Buy groceries for dinner', 
      completed: false, 
      priority: 'low',
      date: '2024-06-15',
      tag: 'Personal',
      subtodos: ['Vegetables', 'Protein', 'Spices']
    },
  ]);

  // Habit data
  const [habits, setHabits] = useState([
    { id: 1, name: 'Morning Exercise', completed: true, streak: 6, type: 'daily' },
    { id: 2, name: 'Read 30 minutes', completed: false, streak: 4, type: 'daily' },
    { id: 3, name: 'Weekly Review', completed: false, streak: 2, type: 'weekly' },
    { id: 4, name: 'Meditation', completed: false, streak: 3, type: 'daily' },
  ]);

  const toggleTodo = (todoId: number) => {
    setTodos(prev => prev.map(todo => {
      if (todo.id === todoId) {
        const newCompleted = !todo.completed;
        if (newCompleted) {
          setExp(prev => Math.min(prev + 1, maxExp));
        }
        return { ...todo, completed: newCompleted };
      }
      return todo;
    }));
  };

  const toggleHabit = (habitId: number) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const newCompleted = !habit.completed;
        if (newCompleted) {
          setExp(prev => Math.min(prev + 1, maxExp));
        }
        return { ...habit, completed: newCompleted };
      }
      return habit;
    }));
  };

  const adjustHealth = (amount: number) => {
    setHealth(prev => Math.max(0, Math.min(prev + amount, maxHealth)));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getHabitColor = (color: string) => {
    const colors = {
      emerald: 'from-emerald-400 to-emerald-600',
      blue: 'from-blue-400 to-blue-600',
      cyan: 'from-cyan-400 to-cyan-600',
      purple: 'from-purple-400 to-purple-600',
      orange: 'from-orange-400 to-orange-600',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-8">
      {/* Top Section - Avatar and Health/Exp Bars */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-gray-200/50">
        <div className="flex items-center space-x-6">
          {/* Avatar on the left */}
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
            <span className="text-white font-bold text-xl">JD</span>
          </div>
          
          {/* Health and Exp bars on the right */}
          <div className="flex-1 space-y-4">
            <div className="text-left">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back, John!</h1>
              <p className="text-gray-600">Let's make today productive</p>
            </div>

            {/* Health Bar */}
            <div className="flex items-center space-x-3">
              <Heart className="w-6 h-6 text-red-500" />
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-6">
                  <div
                    className="bg-gradient-to-r from-red-500 to-red-600 h-6 rounded-full transition-all duration-500"
                    style={{ width: `${(health / maxHealth) * 100}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700 min-w-[50px]">{health}/{maxHealth}</span>
            </div>

            {/* Experience Bar */}
            <div className="flex items-center space-x-3">
              <Star className="w-6 h-6 text-yellow-500" />
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-6">
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-6 rounded-full transition-all duration-500"
                    style={{ width: `${(exp / maxExp) * 100}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700 min-w-[50px]">{exp}/{maxExp}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tasks and habits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700">Tags</span>
          </button>
        </div>
      </div>

      {/* Main Content - Two Segments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Segment - To Do */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Target className="w-6 h-6 mr-2 text-blue-600" />
              To Do
            </h2>
            <button className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            {todos.filter(todo => 
              todo.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
              todo.tag.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((todo) => (
              <div key={todo.id}>
                <div
                  className={`group flex items-center space-x-3 p-4 rounded-lg border-l-4 transition-all duration-200 hover:shadow-md cursor-pointer ${getPriorityColor(todo.priority)}`}
                  onClick={() => setSelectedTodo(selectedTodo === todo.id ? null : todo.id)}
                >
                  <button 
                    className="flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTodo(todo.id);
                    }}
                  >
                    {todo.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                    )}
                  </button>
                  <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {todo.text}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{todo.tag}</span>
                  </div>
                </div>
                
                {/* Todo Details Popup */}
                {selectedTodo === todo.id && (
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg border">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium text-gray-900">{todo.text}</h3>
                      <button 
                        onClick={() => setSelectedTodo(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>Date:</strong> {todo.date}</p>
                      <p><strong>Tag:</strong> {todo.tag}</p>
                      <p><strong>Priority:</strong> {todo.priority}</p>
                      {todo.subtodos.length > 0 && (
                        <div>
                          <strong>Sub-tasks:</strong>
                          <ul className="mt-1 ml-4 space-y-1">
                            {todo.subtodos.map((subtodo, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <Circle className="w-3 h-3 text-gray-400" />
                                <span>{subtodo}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Segment - Habits */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Flame className="w-6 h-6 mr-2 text-emerald-600" />
              Habits
            </h2>
            <button className="flex items-center justify-center w-8 h-8 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors">
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            {habits.filter(habit => 
              habit.name.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((habit) => (
              <div
                key={habit.id}
                className="group flex items-center space-x-3 p-4 rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-md"
              >
                <button 
                  className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-red-400 hover:border-red-500 flex items-center justify-center text-red-500 hover:bg-red-50"
                  onClick={() => adjustHealth(-1)}
                >
                  <Minus className="w-3 h-3" />
                </button>
                
                <button 
                  className="flex-shrink-0"
                  onClick={() => toggleHabit(habit.id)}
                >
                  {habit.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400 group-hover:text-emerald-500" />
                  )}
                </button>
                
                <div className="flex-1">
                  <span className={`block ${habit.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {habit.name}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">{habit.type}</span>
                </div>
                
                {habit.streak > 0 && (
                  <div className="flex items-center space-x-1 text-orange-600">
                    <Flame className="w-4 h-4" />
                    <span className="text-sm font-medium">{habit.streak}</span>
                  </div>
                )}
                
                <button 
                  className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-green-400 hover:border-green-500 flex items-center justify-center text-green-500 hover:bg-green-50"
                  onClick={() => adjustHealth(1)}
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;