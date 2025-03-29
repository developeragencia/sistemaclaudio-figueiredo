
import React from 'react';
import { useClient } from '../../contexts/ClientContext';
import { ChevronDown, Bell, Building2, User } from 'lucide-react';
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
          className="mr-4"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <line x1="9" y1="3" x2="9" y2="21" />
          </svg>
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
        
        {/* Active Client Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-taxBlue-800" />
              <span className="font-medium">
                {activeClient ? activeClient.name : 'Selecionar Cliente'}
              </span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-white w-72 z-50">
            <DropdownMenuItem className="cursor-pointer">
              Prefeitura de São Paulo
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Governo do Estado de Minas Gerais
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Universidade Federal do Rio de Janeiro
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-taxBlue-100 flex items-center justify-center">
                <User className="w-5 h-5 text-taxBlue-800" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500">admin@taxcredit.com</p>
              </div>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white w-56 z-50">
            <DropdownMenuItem>Meu Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
