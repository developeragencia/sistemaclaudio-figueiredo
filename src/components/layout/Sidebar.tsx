
import React from 'react';
import { Link } from 'react-router-dom';
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
      <div className="flex items-center p-4 border-b border-sidebar-border">
        {!collapsed && (
          <span className="text-xl font-bold text-sidebar-foreground">
            Tax<span className="text-sidebar-primary">Credit</span>
          </span>
        )}
        {collapsed && (
          <span className="text-xl font-bold mx-auto">
            TC
          </span>
        )}
      </div>
      
      <nav className="flex-grow py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center p-2 rounded-md transition-colors",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  "focus:bg-sidebar-accent focus:text-sidebar-accent-foreground",
                  "active:bg-sidebar-accent active:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <button
          className="flex items-center w-full p-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="ml-3">Sair</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
