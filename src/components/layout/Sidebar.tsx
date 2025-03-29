
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart4, Users, FileText, ClipboardCheck, 
  Settings, LogOut, Home, FileInput, 
  Calculator, Globe, Shield, MessageSquare, 
  Briefcase, FileSearch, CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  toggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleCollapse }) => {
  const location = useLocation();
  
  // Main navigation items
  const mainNavItems = [
    { name: 'Principal', icon: Home, path: '/' },
  ];

  // Group modules by category
  const moduleGroups = [
    {
      title: 'Módulos Principais',
      items: [
        { name: 'Gestão de Clientes', icon: Users, path: '/clients-management' },
        { name: 'Créditos Tributários', icon: CreditCard, path: '/tax-credits' },
        { name: 'Calculadora Avançada', icon: Calculator, path: '/advanced-calculator' },
      ]
    },
    {
      title: 'Cálculos e Recuperação',
      items: [
        { name: 'Cálculos IRRF', icon: Calculator, path: '/irrf-calculations' },
        { name: 'Recuperação IRRF/PJ', icon: CreditCard, path: '/irrf-recovery' },
        { name: 'Identificação de Créditos', icon: FileSearch, path: '/credits-identification' },
      ]
    },
    {
      title: 'Relatórios',
      items: [
        { name: 'Relatórios Detalhados', icon: FileText, path: '/detailed-reports' },
        { name: 'Comprovantes de Retenção', icon: FileText, path: '/retention-receipts' },
        { name: 'Relatórios Fiscais', icon: FileText, path: '/fiscal-reports' },
        { name: 'Dashboard Interativo', icon: BarChart4, path: '/interactive-dashboard' },
      ]
    },
    {
      title: 'Gestão',
      items: [
        { name: 'Propostas Comerciais', icon: FileText, path: '/commercial-proposals' },
        { name: 'Compensação Tributária', icon: CreditCard, path: '/tax-compensation' },
        { name: 'Gestão de Auditorias', icon: ClipboardCheck, path: '/audit-management' },
      ]
    },
    {
      title: 'Sistema',
      items: [
        { name: 'Segurança & Auditoria', icon: Shield, path: '/security-audit' },
        { name: 'Operacional', icon: Briefcase, path: '/operational' },
        { name: 'Site e Conteúdo', icon: Globe, path: '/site-content' },
        { name: 'Importação', icon: FileInput, path: '/import' },
        { name: 'Suporte', icon: MessageSquare, path: '/support' },
        { name: 'Configurações', icon: Settings, path: '/settings' },
      ]
    }
  ];

  // Render a navigation section
  const renderNavSection = (title: string, items: typeof mainNavItems, isMainNav = false) => (
    <div className={cn("px-2 py-2", !isMainNav && !collapsed && "mt-2")}>
      {!collapsed && !isMainNav && (
        <h3 className="text-xs font-semibold text-sidebar-muted uppercase tracking-wider px-2 mb-2">
          {title}
        </h3>
      )}
      <ul className="space-y-1">
        {items.map((item) => {
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
                    "ml-3 transition-all duration-200 text-sm",
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
    </div>
  );

  return (
    <aside 
      className={cn(
        "bg-sidebar text-sidebar-foreground h-screen transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col items-center p-4 border-b border-sidebar-border">
        <div className="logo-container mb-2">
          <div className="cloned-logo animate-logo">
            <div className="logo-triangle"></div>
            <div className="logo-circle"></div>
          </div>
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
      
      <nav className="flex-grow py-2 overflow-y-auto scrollbar-none">
        {/* Main Navigation */}
        {renderNavSection('', mainNavItems, true)}
        
        {/* Module Groups */}
        {moduleGroups.map((group) => (
          renderNavSection(group.title, group.items)
        ))}
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
