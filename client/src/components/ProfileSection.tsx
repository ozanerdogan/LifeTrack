import React, { useState, useEffect } from 'react';
import { User, Edit, Camera, Award, Calendar, Target, TrendingUp, Settings, MapPin } from 'lucide-react';
import { getState, subscribe, updateUser, formatDate } from '../utils/globalState';

interface ProfileSectionProps {
  avatar: string;
  setAvatar: (avatar: string) => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ avatar, setAvatar }) => {
  const [state, setState] = useState(getState());
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: state.user.name,
    username: state.user.username,
    bio: state.user.bio,
    location: state.user.location,
    birthday: state.user.birthday
  });
  
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [avatarBgColor, setAvatarBgColor] = useState('#3B82F6');

  const backgroundColors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16',
    '#F97316', '#6366F1', '#14B8A6', '#F43F5E'
  ];

  useEffect(() => {
    const unsubscribe = subscribe(setState);
    return unsubscribe;
  }, []);

  const avatarOptions = [
    '🐱', '🐶', '🐻', '🦊', '🐰', '🐼',
    '👨', '👩', '👦', '👧', '🧑', '👴',
    '🤖', '👽', '🎭', '🎨', '⭐', '🌟'
  ];

  // Calculate real stats from state
  const completedTodos = state.todos.filter(todo => todo.completed).length;
  const totalTodos = state.todos.length;
  const activeHabits = state.habits.length;
  const longestStreak = Math.max(...state.habits.map(h => h.streak), 0);
  const joinedDays = Math.floor((new Date().getTime() - new Date(state.user.joinDate).getTime()) / (1000 * 60 * 60 * 24));

  const stats = {
    totalTasks: totalTodos,
    completedTasks: completedTodos,
    totalHabits: activeHabits,
    longestStreak: longestStreak,
    joinedDays: joinedDays
  };

  const achievements = [
    { id: 1, name: 'First Week', description: 'Completed your first week', icon: '🎯', earned: joinedDays >= 7 },
    { id: 2, name: 'Habit Master', description: 'Maintained a 7-day streak', icon: '🔥', earned: longestStreak >= 7 },
    { id: 3, name: 'Task Crusher', description: 'Completed 100 tasks', icon: '💪', earned: completedTodos >= 100 },
    { id: 4, name: 'Consistency King', description: 'Maintained a 30-day streak', icon: '👑', earned: longestStreak >= 30 },
    { id: 5, name: 'Goal Getter', description: 'Achieved 5 major goals', icon: '🏆', earned: completedTodos >= 50 },
    { id: 6, name: 'Productivity Pro', description: 'Used the app for 100 days', icon: '⭐', earned: joinedDays >= 100 }
  ];

  // Get real recent activity from history
  const recentActivity = state.history.slice(0, 5).map(item => ({
    date: item.timestamp,
    action: `${item.action === 'completed' ? 'Completed' : item.action === 'added' ? 'Added' : item.action === 'edited' ? 'Edited' : 'Deleted'} "${item.title}" ${item.type}`,
    type: item.type === 'todo' ? 'task' : 'habit'
  }));

  const handleSave = () => {
    updateUser(profileForm);
    setIsEditing(false);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'habit': return <Target className="w-4 h-4 text-emerald-600" />;
      case 'task': return <User className="w-4 h-4 text-blue-600" />;
      case 'streak': return <TrendingUp className="w-4 h-4 text-orange-600" />;
      case 'achievement': return <Award className="w-4 h-4 text-purple-600" />;
      default: return <User className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Profile</h1>
        <p className="text-gray-600 dark:text-gray-300">Manage your profile and view your achievements</p>
      </div>

      <div className="space-y-8">
        {/* Top Row: Profile Info and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Info */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
            {/* Avatar Section */}
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div 
                  className="w-40 h-40 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: avatarBgColor }}
                >
                  <span className="text-white font-bold text-4xl">{avatar || state.user.username.charAt(0).toUpperCase()}</span>
                </div>
                <button 
                  onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                  className="absolute bottom-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <Camera className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
                <button 
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  className="absolute bottom-2 left-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: avatarBgColor }}></div>
                </button>
              </div>
              
              {/* Avatar Picker */}
              {showAvatarPicker && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Choose Avatar</h4>
                  <div className="grid grid-cols-6 gap-2">
                    {avatarOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setAvatar(option);
                          setShowAvatarPicker(false);
                        }}
                        className="w-12 h-12 text-xl hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Picker */}
              {showColorPicker && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Choose Background Color</h4>
                  <div className="grid grid-cols-6 gap-2">
                    {backgroundColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          setAvatarBgColor(color);
                          setShowColorPicker(false);
                        }}
                        className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:scale-110 transition-transform duration-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Details */}
            <div className="space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Real Name</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                    <input
                      type="text"
                      value={profileForm.username}
                      onChange={(e) => setProfileForm({...profileForm, username: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                    <textarea
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                    <input
                      type="text"
                      value={profileForm.location}
                      onChange={(e) => setProfileForm({...profileForm, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Birthday</label>
                    <input
                      type="date"
                      value={profileForm.birthday}
                      onChange={(e) => setProfileForm({...profileForm, birthday: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">@{state.user.username}</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">{state.user.name}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{state.user.bio}</p>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Born {formatDate(state.user.birthday)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {formatDate(state.user.joinDate)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{state.user.location}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full flex items-center justify-center space-x-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 py-2 px-4 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors duration-200"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
            
            {recentActivity.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Target className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                <p>No recent activity</p>
                <p className="text-sm">Start completing todos and habits to see your activity!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 dark:text-white">{activity.action}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(activity.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Row: Stats and Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Stats */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Stats</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.completedTasks}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Tasks Completed</p>
              </div>
              <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.totalHabits}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Active Habits</p>
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.longestStreak}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Longest Streak</p>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.joinedDays}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Days Active</p>
              </div>
              <div className="text-center p-4 bg-pink-50 dark:bg-pink-900/30 rounded-lg">
                <p className="text-2xl font-bold text-pink-600 dark:text-pink-400">{stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0}%</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Completion Rate</p>
              </div>
              <div className="text-center p-4 bg-cyan-50 dark:bg-cyan-900/30 rounded-lg">
                <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{achievements.filter(a => a.earned).length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Achievements</p>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Achievements</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    achievement.earned
                      ? 'border-yellow-200 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/30'
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <h4 className={`font-medium ${achievement.earned ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                        {achievement.name}
                      </h4>
                      <p className={`text-sm ${achievement.earned ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;