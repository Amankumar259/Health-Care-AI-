import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Trophy, 
  MessageCircle, 
  Users, 
  User, 
  Settings,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, key: 'dashboard' },
  { name: 'Challenges', icon: Trophy, key: 'challenges' },
  { name: 'Chatbot', icon: MessageCircle, key: 'chatbot' },
  { name: 'Community', icon: Users, key: 'community' },
  { name: 'Profile', icon: User, key: 'profile' },
  { name: 'Settings', icon: Settings, key: 'settings' },
];

export default function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out",
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center p-6 border-b border-gray-200">
            <div className="text-center">
              <h1 className="text-xl font-bold text-blue-600">HealthAI</h1>
              <p className="text-sm text-gray-500">AI Preventive Healthcare</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.key}
                  variant={currentPage === item.key ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    currentPage === item.key && "bg-blue-600 text-white hover:bg-blue-700"
                  )}
                  onClick={() => {
                    onPageChange(item.key);
                    setIsOpen(false);
                  }}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}