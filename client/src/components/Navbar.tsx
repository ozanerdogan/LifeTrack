import React, { useState, useEffect } from 'react';
import { User, Bell, Menu, X } from 'lucide-react';
import { getState, subscribe, markNotificationAsRead, removeNotification } from '../utils/globalState';

interface NavbarProps {
  onMenuToggle: () => void;
  onProfileClick: () => void;
  onLogoClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle, onProfileClick, onLogoClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [state, setState] = useState(getState());

  useEffect(() => {
    return subscribe(setState);
  }, []);

  const dismissNotification = (id: string) => {
    removeNotification(id);
  };

  const handleNotificationClick = (id: string) => {
    markNotificationAsRead(id);
  };

  const unreadCount = state.notifications.filter(n => !n.read).length;

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left - Hamburger menu for mobile */}
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 md:hidden"
            >
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Center - Logo */}
          <button 
            onClick={onLogoClick}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LT</span>
            </div>
            <span className="text-xl font-semibold text-gray-800 dark:text-white">
              LifeTrack
            </span>
          </button>

          {/* Right - Profile and Notifications */}
          <div className="flex items-center space-x-3 relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 relative"
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              )}
            </button>
            
            {/* Notifications Popup */}
            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {state.notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                      No new notifications
                    </div>
                  ) : (
                    state.notifications.map((notif) => (
                      <div key={notif.id} className="p-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className={`font-medium text-sm ${notif.read ? 'text-gray-600 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                              {notif.title}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{notif.message}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                              {new Date(notif.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                          <button
                            onClick={() => dismissNotification(notif.id)}
                            className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
            
            <button 
              onClick={onProfileClick}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Click outside to close notifications */}
      {showNotifications && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowNotifications(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;