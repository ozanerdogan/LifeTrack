import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle, Circle, Target, Flame, TrendingUp, Calendar, Heart, Star, Search, Filter, Minus, X, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { getState, subscribe, addTodo, updateTodo, completeTodo, deleteTodo, addHabit, updateHabit, completeHabit, deleteHabit, addTag, Todo, Habit } from '../utils/globalState';

interface DashboardProps {
  avatar: string;
}

const Dashboard: React.FC<DashboardProps> = ({ avatar }) => {
  const [state, setState] = useState(getState());
  
  useEffect(() => {
    return subscribe(setState);
  }, []);

  const { user, todos, habits, tags: availableTags } = state;

  // UI State
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [showHabitModal, setShowHabitModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All Tags');
  const [openTodoMenuId, setOpenTodoMenuId] = useState<string | null>(null);
  const [openHabitMenuId, setOpenHabitMenuId] = useState<string | null>(null);
  const [showTagInput, setShowTagInput] = useState(false);
  const [expandedTodo, setExpandedTodo] = useState<string | null>(null);

  // Filtered todos and habits
  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         todo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'All Tags' || todo.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const filteredHabits = habits.filter(habit => {
    const matchesSearch = habit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         habit.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'All Tags' || habit.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const handleTodoComplete = (id: string) => {
    completeTodo(id);
  };

  const handleHabitComplete = (id: string) => {
    completeHabit(id);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setShowTodoModal(true);
    setOpenTodoMenuId(null);
  };

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setShowHabitModal(true);
    setOpenHabitMenuId(null);
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id);
    setOpenTodoMenuId(null);
  };

  const handleDeleteHabit = (id: string) => {
    deleteHabit(id);
    setOpenHabitMenuId(null);
  };

  const handleAddNewTag = (tagName: string, callback?: () => void) => {
    if (tagName.trim() && !availableTags.includes(tagName.trim())) {
      addTag(tagName.trim());
      if (callback) callback();
    }
  };

  function TodoModal() {
    const [formData, setFormData] = useState({
      title: editingTodo?.title || '',
      description: editingTodo?.description || '',
      difficulty: editingTodo?.difficulty || 'easy',
      tags: editingTodo?.tags || [],
      dueDate: editingTodo?.dueDate || '',
      checklist: editingTodo?.checklist || []
    });

    const [newChecklistItem, setNewChecklistItem] = useState('');
    const [showTagDropdown, setShowTagDropdown] = useState(false);

    const handleSubmit = () => {
      if (!formData.title.trim()) return;

      const todoData = {
        title: formData.title,
        description: formData.description,
        difficulty: formData.difficulty as 'easy' | 'medium' | 'hard' | 'extreme',
        tags: formData.tags,
        dueDate: formData.dueDate,
        checklist: formData.checklist,
        completed: false
      };

      if (editingTodo) {
        updateTodo(editingTodo.id, todoData);
      } else {
        addTodo(todoData);
      }

      setShowTodoModal(false);
      setEditingTodo(null);
    };

    const addChecklistItem = () => {
      if (newChecklistItem.trim()) {
        setFormData(prev => ({
          ...prev,
          checklist: [...prev.checklist, {
            id: Math.random().toString(36).substr(2, 9),
            text: newChecklistItem,
            completed: false
          }]
        }));
        setNewChecklistItem('');
      }
    };

    const removeChecklistItem = (id: string) => {
      setFormData(prev => ({
        ...prev,
        checklist: prev.checklist.filter(item => item.id !== id)
      }));
    };

    const toggleTag = (tag: string) => {
      setFormData(prev => ({
        ...prev,
        tags: prev.tags.includes(tag) 
          ? prev.tags.filter(t => t !== tag)
          : [...prev.tags, tag]
      }));
    };

    if (!showTodoModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingTodo ? 'Edit To Do' : 'Add New To Do'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter to do title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter description"
                rows={3}
              />
            </div>

            {/* Checklist */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Checklist</label>
              <div className="space-y-2">
                {formData.checklist.map(item => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          checklist: prev.checklist.map(i => 
                            i.id === item.id ? { ...i, completed: e.target.checked } : i
                          )
                        }));
                      }}
                      className="rounded border-gray-300"
                    />
                    <input
                      type="text"
                      value={item.text}
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          checklist: prev.checklist.map(i => 
                            i.id === item.id ? { ...i, text: e.target.value } : i
                          )
                        }));
                      }}
                      className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <button
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          checklist: prev.checklist.filter(i => i.id !== item.id)
                        }));
                      }}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newChecklistItem}
                    onChange={(e) => setNewChecklistItem(e.target.value)}
                    placeholder="Add checklist item"
                    className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <button
                    onClick={addChecklistItem}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as 'easy' | 'medium' | 'hard' | 'extreme' }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="easy">Easy (+1 EXP)</option>
                <option value="medium">Medium (+2 EXP)</option>
                <option value="hard">Hard (+3 EXP)</option>
                <option value="extreme">Extreme (+4 EXP)</option>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
              <div className="relative">
                <button
                  onClick={() => setShowTagDropdown(!showTagDropdown)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
                >
                  {formData.tags.length > 0 ? formData.tags.join(', ') : 'Select tags'}
                </button>
                
                {showTagDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                    {availableTags.map(tag => (
                      <div
                        key={tag}
                        onMouseDown={() => toggleTag(tag)}
                        className={`px-3 py-2 cursor-pointer hover:bg-gray-50 ${
                          formData.tags.includes(tag) ? 'bg-blue-50 text-blue-600' : ''
                        }`}
                      >
                        {tag}
                      </div>
                    ))}
                    <div className="border-t border-gray-200 p-2">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newTagName}
                          onChange={(e) => setNewTagName(e.target.value)}
                          placeholder="New tag name"
                          className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddNewTag(newTagName);
                            }
                          }}
                        />
                        <button
                          onMouseDown={() => {
                            handleAddNewTag(newTagName);
                          }}
                          className="px-2 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>


          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => {
                setShowTodoModal(false);
                setEditingTodo(null);
                setShowTagDropdown(false);
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {editingTodo ? 'Update' : 'Add'} To Do
            </button>
          </div>
        </div>
      </div>
    );
  }

  function HabitModal() {
    const [formData, setFormData] = useState({
      title: editingHabit?.title || '',
      description: editingHabit?.description || '',
      type: editingHabit?.type || 'positive',
      difficulty: editingHabit?.difficulty || 'easy',
      tags: editingHabit?.tags || [],
      resetPeriod: 'daily'
    });

    const [showTagDropdown, setShowTagDropdown] = useState(false);

    const handleSubmit = () => {
      if (!formData.title.trim()) return;

      const habitData = {
        title: formData.title,
        description: formData.description,
        type: formData.type as 'positive' | 'negative',
        difficulty: formData.difficulty as 'easy' | 'medium' | 'hard' | 'extreme',
        tags: formData.tags
      };

      if (editingHabit) {
        updateHabit(editingHabit.id, habitData);
      } else {
        addHabit(habitData);
      }

      setShowHabitModal(false);
      setEditingHabit(null);
    };

    const toggleTag = (tag: string) => {
      setFormData(prev => ({
        ...prev,
        tags: prev.tags.includes(tag) 
          ? prev.tags.filter(t => t !== tag)
          : [...prev.tags, tag]
      }));
    };

    if (!showHabitModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingHabit ? 'Edit Habit' : 'Add New Habit'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter habit title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter description"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="habitType"
                    value="positive"
                    checked={formData.type === 'positive'}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'positive' | 'negative' }))}
                    className="mr-2"
                  />
                  Positive (Gain health/exp)
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="habitType"
                    value="negative"
                    checked={formData.type === 'negative'}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'positive' | 'negative' }))}
                    className="mr-2"
                  />
                  Negative (Lose health/exp)
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as 'easy' | 'medium' | 'hard' | 'extreme' }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="easy">Easy (±1 Health/EXP)</option>
                <option value="medium">Medium (±2 Health/EXP)</option>
                <option value="hard">Hard (±3 Health/EXP)</option>
                <option value="extreme">Extreme (±4 Health/EXP)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reset Period</label>
              <select
                value={formData.resetPeriod}
                onChange={(e) => setFormData(prev => ({ ...prev, resetPeriod: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
              <div className="relative">
                <button
                  onClick={() => setShowTagDropdown(!showTagDropdown)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
                >
                  {formData.tags.length > 0 ? formData.tags.join(', ') : 'Select tags'}
                </button>
                
                {showTagDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                    {availableTags.map(tag => (
                      <div
                        key={tag}
                        onMouseDown={() => toggleTag(tag)}
                        className={`px-3 py-2 cursor-pointer hover:bg-gray-50 ${
                          formData.tags.includes(tag) ? 'bg-blue-50 text-blue-600' : ''
                        }`}
                      >
                        {tag}
                      </div>
                    ))}
                    <div className="border-t border-gray-200 p-2">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newTagName}
                          onChange={(e) => setNewTagName(e.target.value)}
                          placeholder="New tag name"
                          className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddNewTag(newTagName);
                            }
                          }}
                        />
                        <button
                          onMouseDown={() => {
                            handleAddNewTag(newTagName);
                          }}
                          className="px-2 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => {
                setShowHabitModal(false);
                setEditingHabit(null);
                setShowTagDropdown(false);
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {editingHabit ? 'Update' : 'Add'} Habit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* User stats */}
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 mb-6">
          <div className="flex items-center space-x-6">
            {/* Avatar - bigger */}
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
              {avatar || user.name.charAt(0).toUpperCase()}
            </div>
            
            {/* Name */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">Level {user.level}</p>
            </div>
            
            {/* Health and EXP bars stacked vertically */}
            <div className="flex-1 max-w-md space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-base font-medium text-gray-700 flex items-center">
                    <Heart className="w-5 h-5 text-red-500 mr-2" />
                    Health
                  </span>
                  <span className="text-base text-gray-600 font-semibold">{user.health}/{user.maxHealth}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-6">
                  <div 
                    className="bg-red-500 h-6 rounded-full transition-all duration-300" 
                    style={{ width: `${(user.health / user.maxHealth) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-base font-medium text-gray-700 flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    Experience
                  </span>
                  <span className="text-base text-gray-600 font-semibold">{user.exp % 10}/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-6">
                  <div 
                    className="bg-yellow-500 h-6 rounded-full transition-all duration-300" 
                    style={{ width: `${(user.exp % 10) * 10}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and filter bar */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search to dos and habits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="All Tags">All Tags</option>
                {availableTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* To Dos Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Target className="w-5 h-5 text-blue-600 mr-2" />
                To Dos ({filteredTodos.filter(t => !t.completed).length})
              </h2>
              <button
                onClick={() => setShowTodoModal(true)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              {filteredTodos.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Target className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No to dos found</p>
                  <p className="text-sm">Add a new to do to get started!</p>
                </div>
              ) : (
                filteredTodos.map(todo => (
                  <div key={todo.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg group">
                    <button
                      onClick={() => handleTodoComplete(todo.id)}
                      className={`flex-shrink-0 ${
                        todo.completed ? 'text-green-600' : 'text-gray-400 hover:text-green-600'
                      }`}
                    >
                      {todo.completed ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                    <div 
                      className="flex-1 min-w-0 cursor-pointer"
                      onClick={() => setExpandedTodo(expandedTodo === todo.id ? null : todo.id)}
                    >
                      <h3 className={`font-medium ${
                        todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
                      }`}>
                        {todo.title}
                      </h3>
                      {todo.description && (
                        <p className="text-sm text-gray-600 mt-1">{todo.description}</p>
                      )}
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          todo.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                          todo.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          todo.difficulty === 'hard' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {todo.difficulty}
                        </span>
                        {todo.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                            {tag}
                          </span>
                        ))}
                        {todo.dueDate && (
                          <span className="text-xs text-gray-500 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {todo.dueDate}
                          </span>
                        )}
                      </div>
                      {expandedTodo === todo.id && todo.checklist.length > 0 && (
                        <div className="mt-3 pl-4 border-l-2 border-gray-200">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Checklist:</h4>
                          <ul className="space-y-1">
                            {todo.checklist.map(item => (
                              <li key={item.id} className="flex items-center text-sm">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const updatedChecklist = todo.checklist.map(i => 
                                      i.id === item.id ? { ...i, completed: !i.completed } : i
                                    );
                                    updateTodo(todo.id, { checklist: updatedChecklist });
                                  }}
                                  className={`mr-2 ${item.completed ? 'text-green-600' : 'text-gray-400'} hover:text-green-500`}
                                >
                                  {item.completed ? '✓' : '○'}
                                </button>
                                <span className={item.completed ? 'line-through text-gray-500' : 'text-gray-700'}>
                                  {item.text}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenTodoMenuId(openTodoMenuId === todo.id ? null : todo.id);
                        }}
                        className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {openTodoMenuId === todo.id && (
                        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditTodo(todo);
                            }}
                            className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteTodo(todo.id);
                            }}
                            className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Habits Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Flame className="w-5 h-5 text-orange-600 mr-2" />
                Habits ({filteredHabits.length})
              </h2>
              <button
                onClick={() => setShowHabitModal(true)}
                className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              {filteredHabits.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Flame className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No habits found</p>
                  <p className="text-sm">Add a new habit to build consistency!</p>
                </div>
              ) : (
                filteredHabits.map(habit => (
                  <div key={habit.id} className="p-3 bg-gray-50 rounded-lg group">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{habit.title}</h3>
                        {habit.description && (
                          <p className="text-sm text-gray-600 mt-1">{habit.description}</p>
                        )}
                        <div className="flex items-center space-x-2 mt-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            habit.type === 'positive' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {habit.type}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            habit.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                            habit.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            habit.difficulty === 'hard' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {habit.difficulty}
                          </span>
                          {habit.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                              {tag}
                            </span>
                          ))}
                          <span className="text-xs text-gray-500 flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {habit.streak} day streak
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleHabitComplete(habit.id)}
                          className={`px-3 py-1 text-sm rounded-lg font-medium ${
                            habit.type === 'positive'
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'bg-red-600 text-white hover:bg-red-700'
                          }`}
                        >
                          {habit.type === 'positive' ? '+' : '-'}
                        </button>
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenHabitMenuId(openHabitMenuId === habit.id ? null : habit.id);
                            }}
                            className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          {openHabitMenuId === habit.id && (
                            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditHabit(habit);
                                }}
                                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center"
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteHabit(habit.id);
                                }}
                                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center text-red-600"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
      <HabitModal />
    </div>
  );
};

export default Dashboard;