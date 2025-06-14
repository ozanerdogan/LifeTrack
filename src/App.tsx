import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProgressSection from './components/ProgressSection';
import HistorySection from './components/HistorySection';
import SettingsSection from './components/SettingsSection';
import HelpSection from './components/HelpSection';
import ProfileSection from './components/ProfileSection';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default open for PC
  const [showProfile, setShowProfile] = useState(false);

  const renderContent = () => {
    if (showProfile) {
      return <ProfileSection />;
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
        return <Dashboard />;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
        onProfileClick={handleProfileClick}
      />
      
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen} 
          activeSection={showProfile ? '' : activeSection}
          onSectionChange={handleSectionChange}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-0' : ''}`}>
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;