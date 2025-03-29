
import React from 'react';
import { useClient } from '../../contexts/ClientContext';
import { ChevronDown, Bell, Building2, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { activeClient } = useClient();

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 shadow-sm">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-4 hover:bg-gray-100 transition-colors"
          onClick={toggleSidebar}
        >
          <Menu className="w-5 h-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
        
        {/* Active Client Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 bg-white hover:bg-gray-50 transition-all duration-200 border-accent text-accent"
            >
              <Building2 className="w-5 h-5" />
              <span className="font-medium">
                {activeClient ? activeClient.name : 'Selecionar Cliente'}
              </span>
              <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-white w-72 z-50 animate-in fade-in-80 slide-in-from-top-5">
            <DropdownMenuItem className="cursor-pointer hover:bg-muted focus:bg-muted transition-colors">
              Prefeitura de São Paulo
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-muted focus:bg-muted transition-colors">
              Governo do Estado de Minas Gerais
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-muted focus:bg-muted transition-colors">
              Universidade Federal do Rio de Janeiro
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative hover:bg-gray-100 transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            3
          </span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <User className="w-5 h-5 text-accent" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500">admin@claudiofigueiredo.com</p>
              </div>
              <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white w-56 z-50 animate-in fade-in-80 slide-in-from-top-5">
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 transition-colors">Meu Perfil</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 transition-colors">Configurações</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors">Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
