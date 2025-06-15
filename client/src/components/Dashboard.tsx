import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle, Target, Heart, Star, Search, MoreVertical, Edit, Trash2, X } from 'lucide-react';
import { getState, subscribe, addTodo, updateTodo, completeTodo, uncompleteTodo, deleteTodo, addHabit, updateHabit, completeHabit, uncompleteHabit, deleteHabit, Todo, Habit } from '../utils/globalState';

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

  const handleTodoUncomplete = (id: string) => {
    uncompleteTodo(id);
  };

  const handleHabitComplete = (id: string) => {
    completeHabit(id);
  };

  const handleHabitUncomplete = (id: string) => {
    uncompleteHabit(id);
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

  function TodoModal() {
    const [formData, setFormData] = useState({
      title: editingTodo?.title || '',
      description: editingTodo?.description || '',
      difficulty: editingTodo?.difficulty || 'easy' as const,
      tags: editingTodo?.tags?.join(', ') || '',
      dueDate: editingTodo?.dueDate || '',
      checklist: editingTodo?.checklist || []
    });

    const [newChecklistItem, setNewChecklistItem] = useState('');

    useEffect(() => {
      if (editingTodo) {
        setFormData({
          title: editingTodo.title,
          description: editingTodo.description,
          difficulty: editingTodo.difficulty,
          tags: editingTodo.tags.join(', '),
          dueDate: editingTodo.dueDate || '',
          checklist: editingTodo.checklist
        });
      } else {
        setFormData({
          title: '',
          description: '',
          difficulty: 'easy',
          tags: '',
          dueDate: '',
          checklist: []
        });
      }
    }, [editingTodo]);

    const handleSubmit = () => {
      if (!formData.title.trim()) return;

      const todoData = {
        title: formData.title,
        description: formData.description,
        difficulty: formData.difficulty,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
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
            text: newChecklistItem.trim(),
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

    if (!showTodoModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {editingTodo ? 'Edit To Do' : 'Add New To Do'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter to do title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter description"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags (comma-separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="work, personal, urgent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as 'easy' | 'medium' | 'hard' | 'extreme' }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="easy">Easy (±1 Health/EXP)</option>
                <option value="medium">Medium (±2 Health/EXP)</option>
                <option value="hard">Hard (±3 Health/EXP)</option>
                <option value="extreme">Extreme (±4 Health/EXP)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Checklist</label>
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
                      className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
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
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded"
                    />
                    <button
                      onClick={() => removeChecklistItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newChecklistItem}
                    onChange={(e) => setNewChecklistItem(e.target.value)}
                    placeholder="Add checklist item"
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded"
                    onKeyPress={(e) => e.key === 'Enter' && addChecklistItem()}
                  />
                  <button
                    onClick={addChecklistItem}
                    className="px-2 py-1 text-sm bg-blue-600 dark:bg-blue-500 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => {
                setShowTodoModal(false);
                setEditingTodo(null);
              }}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
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
      type: editingHabit?.type || 'positive' as const,
      difficulty: editingHabit?.difficulty || 'easy' as const,
      tags: editingHabit?.tags?.join(', ') || ''
    });

    useEffect(() => {
      if (editingHabit) {
        setFormData({
          title: editingHabit.title,
          description: editingHabit.description,
          type: editingHabit.type,
          difficulty: editingHabit.difficulty,
          tags: editingHabit.tags.join(', ')
        });
      } else {
        setFormData({
          title: '',
          description: '',
          type: 'positive',
          difficulty: 'easy',
          tags: ''
        });
      }
    }, [editingHabit]);

    const handleSubmit = () => {
      if (!formData.title.trim()) return;

      const habitData = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        difficulty: formData.difficulty,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      if (editingHabit) {
        updateHabit(editingHabit.id, habitData);
      } else {
        addHabit(habitData);
      }

      setShowHabitModal(false);
      setEditingHabit(null);
    };

    if (!showHabitModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {editingHabit ? 'Edit Habit' : 'Add New Habit'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter habit title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter description"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
              <div className="flex space-x-4">
                <label className="flex items-center text-gray-900 dark:text-white">
                  <input
                    type="radio"
                    name="habitType"
                    value="positive"
                    checked={formData.type === 'positive'}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'positive' | 'negative' }))}
                    className="mr-2"
                  />
                  Positive (Build)
                </label>
                <label className="flex items-center text-gray-900 dark:text-white">
                  <input
                    type="radio"
                    name="habitType"
                    value="negative"
                    checked={formData.type === 'negative'}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'positive' | 'negative' }))}
                    className="mr-2"
                  />
                  Negative (Break)
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags (comma-separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="health, productivity, mindfulness"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as 'easy' | 'medium' | 'hard' | 'extreme' }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="easy">Easy (±1 Health/EXP)</option>
                <option value="medium">Medium (±2 Health/EXP)</option>
                <option value="hard">Hard (±3 Health/EXP)</option>
                <option value="extreme">Extreme (±4 Health/EXP)</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => {
                setShowHabitModal(false);
                setEditingHabit(null);
              }}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
            >
              {editingHabit ? 'Update' : 'Add'} Habit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img src={avatar} alt="Avatar" className="w-12 h-12 rounded-full" />
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Welcome back!</h2>
              <p className="text-gray-600 dark:text-gray-300">Ready to be productive?</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowTodoModal(true)}
              className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Todo</span>
            </button>
            <button
              onClick={() => setShowHabitModal(true)}
              className="bg-green-600 dark:bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Habit</span>
            </button>
          </div>
        </div>

        {/* Health and EXP bars */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                <Heart className="w-4 h-4 mr-1 text-red-500" />
                Health
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{user.health}/{user.maxHealth}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(user.health / user.maxHealth) * 100}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-500" />
                Level {user.level}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{user.exp}/100</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${user.exp}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search todos and habits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All Tags">All Tags</option>
            {availableTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Todos and Habits Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Todos Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-blue-500" />
            Todos ({filteredTodos.length})
          </h3>
          <div className="space-y-3">
            {filteredTodos.map(todo => (
              <div key={todo.id} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                <button
                  onClick={() => todo.completed ? handleTodoUncomplete(todo.id) : handleTodoComplete(todo.id)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    todo.completed 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
                  }`}
                >
                  {todo.completed && <CheckCircle className="w-3 h-3" />}
                </button>
                <div className="flex-1">
                  <div className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                    {todo.title}
                  </div>
                  {todo.description && (
                    <div className="text-sm text-gray-600 dark:text-gray-400">{todo.description}</div>
                  )}
                  <div className="flex items-center space-x-2 mt-1">
                    {todo.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setOpenTodoMenuId(openTodoMenuId === todo.id ? null : todo.id)}
                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  {openTodoMenuId === todo.id && (
                    <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-10">
                      <button
                        onClick={() => handleEditTodo(todo)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {filteredTodos.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No todos found. Create your first todo!
              </div>
            )}
          </div>
        </div>

        {/* Habits Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-green-500" />
            Habits ({filteredHabits.length})
          </h3>
          <div className="space-y-3">
            {filteredHabits.map(habit => (
              <div key={habit.id} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                <button
                  onClick={() => {
                    const today = new Date().toISOString().split('T')[0];
                    const lastCompleted = habit.lastCompleted?.split('T')[0];
                    if (lastCompleted === today) {
                      handleHabitUncomplete(habit.id);
                    } else {
                      handleHabitComplete(habit.id);
                    }
                  }}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    habit.lastCompleted?.split('T')[0] === new Date().toISOString().split('T')[0]
                      ? `${habit.type === 'positive' ? 'bg-green-500 border-green-500' : 'bg-red-500 border-red-500'} text-white`
                      : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
                  }`}
                >
                  {habit.lastCompleted?.split('T')[0] === new Date().toISOString().split('T')[0] && (
                    <CheckCircle className="w-3 h-3" />
                  )}
                </button>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white flex items-center">
                    {habit.title}
                    <span className={`ml-2 px-2 py-1 text-xs rounded ${
                      habit.type === 'positive' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' 
                        : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                    }`}>
                      {habit.type === 'positive' ? 'Build' : 'Break'}
                    </span>
                  </div>
                  {habit.description && (
                    <div className="text-sm text-gray-600 dark:text-gray-400">{habit.description}</div>
                  )}
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      🔥 {habit.streak} day streak
                    </span>
                    {habit.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setOpenHabitMenuId(openHabitMenuId === habit.id ? null : habit.id)}
                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  {openHabitMenuId === habit.id && (
                    <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-10">
                      <button
                        onClick={() => handleEditHabit(habit)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteHabit(habit.id)}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {filteredHabits.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No habits found. Create your first habit!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <TodoModal />
      <HabitModal />
    </div>
  );
};

export default Dashboard;