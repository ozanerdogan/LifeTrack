import React, { useState, useEffect, useRef } from 'react';
import { Plus, CheckCircle, Circle, Target, Flame, TrendingUp, Calendar, Heart, Star, Search, Filter, Minus, X, MoreVertical, Edit, Trash2, Undo, Tag, ChevronDown, ChevronRight } from 'lucide-react';
import { getState, subscribe, addTodo, updateTodo, completeTodo, uncompleteTodo, deleteTodo, addHabit, updateHabit, completeHabit, uncompleteHabit, deleteHabit, addTag, formatDate, Todo, Habit } from '../utils/globalState';

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
  const [newTagName, setNewTagName] = useState('');
  const [expandedTodo, setExpandedTodo] = useState<string | null>(null);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    const newCollapsed = new Set(collapsedSections);
    if (newCollapsed.has(section)) {
      newCollapsed.delete(section);
    } else {
      newCollapsed.add(section);
    }
    setCollapsedSections(newCollapsed);
  };

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

  const handleAddNewTag = (tagName: string, callback?: () => void) => {
    if (tagName.trim() && !availableTags.includes(tagName.trim())) {
      addTag(tagName.trim());
      if (callback) callback();
    }
  };

  function TodoModal() {
    const formDataRef = useRef({
      title: editingTodo?.title || '',
      description: editingTodo?.description || '',
      difficulty: editingTodo?.difficulty || 'easy',
      tags: editingTodo?.tags || [],
      dueDate: editingTodo?.dueDate || '',
      checklist: editingTodo?.checklist || []
    });
    
    const [formData, setFormData] = useState(formDataRef.current);

    const [newChecklistItem, setNewChecklistItem] = useState('');
    const [showTagDropdown, setShowTagDropdown] = useState(false);
    const [newTagName, setNewTagName] = useState('');

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

    const toggleTag = (tag: string) => {
      setFormData(prev => ({
        ...prev,
        tags: prev.tags.includes(tag) 
          ? prev.tags.filter(t => t !== tag)
          : [...prev.tags, tag]
      }));
    };

    const handleAddNewTag = (tagName: string) => {
      if (tagName.trim() && !availableTags.includes(tagName.trim())) {
        const trimmedTag = tagName.trim();
        // Update form tags first to preserve form state
        toggleTag(trimmedTag);
        // Then add to global state
        addTag(trimmedTag);
        setNewTagName('');
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

            {/* Checklist */}
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
                      className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded text-sm"
                    />
                    <button
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          checklist: prev.checklist.filter(i => i.id !== item.id)
                        }));
                      }}
                      className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm"
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
                    className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded text-sm"
                  />
                  <button
                    onClick={addChecklistItem}
                    className="bg-blue-500 dark:bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as 'easy' | 'medium' | 'hard' | 'extreme' }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="easy">Easy (+1 EXP)</option>
                <option value="medium">Medium (+2 EXP)</option>
                <option value="hard">Hard (+3 EXP)</option>
                <option value="extreme">Extreme (+4 EXP)</option>
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags</label>
              <div className="relative">
                <button
                  onClick={() => setShowTagDropdown(!showTagDropdown)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
                >
                  {formData.tags.length > 0 ? formData.tags.join(', ') : 'Select tags'}
                </button>
                
                {showTagDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                    {availableTags.map(tag => (
                      <div
                        key={tag}
                        onMouseDown={() => toggleTag(tag)}
                        className={`px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white ${
                          formData.tags.includes(tag) ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : ''
                        }`}
                      >
                        {tag}
                      </div>
                    ))}
                    <div className="border-t border-gray-200 dark:border-gray-600 p-2">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newTagName}
                          onChange={(e) => setNewTagName(e.target.value)}
                          placeholder="New tag name"
                          className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddNewTag(newTagName);
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddNewTag(newTagName);
                          }}
                          className="px-2 py-1 text-sm bg-blue-600 dark:bg-blue-500 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600"
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
    const [formData, setFormData] = useState(() => ({
      title: editingHabit?.title || '',
      description: editingHabit?.description || '',
      type: editingHabit?.type || 'positive',
      difficulty: editingHabit?.difficulty || 'easy',
      tags: editingHabit?.tags || [],
      resetPeriod: 'daily'
    }));

    const [showTagDropdown, setShowTagDropdown] = useState(false);
    const [newTagName, setNewTagName] = useState('');

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

    const handleAddNewTag = (tagName: string) => {
      if (tagName.trim() && !availableTags.includes(tagName.trim())) {
        const trimmedTag = tagName.trim();
        // Update form tags first to preserve form state
        toggleTag(trimmedTag);
        // Then add to global state
        addTag(trimmedTag);
        setNewTagName('');
      }
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
                  Positive (Gain health/exp)
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
                  Negative (Lose health/exp)
                </label>
              </div>
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reset Period</label>
              <select
                value={formData.resetPeriod}
                onChange={(e) => setFormData(prev => ({ ...prev, resetPeriod: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags</label>
              <div className="relative">
                <button
                  onClick={() => setShowTagDropdown(!showTagDropdown)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
                >
                  {formData.tags.length > 0 ? formData.tags.join(', ') : 'Select tags'}
                </button>
                
                {showTagDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                    {availableTags.map(tag => (
                      <div
                        key={tag}
                        onMouseDown={() => toggleTag(tag)}
                        className={`px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white ${
                          formData.tags.includes(tag) ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : ''
                        }`}
                      >
                        {tag}
                      </div>
                    ))}
                    <div className="border-t border-gray-200 dark:border-gray-600 p-2">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newTagName}
                          onChange={(e) => setNewTagName(e.target.value)}
                          placeholder="New tag name"
                          className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddNewTag(newTagName);
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddNewTag(newTagName);
                          }}
                          className="px-2 py-1 text-sm bg-blue-600 dark:bg-blue-500 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600"
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
    <>
      {/* User stats */}
      <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 mb-6 overflow-hidden">
        {/* Enhanced Forest background - very weak grey */}
        <div className="absolute inset-0 opacity-3 dark:opacity-2 overflow-hidden text-gray-400">
          <svg viewBox="0 0 500 200" className="w-full h-full object-cover" preserveAspectRatio="xMaxYMax slice">
            {/* Main forest layer */}
            <path d="M450 200 L450 110 L440 110 L455 70 L440 70 L455 40 L470 70 L455 70 L470 110 L460 110 L460 200 Z" fill="currentColor" />
            <path d="M420 200 L420 130 L410 130 L425 90 L410 90 L425 60 L440 90 L425 90 L440 130 L430 130 L430 200 Z" fill="currentColor" />
            <path d="M480 200 L480 120 L470 120 L485 80 L470 80 L485 50 L500 80 L485 80 L500 120 L490 120 L490 200 Z" fill="currentColor" />
            <path d="M390 200 L390 140 L380 140 L395 100 L380 100 L395 70 L410 100 L395 100 L410 140 L400 140 L400 200 Z" fill="currentColor" />
            <path d="M360 200 L360 155 L350 155 L365 115 L350 115 L365 85 L380 115 L365 115 L380 155 L370 155 L370 200 Z" fill="currentColor" />
            <path d="M330 200 L330 165 L320 165 L335 125 L320 125 L335 95 L350 125 L335 125 L350 165 L340 165 L340 200 Z" fill="currentColor" />
            
            {/* Medium trees layer */}
            <path d="M470 200 L470 160 L465 160 L475 140 L465 140 L475 125 L485 140 L475 140 L485 160 L480 160 L480 200 Z" fill="currentColor" opacity="0.4" />
            <path d="M440 200 L440 170 L435 170 L445 150 L435 150 L445 135 L455 150 L445 150 L455 170 L450 170 L450 200 Z" fill="currentColor" opacity="0.4" />
            <path d="M410 200 L410 175 L405 175 L415 155 L405 155 L415 140 L425 155 L415 155 L425 175 L420 175 L420 200 Z" fill="currentColor" opacity="0.4" />
            <path d="M380 200 L380 180 L375 180 L385 160 L375 160 L385 145 L395 160 L385 160 L395 180 L390 180 L390 200 Z" fill="currentColor" opacity="0.4" />
            
            {/* Small trees and bushes */}
            <path d="M350 200 L350 185 L345 185 L355 170 L345 170 L355 160 L365 170 L355 170 L365 185 L360 185 L360 200 Z" fill="currentColor" opacity="0.25" />
            <path d="M320 200 L320 190 L315 190 L325 175 L315 175 L325 165 L335 175 L325 175 L335 190 L330 190 L330 200 Z" fill="currentColor" opacity="0.25" />
            <path d="M290 200 L290 188 L285 188 L295 173 L285 173 L295 163 L305 173 L295 173 L305 188 L300 188 L300 200 Z" fill="currentColor" opacity="0.25" />
            
            {/* Background hills and distant trees */}
            <path d="M250 200 L250 170 L280 160 L310 165 L340 155 L370 160 L400 150 L430 155 L460 145 L490 150 L500 145 L500 200 Z" fill="currentColor" opacity="0.15" />
          </svg>
        </div>
          {/* Responsive layout */}
          <div className="relative z-10">
            {/* Desktop layout */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Avatar */}
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                {avatar || user.name.charAt(0).toUpperCase()}
              </div>
              
              {/* Name and level */}
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.username}</h1>
                <p className="text-gray-600 dark:text-gray-300">Level {user.level}</p>
              </div>
              
              {/* Progress bars */}
              <div className="flex-1 max-w-md space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-medium text-gray-700 dark:text-gray-300 flex items-center">
                      <Heart className="w-5 h-5 text-red-500 mr-2" />
                      Health
                    </span>
                    <span className="text-base text-gray-600 dark:text-gray-400 font-semibold">{user.health}/{user.maxHealth}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6">
                    <div 
                      className="bg-red-500 h-6 rounded-full transition-all duration-300" 
                      style={{ width: `${(user.health / user.maxHealth) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-medium text-gray-700 dark:text-gray-300 flex items-center">
                      <Star className="w-5 h-5 text-yellow-500 mr-2" />
                      Experience
                    </span>
                    <span className="text-base text-gray-600 dark:text-gray-400 font-semibold">{user.exp % 10}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6">
                    <div 
                      className="bg-yellow-500 h-6 rounded-full transition-all duration-300" 
                      style={{ width: `${(user.exp % 10) * 10}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile layout */}
            <div className="md:hidden">
              <div className="flex items-start space-x-4">
                {/* Avatar on left */}
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {avatar || user.name.charAt(0).toUpperCase()}
                </div>
                
                {/* Name, level and progress bars on right */}
                <div className="flex-1 space-y-3">
                  {/* Name and level side by side */}
                  <div className="flex items-center space-x-3">
                    <h1 className="text-lg font-bold text-gray-900 dark:text-white">{user.username}</h1>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                      Level {user.level}
                    </span>
                  </div>
                  
                  {/* Progress bars with icons on left */}
                  <div className="space-y-2">
                    {/* Health bar */}
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div 
                            className="bg-red-500 h-3 rounded-full transition-all duration-300" 
                            style={{ width: `${(user.health / user.maxHealth) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-semibold">{user.health}/{user.maxHealth}</span>
                    </div>
                    
                    {/* Experience bar */}
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div 
                            className="bg-yellow-500 h-3 rounded-full transition-all duration-300" 
                            style={{ width: `${(user.exp % 10) * 10}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-semibold">{user.exp % 10}/10</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and filter bar */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search to dos and habits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4 pointer-events-none" />
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <Target className="w-5 h-5 text-blue-600 mr-2" />
                To Dos ({filteredTodos.filter(t => !t.completed).length})
              </h2>
              <button
                onClick={() => setShowTodoModal(true)}
                className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              {filteredTodos.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Target className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                  <p>No to dos found</p>
                  <p className="text-sm">Add a new to do to get started!</p>
                </div>
              ) : (
                filteredTodos.map(todo => (
                  <div key={todo.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg group">
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => todo.completed ? handleTodoUncomplete(todo.id) : handleTodoComplete(todo.id)}
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

                    </div>
                    <div 
                      className="flex-1 min-w-0 cursor-pointer"
                      onClick={() => setExpandedTodo(expandedTodo === todo.id ? null : todo.id)}
                    >
                      <h3 className={`font-medium ${
                        todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'
                      }`}>
                        {todo.title}
                      </h3>
                      {todo.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{todo.description}</p>
                      )}
                      <div className="flex items-center flex-wrap gap-2 mt-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          todo.difficulty === 'easy' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' :
                          todo.difficulty === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400' :
                          todo.difficulty === 'hard' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400' :
                          'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                        }`}>
                          {todo.difficulty}
                        </span>
                        {todo.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full">
                            {tag}
                          </span>
                        ))}
                        {todo.dueDate && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(todo.dueDate)}
                          </span>
                        )}
                      </div>
                      {expandedTodo === todo.id && todo.checklist.length > 0 && (
                        <div className="mt-3 pl-4 border-l-2 border-gray-200 dark:border-gray-600">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Checklist:</h4>
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
                                <span className={item.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-700 dark:text-gray-300'}>
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
                        <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10 min-w-[120px]">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditTodo(todo);
                            }}
                            className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white flex items-center"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteTodo(todo.id);
                            }}
                            className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center text-red-600 dark:text-red-400"
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
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <Flame className="w-5 h-5 text-orange-600 mr-2" />
                Habits ({filteredHabits.length})
              </h2>
              <button
                onClick={() => setShowHabitModal(true)}
                className="p-2 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              {filteredHabits.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Flame className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                  <p>No habits found</p>
                  <p className="text-sm">Add a new habit to build consistency!</p>
                </div>
              ) : (
                filteredHabits.map(habit => (
                  <div key={habit.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg group">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">{habit.title}</h3>
                        {habit.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{habit.description}</p>
                        )}
                        <div className="flex items-center flex-wrap gap-2 mt-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            habit.type === 'positive' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                          }`}>
                            {habit.type}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            habit.difficulty === 'easy' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' :
                            habit.difficulty === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400' :
                            habit.difficulty === 'hard' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400' :
                            'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                          }`}>
                            {habit.difficulty}
                          </span>
                          {habit.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full">
                              {tag}
                            </span>
                          ))}
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
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
                        {habit.streak > 0 && (
                          <button
                            onClick={() => handleHabitUncomplete(habit.id)}
                            className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Undo last completion"
                          >
                            <Undo className="w-4 h-4" />
                          </button>
                        )}
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenHabitMenuId(openHabitMenuId === habit.id ? null : habit.id);
                            }}
                            className="p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          {openHabitMenuId === habit.id && (
                            <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10 min-w-[120px]">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditHabit(habit);
                                }}
                                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white flex items-center"
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteHabit(habit.id);
                                }}
                                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center text-red-600 dark:text-red-400"
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

      <TodoModal />
      <HabitModal />
    </>
  );
};

export default Dashboard;