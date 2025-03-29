
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart4, Users, FileText, ClipboardCheck, 
  Settings, LogOut, Home, FileInput 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  toggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleCollapse }) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Clientes', icon: Users, path: '/clients' },
    { name: 'Propostas', icon: FileText, path: '/proposals' },
    { name: 'Importação', icon: FileInput, path: '/import' },
    { name: 'Auditoria', icon: ClipboardCheck, path: '/audit' },
    { name: 'Relatórios', icon: BarChart4, path: '/reports' },
    { name: 'Configurações', icon: Settings, path: '/settings' },
  ];

  return (
    <aside 
      className={cn(
        "bg-sidebar text-sidebar-foreground h-screen transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col items-center p-4 border-b border-sidebar-border">
        <div className="logo-container mb-2">
          <img 
            src="/lovable-uploads/d5d79599-0ca0-43c9-a921-360cebf9b230.png" 
            alt="Sistemas Claudio Figueiredo" 
            className="logo w-12 h-12 animate-logo"
          />
        </div>
        {!collapsed && (
          <div className="text-center">
            <span className="text-lg font-bold text-sidebar-foreground block">
              Sistemas
            </span>
            <span className="text-md font-medium text-sidebar-primary">
              Claudio Figueiredo
            </span>
          </div>
        )}
        {collapsed && (
          <span className="text-xl font-bold mx-auto mt-2">
            CF
          </span>
        )}
      </div>
      
      <nav className="flex-grow py-4 overflow-y-auto scrollbar-none">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name} className="group">
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center p-2 rounded-md transition-all duration-200",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    "focus:bg-sidebar-accent focus:text-sidebar-accent-foreground",
                    isActive 
                      ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                      : "text-sidebar-foreground"
                  )}
                >
                  <item.icon className={cn(
                    "w-5 h-5 transition-transform duration-200", 
                    !collapsed && "group-hover:translate-x-1",
                    isActive && "text-sidebar-primary"
                  )} />
                  {!collapsed && (
                    <span className={cn(
                      "ml-3 transition-all duration-200",
                      isActive && "font-medium text-sidebar-primary"
                    )}>
                      {item.name}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <button
          className="flex items-center w-full p-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200"
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="ml-3">Sair</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
