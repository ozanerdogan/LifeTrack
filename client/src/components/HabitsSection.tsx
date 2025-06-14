import React, { useState } from 'react';
import { Plus, Target, Calendar, TrendingUp, Check, X, MoreHorizontal, Flame } from 'lucide-react';

const HabitsSection: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const habits = [
    {
      id: 1,
      name: 'Morning Exercise',
      description: '30 minutes of physical activity',
      category: 'Health',
      streak: 6,
      completedToday: true,
      weeklyProgress: [true, true, false, true, true, true, true],
      targetDays: 7,
      color: 'emerald'
    },
    {
      id: 2,
      name: 'Read for 30 minutes',
      description: 'Read books or articles',
      category: 'Learning',
      streak: 4,
      completedToday: false,
      weeklyProgress: [true, false, true, true, false, true, false],
      targetDays: 5,
      color: 'blue'
    },
    {
      id: 3,
      name: 'Drink 8 glasses of water',
      description: 'Stay hydrated throughout the day',
      category: 'Health',
      streak: 8,
      completedToday: true,
      weeklyProgress: [true, true, true, true, true, true, true],
      targetDays: 7,
      color: 'cyan'
    },
    {
      id: 4,
      name: 'Meditation',
      description: '10 minutes of mindfulness',
      category: 'Wellness',
      streak: 3,
      completedToday: false,
      weeklyProgress: [false, true, true, false, true, false, false],
      targetDays: 5,
      color: 'purple'
    },
    {
      id: 5,
      name: 'Write in Journal',
      description: 'Reflect on the day',
      category: 'Personal',
      streak: 2,
      completedToday: true,
      weeklyProgress: [false, false, true, true, false, true, true],
      targetDays: 4,
      color: 'orange'
    }
  ];

  const colorClasses = {
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-200',
      gradient: 'from-emerald-400 to-emerald-600'
    },
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-200',
      gradient: 'from-blue-400 to-blue-600'
    },
    cyan: {
      bg: 'bg-cyan-50',
      text: 'text-cyan-600',
      border: 'border-cyan-200',
      gradient: 'from-cyan-400 to-cyan-600'
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-200',
      gradient: 'from-purple-400 to-purple-600'
    },
    orange: {
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      border: 'border-orange-200',
      gradient: 'from-orange-400 to-orange-600'
    }
  };

  const toggleHabit = (habitId: number) => {
    // In a real app, this would update the habit's completion status
    console.log(`Toggle habit ${habitId}`);
  };

  const getDayName = (index: number) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days[index];
  };

  const completedHabits = habits.filter(habit => habit.completedToday).length;
  const totalHabits = habits.length;
  const completionRate = Math.round((completedHabits / totalHabits) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Habits</h1>
          <p className="text-gray-600 mt-1">Build better habits, one day at a time</p>
        </div>
        
        <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl">
          <Plus className="w-5 h-5" />
          <span>New Habit</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Progress</p>
              <p className="text-2xl font-bold text-gray-900">{completedHabits}/{totalHabits}</p>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-200">
              <Target className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{completionRate}% complete</p>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Best Streak</p>
              <p className="text-2xl font-bold text-gray-900">{Math.max(...habits.map(h => h.streak))}</p>
            </div>
            <div className="p-3 bg-orange-50 text-orange-600 rounded-lg border border-orange-200">
              <Flame className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-gray-900">85%</p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg border border-blue-200">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Habits List */}
      <div className="space-y-4">
        {habits.map((habit) => {
          const colors = colorClasses[habit.color as keyof typeof colorClasses];
          const weeklyCompleted = habit.weeklyProgress.filter(Boolean).length;
          const weeklyRate = Math.round((weeklyCompleted / habit.targetDays) * 100);
          
          return (
            <div
              key={habit.id}
              className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  {/* Completion Button */}
                  <button
                    onClick={() => toggleHabit(habit.id)}
                    className={`
                      w-12 h-12 rounded-full border-2 flex items-center justify-center
                      transition-all duration-200 hover:scale-105
                      ${habit.completedToday
                        ? `bg-gradient-to-br ${colors.gradient} border-transparent text-white shadow-lg`
                        : `border-gray-300 hover:border-gray-400 bg-white`
                      }
                    `}
                  >
                    {habit.completedToday && <Check className="w-6 h-6" />}
                  </button>

                  {/* Habit Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className={`text-lg font-semibold ${habit.completedToday ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                        {habit.name}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${colors.bg} ${colors.text}`}>
                        {habit.category}
                      </span>
                      {habit.streak > 0 && (
                        <div className="flex items-center space-x-1 text-orange-600">
                          <Flame className="w-4 h-4" />
                          <span className="text-sm font-medium">{habit.streak}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{habit.description}</p>
                    
                    {/* Weekly Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">This week</span>
                        <span className="text-sm font-medium text-gray-900">
                          {weeklyCompleted}/{habit.targetDays} days ({weeklyRate}%)
                        </span>
                      </div>
                      
                      <div className="flex space-x-1">
                        {habit.weeklyProgress.map((completed, index) => (
                          <div key={index} className="flex-1 text-center">
                            <div
                              className={`
                                w-full h-8 rounded-md flex items-center justify-center text-xs font-medium
                                ${completed 
                                  ? `bg-gradient-to-br ${colors.gradient} text-white` 
                                  : 'bg-gray-100 text-gray-400'
                                }
                              `}
                            >
                              {completed ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                            </div>
                            <span className="text-xs text-gray-500 mt-1 block">
                              {getDayName(index)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu Button */}
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  <MoreHorizontal className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HabitsSection;