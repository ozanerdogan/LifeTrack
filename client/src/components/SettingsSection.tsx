import React, { useState } from 'react';
import { Settings, User, Bell, Palette, Shield, Database, Moon, Sun } from 'lucide-react';

const SettingsSection: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    habits: true,
    tasks: true,
    weekly: false,
    email: true
  });

  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    timezone: 'America/New_York'
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Customize your LifeTrack experience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <User className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
              <select
                value={profile.timezone}
                onChange={(e) => setProfile({...profile, timezone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
              </select>
            </div>

            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Save Profile
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
                <p className="font-medium text-gray-900">Habit Reminders</p>
                <p className="text-sm text-gray-600">Get reminded about your daily habits</p>
              </div>
              <button
                onClick={() => setNotifications({...notifications, habits: !notifications.habits})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.habits ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.habits ? 'translate-x-6' : 'translate-x-1'
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
                onClick={() => setNotifications({...notifications, tasks: !notifications.tasks})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.tasks ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.tasks ? 'translate-x-6' : 'translate-x-1'
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
                onClick={() => setNotifications({...notifications, weekly: !notifications.weekly})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.weekly ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.weekly ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-600">Receive notifications via email</p>
              </div>
              <button
                onClick={() => setNotifications({...notifications, email: !notifications.email})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.email ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.email ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <Palette className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Appearance</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {darkMode ? <Moon className="w-5 h-5 text-gray-600" /> : <Sun className="w-5 h-5 text-gray-600" />}
                <div>
                  <p className="font-medium text-gray-900">Dark Mode</p>
                  <p className="text-sm text-gray-600">Switch to dark theme</p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  darkMode ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme Color</label>
              <div className="flex space-x-2">
                {['blue', 'emerald', 'purple', 'orange', 'pink'].map(color => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full bg-${color}-500 hover:scale-110 transition-transform`}
                  />
                ))}
              </div>
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