import React, { useState } from 'react';
import { User, Bell, Menu, X } from 'lucide-react';

interface NavbarProps {
  onMenuToggle: () => void;
  onProfileClick: () => void;
  onLogoClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle, onProfileClick, onLogoClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Welcome to LifeTrack! Start by adding your first task or habit.', read: false }
  ]);

  const dismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left - Hamburger menu for mobile */}
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 md:hidden"
            >
              <Menu className="w-6 h-6 text-gray-600" />
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
            <span className="text-xl font-semibold text-gray-800">
              LifeTrack
            </span>
          </button>

          {/* Right - Profile and Notifications */}
          <div className="flex items-center space-x-3 relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              )}
            </button>
            
            {/* Notifications Popup */}
            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No new notifications
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div key={notif.id} className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                        <div className="flex justify-between items-start">
                          <p className="text-sm text-gray-700 flex-1">{notif.message}</p>
                          <button
                            onClick={() => dismissNotification(notif.id)}
                            className="ml-2 text-gray-400 hover:text-gray-600"
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