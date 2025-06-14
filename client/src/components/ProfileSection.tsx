import React, { useState } from 'react';
import { User, Edit, Camera, Award, Calendar, Target, TrendingUp, Settings } from 'lucide-react';

interface ProfileSectionProps {
  avatar: string;
  setAvatar: (avatar: string) => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ avatar, setAvatar }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Productivity enthusiast focused on building better habits and achieving goals.',
    joinDate: '2024-01-01',
    location: 'New York, NY'
  });

  const avatarOptions = [
    '🐱', '🐶', '🐻', '🦊', '🐰', '🐼',
    '👨', '👩', '👦', '👧', '🧑', '👴',
    '🤖', '👽', '🎭', '🎨', '⭐', '🌟'
  ];

  const stats = {
    totalTasks: 156,
    completedTasks: 142,
    totalHabits: 12,
    longestStreak: 28,
    joinedDays: 45
  };

  const achievements = [
    { id: 1, name: 'First Week', description: 'Completed your first week', icon: '🎯', earned: true },
    { id: 2, name: 'Habit Master', description: 'Maintained a 7-day streak', icon: '🔥', earned: true },
    { id: 3, name: 'Task Crusher', description: 'Completed 100 tasks', icon: '💪', earned: true },
    { id: 4, name: 'Consistency King', description: 'Maintained a 30-day streak', icon: '👑', earned: false },
    { id: 5, name: 'Goal Getter', description: 'Achieved 5 major goals', icon: '🏆', earned: false },
    { id: 6, name: 'Productivity Pro', description: 'Used the app for 100 days', icon: '⭐', earned: false }
  ];

  const recentActivity = [
    { date: '2024-01-15', action: 'Completed Morning Exercise habit', type: 'habit' },
    { date: '2024-01-15', action: 'Finished "Review project proposal" task', type: 'task' },
    { date: '2024-01-14', action: 'Started a new 5-day streak', type: 'streak' },
    { date: '2024-01-14', action: 'Completed "Update portfolio website" task', type: 'task' },
    { date: '2024-01-13', action: 'Earned "Task Crusher" achievement', type: 'achievement' }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to backend
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your profile and view your achievements</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
            {/* Avatar Section */}
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">JD</span>
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Profile Details */}
            <div className="space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({...profile, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    <h2 className="text-xl font-semibold text-gray-900">{profile.name}</h2>
                    <p className="text-gray-600">{profile.email}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-700 mb-3">{profile.bio}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {new Date(profile.joinDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{profile.location}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full flex items-center justify-center space-x-2 bg-blue-50 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats and Achievements */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Stats</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{stats.completedTasks}</p>
                <p className="text-sm text-gray-600">Tasks Completed</p>
              </div>
              <div className="text-center p-4 bg-emerald-50 rounded-lg">
                <p className="text-2xl font-bold text-emerald-600">{stats.totalHabits}</p>
                <p className="text-sm text-gray-600">Active Habits</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">{stats.longestStreak}</p>
                <p className="text-sm text-gray-600">Longest Streak</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{stats.joinedDays}</p>
                <p className="text-sm text-gray-600">Days Active</p>
              </div>
              <div className="text-center p-4 bg-pink-50 rounded-lg">
                <p className="text-2xl font-bold text-pink-600">{Math.round((stats.completedTasks / stats.totalTasks) * 100)}%</p>
                <p className="text-sm text-gray-600">Completion Rate</p>
              </div>
              <div className="text-center p-4 bg-cyan-50 rounded-lg">
                <p className="text-2xl font-bold text-cyan-600">{achievements.filter(a => a.earned).length}</p>
                <p className="text-sm text-gray-600">Achievements</p>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    achievement.earned
                      ? 'border-yellow-200 bg-yellow-50'
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <h4 className={`font-medium ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                        {achievement.name}
                      </h4>
                      <p className={`text-sm ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
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