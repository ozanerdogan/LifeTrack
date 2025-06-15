import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProgressSection from './components/ProgressSection';
import HistorySection from './components/HistorySection';
import SettingsSection from './components/SettingsSection';
import HelpSection from './components/HelpSection';
import ProfileSection from './components/ProfileSection';
import LoginPage from './components/LoginPage';
import { getState, subscribe, updateUser } from './utils/globalState';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768); // Default open for desktop, closed for mobile
  const [showProfile, setShowProfile] = useState(false);
  const [globalState, setGlobalState] = useState(getState());
  
  useEffect(() => {
    return subscribe(setGlobalState);
  }, []);

  const renderContent = () => {
    if (showProfile) {
      return <ProfileSection avatar={globalState.user.avatar} setAvatar={(avatar) => updateUser({ avatar })} />;
    }

    switch (activeSection) {
      case 'progress':
        return <ProgressSection />;
      case 'history':
        return <HistorySection />;
      case 'settings':
        return <SettingsSection />;
      case 'help':
        return <HelpSection />;
      default:
        return <Dashboard avatar={globalState.user.avatar} />;
    }
  };

  const handleProfileClick = () => {
    setShowProfile(true);
    setActiveSection(''); // Clear active section when showing profile
  };

  const handleSectionChange = (section: string) => {
    setShowProfile(false); // Hide profile when navigating to other sections
    setActiveSection(section);
  };

  const handleLogoClick = () => {
    setShowProfile(false);
    setActiveSection('home');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowProfile(false);
    setActiveSection('home');
  };

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      <Navbar 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
        onProfileClick={handleProfileClick}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isOpen={sidebarOpen} 
          activeSection={showProfile ? '' : activeSection}
          onSectionChange={handleSectionChange}
          onClose={() => setSidebarOpen(false)}
          onLogout={handleLogout}
        />
        
        <main className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${sidebarOpen && window.innerWidth < 768 ? 'ml-0' : ''}`}>
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;