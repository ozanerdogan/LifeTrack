
import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle, Circle, Target, Flame, TrendingUp, Calendar, Heart, Star, Search, Filter, Minus, X, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { getState, subscribe, addTodo, updateTodo, completeTodo, deleteTodo, addHabit, updateHabit, completeHabit, deleteHabit, addTag, Todo, Habit } from '../utils/globalState';

interface DashboardProps {
  avatar: string;
}

const Dashboard: React.FC<DashboardProps> = ({ avatar }) => {
  // State for stats
  const [health, setHealth] = useState(33);
  const [maxHealth] = useState(50);
  const [exp, setExp] = useState(12);
  const [maxExp] = useState(100);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<number | null>(null);
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [showHabitModal, setShowHabitModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState<any>(null);
  const [editingHabit, setEditingHabit] = useState<any>(null);

  // Todo data with additional details
  const [todos, setTodos] = useState([
    { 
      id: 1, 
      text: 'Review project proposal', 
      completed: false, 
      priority: 'high',
      date: '2024-06-15',
      tag: 'Work',
      subtodos: ['Check budget section', 'Review timeline', 'Validate requirements'],
      difficulty: 'hard',
      description: 'Complete review of the Q2 project proposal'
    },
    { 
      id: 2, 
      text: 'Call dentist for appointment', 
      completed: true, 
      priority: 'medium',
      date: '2024-06-14',
      tag: 'Health',
      subtodos: [],
      difficulty: 'easy',
      description: 'Schedule routine dental checkup'
    },
    { 
      id: 3, 
      text: 'Buy groceries for dinner', 
      completed: false, 
      priority: 'low',
      date: '2024-06-15',
      tag: 'Personal',
      subtodos: ['Vegetables', 'Protein', 'Spices'],
      difficulty: 'medium',
      description: 'Shopping for tonight\'s meal preparation'
    },
  ]);

  // Habit data
  const [habits, setHabits] = useState([
    { id: 1, name: 'Morning Exercise', completed: true, streak: 6, type: 'daily', isPositive: true, difficulty: 'medium', tag: 'Health' },
    { id: 2, name: 'Read 30 minutes', completed: false, streak: 4, type: 'daily', isPositive: true, difficulty: 'easy', tag: 'Learning' },
    { id: 3, name: 'Weekly Review', completed: false, streak: 2, type: 'weekly', isPositive: true, difficulty: 'hard', tag: 'Productivity' },
    { id: 4, name: 'Meditation', completed: false, streak: 3, type: 'daily', isPositive: true, difficulty: 'easy', tag: 'Wellness' },
  ]);

  const toggleTodo = (todoId: number) => {
    setTodos(prev => prev.map(todo => {
      if (todo.id === todoId) {
        const newCompleted = !todo.completed;
        if (newCompleted) {
          const expGain = todo.difficulty === 'easy' ? 1 : 
                         todo.difficulty === 'medium' ? 2 : 
                         todo.difficulty === 'hard' ? 3 : 4;
          setExp(prev => Math.min(prev + expGain, maxExp));
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
          if (habit.isPositive) {
            const healthGain = habit.difficulty === 'easy' ? 1 : 
                              habit.difficulty === 'medium' ? 2 : 
                              habit.difficulty === 'hard' ? 3 : 4;
            setHealth(prev => Math.min(prev + healthGain, maxHealth));
          }
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
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-gray-200/50 relative overflow-hidden">
        {/* Background Art */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10">
          <svg viewBox="0 0 200 150" className="w-full h-full">
            {/* Simple forest background */}
            <rect width="200" height="150" fill="#e8f5e8"/>
            <polygon points="20,150 30,120 40,150" fill="#228B22"/>
            <polygon points="35,150 45,115 55,150" fill="#32CD32"/>
            <polygon points="50,150 60,125 70,150" fill="#228B22"/>
            <polygon points="80,150 90,110 100,150" fill="#32CD32"/>
            <polygon points="120,150 130,120 140,150" fill="#228B22"/>
            <polygon points="150,150 160,115 170,150" fill="#32CD32"/>
            <circle cx="25" cy="130" r="15" fill="#90EE90"/>
            <circle cx="85" cy="125" r="18" fill="#90EE90"/>
            <circle cx="155" cy="128" r="16" fill="#90EE90"/>
          </svg>
        </div>
        
        <div className="flex items-center space-x-6 relative z-10">
          {/* Avatar on the left */}
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
            <span className="text-white font-bold text-xl">{avatar}</span>
          </div>
          
          {/* Health and Exp bars - shortened */}
          <div className="flex-1 max-w-md space-y-4">
            <div className="text-left">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back, John!</h1>
              <p className="text-gray-600">Let's make today productive</p>
            </div>

            {/* Health Bar */}
            <div className="flex items-center space-x-3">
              <Heart className="w-6 h-6 text-red-500" />
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-5">
                  <div
                    className="bg-gradient-to-r from-red-500 to-red-600 h-5 rounded-full transition-all duration-500"
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
                <div className="w-full bg-gray-200 rounded-full h-5">
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-5 rounded-full transition-all duration-500"
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
        <div className="flex items-center justify-center gap-4">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search to dos and habits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Tags</option>
            <option value="work">Work</option>
            <option value="health">Health</option>
            <option value="personal">Personal</option>
          </select>
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
                  onDoubleClick={() => {
                    setEditingTodo(todo);
                    setShowTodoModal(true);
                  }}
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
            <button 
              onClick={() => {
                setEditingHabit(null);
                setShowHabitModal(true);
              }}
              className="flex items-center justify-center w-8 h-8 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            {habits.filter(habit => 
              habit.name.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((habit) => (
              <div
                key={habit.id}
                className="group flex items-center space-x-3 p-4 rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-md cursor-pointer"
                onDoubleClick={() => {
                  setEditingHabit(habit);
                  setShowHabitModal(true);
                }}
              >
                <button 
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    habit.isPositive === false 
                      ? 'border-red-400 hover:border-red-500 text-red-500 hover:bg-red-50' 
                      : 'border-gray-300 text-gray-300 cursor-not-allowed'
                  }`}
                  onClick={() => habit.isPositive === false && adjustHealth(-1)}
                  disabled={habit.isPositive !== false}
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
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    habit.isPositive !== false 
                      ? 'border-green-400 hover:border-green-500 text-green-500 hover:bg-green-50' 
                      : 'border-gray-300 text-gray-300 cursor-not-allowed'
                  }`}
                  onClick={() => habit.isPositive !== false && adjustHealth(1)}
                  disabled={habit.isPositive === false}
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Todo Modal */}
      {showTodoModal && <TodoModal />}
      
      {/* Habit Modal */}
      {showHabitModal && <HabitModal />}
    </div>
  );

  function TodoModal() {
    const [formData, setFormData] = useState({
      title: editingTodo?.text || '',
      description: editingTodo?.description || '',
      checklist: editingTodo?.subtodos || [''],
      difficulty: editingTodo?.difficulty || 'easy',
      dueDate: editingTodo?.date || '',
      tag: editingTodo?.tag || ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newTodo = {
        id: editingTodo?.id || Date.now(),
        text: formData.title,
        description: formData.description,
        completed: editingTodo?.completed || false,
        priority: formData.difficulty === 'easy' ? 'low' : formData.difficulty === 'medium' ? 'medium' : 'high',
        date: formData.dueDate,
        tag: formData.tag,
        subtodos: formData.checklist.filter(item => item.trim()),
        difficulty: formData.difficulty
      };

      if (editingTodo) {
        setTodos(prev => prev.map(todo => todo.id === editingTodo.id ? newTodo : todo));
      } else {
        setTodos(prev => [...prev, newTodo]);
      }
      setShowTodoModal(false);
    };

    const addChecklistItem = () => {
      setFormData(prev => ({
        ...prev,
        checklist: [...prev.checklist, '']
      }));
    };

    const updateChecklistItem = (index: number, value: string) => {
      setFormData(prev => ({
        ...prev,
        checklist: prev.checklist.map((item, i) => i === index ? value : item)
      }));
    };

    const removeChecklistItem = (index: number) => {
      setFormData(prev => ({
        ...prev,
        checklist: prev.checklist.filter((_, i) => i !== index)
      }));
    };

    const deleteTodo = () => {
      if (editingTodo) {
        setTodos(prev => prev.filter(todo => todo.id !== editingTodo.id));
        setShowTodoModal(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingTodo ? 'Edit To Do' : 'Add To Do'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Checklist</label>
              {formData.checklist.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateChecklistItem(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Item ${index + 1}`}
                  />
                  {formData.checklist.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeChecklistItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addChecklistItem}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Add new item
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="easy">Easy (1 EXP)</option>
                <option value="medium">Medium (2 EXP)</option>
                <option value="hard">Hard (3 EXP)</option>
                <option value="extreme">Extreme (4 EXP)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tag</label>
              <input
                type="text"
                value={formData.tag}
                onChange={(e) => setFormData(prev => ({ ...prev, tag: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Work, Personal, Health, etc."
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowTodoModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              {editingTodo && (
                <button
                  type="button"
                  onClick={deleteTodo}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              )}
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  function HabitModal() {
    const [formData, setFormData] = useState({
      title: editingHabit?.name || '',
      description: editingHabit?.description || '',
      isPositive: editingHabit?.isPositive !== false,
      difficulty: editingHabit?.difficulty || 'easy',
      resetCounter: editingHabit?.type || 'daily',
      tag: editingHabit?.tag || ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newHabit = {
        id: editingHabit?.id || Date.now(),
        name: formData.title,
        description: formData.description,
        completed: editingHabit?.completed || false,
        streak: editingHabit?.streak || 0,
        type: formData.resetCounter,
        isPositive: formData.isPositive,
        difficulty: formData.difficulty,
        tag: formData.tag
      };

      if (editingHabit) {
        setHabits(prev => prev.map(habit => habit.id === editingHabit.id ? newHabit : habit));
      } else {
        setHabits(prev => [...prev, newHabit]);
      }
      setShowHabitModal(false);
    };

    const deleteHabit = () => {
      if (editingHabit) {
        setHabits(prev => prev.filter(habit => habit.id !== editingHabit.id));
        setShowHabitModal(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingHabit ? 'Edit Habit' : 'Add Habit'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Habit Type</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, isPositive: true }))}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg border-2 transition-colors ${
                    formData.isPositive ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>Positive</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, isPositive: false }))}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg border-2 transition-colors ${
                    !formData.isPositive ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Minus className="w-4 h-4" />
                  <span>Negative</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="easy">Easy (1 Health)</option>
                <option value="medium">Medium (2 Health)</option>
                <option value="hard">Hard (3 Health)</option>
                <option value="extreme">Extreme (4 Health)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reset Counter</label>
              <select
                value={formData.resetCounter}
                onChange={(e) => setFormData(prev => ({ ...prev, resetCounter: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tag</label>
              <input
                type="text"
                value={formData.tag}
                onChange={(e) => setFormData(prev => ({ ...prev, tag: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Health, Productivity, Learning, etc."
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowHabitModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              {editingHabit && (
                <button
                  type="button"
                  onClick={deleteHabit}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              )}
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default Dashboard;