import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import Sidebar from '@/components/Sidebar';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Challenges from '@/pages/Challenges';
import Chatbot from '@/pages/Chatbot';
import Profile from '@/pages/Profile';
import Community from '@/pages/Community';
import Settings from '@/pages/Settings';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'challenges':
        return <Challenges />;
      case 'chatbot':
        return <Chatbot />;
      case 'profile':
        return <Profile />;
      case 'community':
        return <Community />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return (
      <TooltipProvider>
        <Toaster />
        <Login onLogin={handleLogin} />
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Toaster />
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <main className="flex-1 md:ml-64 p-6">
          <div className="max-w-7xl mx-auto">
            {renderCurrentPage()}
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
};

export default App;