import React from 'react';
import { Plus, CheckCircle, Circle, Target, Flame, TrendingUp, Calendar } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Mock data for todos
  const todos = [
    { id: 1, text: 'Review project proposal', completed: false, priority: 'high' },
    { id: 2, text: 'Call dentist for appointment', completed: true, priority: 'medium' },
    { id: 3, text: 'Buy groceries for dinner', completed: false, priority: 'low' },
    { id: 4, text: 'Finish quarterly report', completed: false, priority: 'high' },
    { id: 5, text: 'Update portfolio website', completed: true, priority: 'medium' },
    { id: 6, text: 'Plan weekend trip', completed: false, priority: 'low' },
  ];

  // Mock data for habits
  const habits = [
    { id: 1, name: 'Morning Exercise', completed: true, streak: 6, color: 'emerald' },
    { id: 2, name: 'Read 30 minutes', completed: false, streak: 4, color: 'blue' },
    { id: 3, name: 'Drink 8 glasses water', completed: true, streak: 8, color: 'cyan' },
    { id: 4, name: 'Meditation', completed: false, streak: 3, color: 'purple' },
    { id: 5, name: 'Write in Journal', completed: true, streak: 2, color: 'orange' },
  ];

  const completedTodos = todos.filter(todo => todo.completed).length;
  const totalTodos = todos.length;
  const todoProgress = Math.round((completedTodos / totalTodos) * 100);

  const completedHabits = habits.filter(habit => habit.completed).length;
  const totalHabits = habits.length;
  const habitProgress = Math.round((completedHabits / totalHabits) * 100);

  const toggleTodo = (todoId: number) => {
    console.log(`Toggle todo ${todoId}`);
  };

  const toggleHabit = (habitId: number) => {
    console.log(`Toggle habit ${habitId}`);
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
      {/* Top Section - Avatar and Health Bars */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-gray-200/50">
        <div className="flex flex-col items-center space-y-6">
          {/* Avatar */}
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">JD</span>
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back, John!</h1>
            <p className="text-gray-600">Let's make today productive</p>
          </div>

          {/* Health Bars */}
          <div className="w-full max-w-md space-y-4">
            {/* Todo Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Today's Tasks</span>
                <span className="text-sm text-gray-600">{completedTodos}/{totalTodos}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${todoProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 text-center">{todoProgress}% Complete</p>
            </div>

            {/* Habit Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Daily Habits</span>
                <span className="text-sm text-gray-600">{completedHabits}/{totalHabits}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${habitProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 text-center">{habitProgress}% Complete</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Two Segments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Segment - Todos */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden">
          <div className="p-6 border-b border-gray-200/50">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Today's Tasks</h2>
              <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className={`p-4 border-l-4 ${getPriorityColor(todo.priority)} border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200`}
              >
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="flex-shrink-0"
                  >
                    {todo.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                  
                  <span className={`flex-1 ${todo.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                    {todo.text}
                  </span>
                  
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    todo.priority === 'high' ? 'bg-red-100 text-red-700' :
                    todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {todo.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Segment - Habits */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden">
          <div className="p-6 border-b border-gray-200/50">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Daily Habits</h2>
              <button className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors duration-200">
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleHabit(habit.id)}
                    className={`
                      w-8 h-8 rounded-full border-2 flex items-center justify-center
                      transition-all duration-200 hover:scale-105
                      ${habit.completed
                        ? `bg-gradient-to-br ${getHabitColor(habit.color)} border-transparent text-white shadow-md`
                        : `border-gray-300 hover:border-gray-400 bg-white`
                      }
                    `}
                  >
                    {habit.completed && <CheckCircle className="w-4 h-4" />}
                  </button>
                  
                  <div className="flex-1">
                    <span className={`block ${habit.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                      {habit.name}
                    </span>
                  </div>
                  
                  {habit.streak > 0 && (
                    <div className="flex items-center space-x-1 text-orange-600">
                      <Flame className="w-4 h-4" />
                      <span className="text-sm font-medium">{habit.streak}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;