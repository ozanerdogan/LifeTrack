import React, { useState, useEffect } from 'react';
import { Settings, User, Bell, Palette, Shield, Database, Moon, Sun, Globe, Clock } from 'lucide-react';
import { getState, subscribe, updateUser } from '../utils/globalState';

const SettingsSection: React.FC = () => {
  const [state, setState] = useState(getState());

  const [profileForm, setProfileForm] = useState({
    name: state.user.name,
    username: state.user.username,
    email: state.user.email,
    password: state.user.password
  });

  const [siteForm, setSiteForm] = useState({
    language: state.user.language,
    timezone: state.user.timezone,
    dateFormat: state.user.dateFormat,
    darkMode: state.user.darkMode
  });

  useEffect(() => {
    const unsubscribe = subscribe(setState);
    return unsubscribe;
  }, []);

  const handleProfileSave = () => {
    updateUser(profileForm);
  };

  const handleSiteSave = () => {
    updateUser(siteForm);
  };

  const handleNotificationSave = (updates: Partial<typeof state.user.notifications>) => {
    updateUser({ 
      notifications: { 
        ...state.user.notifications, 
        ...updates 
      } 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
        <p className="text-gray-600 dark:text-gray-300">Customize your LifeTrack experience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
              <User className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
              <input
                type="text"
                value={profileForm.username}
                onChange={(e) => setProfileForm({...profileForm, username: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={profileForm.password}
                onChange={(e) => setProfileForm({...profileForm, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            <button 
              onClick={handleProfileSave}
              className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
            >
              Save Profile
            </button>
          </div>
        </div>

        {/* Site Settings */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
              <Globe className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Site</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
              <select
                value={siteForm.language}
                onChange={(e) => setSiteForm({...siteForm, language: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Chinese">Chinese</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time Zone</label>
              <select
                value={siteForm.timezone}
                onChange={(e) => setSiteForm({...siteForm, timezone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="America/New_York">Eastern Time (UTC-5)</option>
                <option value="America/Chicago">Central Time (UTC-6)</option>
                <option value="America/Denver">Mountain Time (UTC-7)</option>
                <option value="America/Los_Angeles">Pacific Time (UTC-8)</option>
                <option value="Europe/London">London (UTC+0)</option>
                <option value="Europe/Paris">Paris (UTC+1)</option>
                <option value="Asia/Tokyo">Tokyo (UTC+9)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date Format</label>
              <select
                value={siteForm.dateFormat}
                onChange={(e) => setSiteForm({...siteForm, dateFormat: e.target.value as 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD'})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY (12/25/2024)</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY (25/12/2024)</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD (2024-12-25)</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {siteForm.darkMode ? <Moon className="w-5 h-5 text-gray-600" /> : <Sun className="w-5 h-5 text-gray-600" />}
                <div>
                  <p className="font-medium text-gray-900">Dark Mode</p>
                  <p className="text-sm text-gray-600">Switch to dark theme</p>
                </div>
              </div>
              <button
                onClick={() => setSiteForm({...siteForm, darkMode: !siteForm.darkMode})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  siteForm.darkMode ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    siteForm.darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <button 
              onClick={handleSiteSave}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Save Site Settings
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Bell className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Streak Records</p>
                <p className="text-sm text-gray-600">Get notified when you break habit streak records</p>
              </div>
              <button
                onClick={() => handleNotificationSave({streakRecords: !state.user.notifications.streakRecords})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  state.user.notifications.streakRecords ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    state.user.notifications.streakRecords ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Habit Reminders</p>
                <p className="text-sm text-gray-600">Get reminded about your daily habits</p>
              </div>
              <button
                onClick={() => handleNotificationSave({habitReminders: !state.user.notifications.habitReminders})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  state.user.notifications.habitReminders ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    state.user.notifications.habitReminders ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Task Deadlines</p>
                <p className="text-sm text-gray-600">Notifications for upcoming task deadlines</p>
              </div>
              <button
                onClick={() => handleNotificationSave({taskDeadlines: !state.user.notifications.taskDeadlines})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  state.user.notifications.taskDeadlines ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    state.user.notifications.taskDeadlines ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Weekly Summary</p>
                <p className="text-sm text-gray-600">Weekly progress reports</p>
              </div>
              <button
                onClick={() => handleNotificationSave({weeklyProgress: !state.user.notifications.weeklyProgress})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  state.user.notifications.weeklyProgress ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    state.user.notifications.weeklyProgress ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Data & Privacy */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Data & Privacy</h2>
          </div>

          <div className="space-y-4">
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <Database className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Export Data</p>
                  <p className="text-sm text-gray-600">Download all your data</p>
                </div>
              </div>
            </button>

            <button className="w-full text-left p-3 border border-red-200 rounded-lg hover:bg-red-50 transition-colors duration-200 text-red-600">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5" />
                <div>
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm">Permanently delete your account and data</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;