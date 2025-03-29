
import React, { useState } from 'react';
import { Bell, Menu, X, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { userEmail, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado do sistema."
    });
    navigate('/login');
  };
  
  const userInitials = userEmail ? userEmail.substring(0, 2).toUpperCase() : 'AA';

  return (
    <header className="h-16 px-4 border-b flex items-center justify-between bg-white">
      {/* Left section - Menu toggle */}
      <div>
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden" aria-label="Menu">
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Right section - notifications and user menu */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 mt-2" align="end">
            <div className="space-y-4">
              <div className="font-medium">Notificações</div>
              <div className="text-sm text-muted-foreground">
                Você não tem novas notificações.
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* User Avatar */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60 mt-2" align="end">
            <div className="space-y-3">
              <div>
                <p className="font-medium">Administrador</p>
                <p className="text-sm text-muted-foreground">{userEmail}</p>
              </div>
              <div className="border-t pt-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
