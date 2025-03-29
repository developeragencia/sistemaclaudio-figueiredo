
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Calculator, 
  FileText, 
  BarChart3,
  Receipt, 
  CreditCard, 
  ShieldAlert,
  Cog,
  LifeBuoy,
  Import,
  Globe,
  ChevronDown, 
  ChevronRight,
  ShieldCheck,
  Lock,
  Clock,
  Shield,
  ShieldX,
  UserCheck
} from 'lucide-react';
import AnimatedLogo from '../ui/AnimatedLogo';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarProps {
  collapsed: boolean;
  toggleCollapse: () => void;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive?: boolean;
  collapsed?: boolean;
  hasSubmenu?: boolean;
  isSubmenuOpen?: boolean;
  toggleSubmenu?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  to, 
  isActive = false, 
  collapsed = false,
  hasSubmenu = false,
  isSubmenuOpen = false,
  toggleSubmenu
}) => {
  if (collapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Link 
            to={to} 
            className={cn(
              "flex items-center p-3 rounded-md hover:bg-blue-50 transition-colors",
              isActive && "bg-blue-50 text-blue-700"
            )}
            onClick={hasSubmenu && toggleSubmenu ? toggleSubmenu : undefined}
          >
            <div className="w-full flex justify-center">
              {React.cloneElement(icon as React.ReactElement, { 
                className: cn("h-5 w-5", isActive && "text-blue-700") 
              })}
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }
  
  return (
    <Link
      to={hasSubmenu ? "#" : to}
      onClick={hasSubmenu && toggleSubmenu ? toggleSubmenu : undefined}
      className={cn(
        "flex items-center px-3 py-2 rounded-md hover:bg-blue-50 transition-colors",
        isActive && "bg-blue-50 text-blue-700"
      )}
    >
      {React.cloneElement(icon as React.ReactElement, { 
        className: cn("h-5 w-5 mr-3", isActive && "text-blue-700") 
      })}
      <span className="font-medium text-sm flex-1">{label}</span>
      {hasSubmenu && (
        isSubmenuOpen ? 
          <ChevronDown className="h-4 w-4" /> : 
          <ChevronRight className="h-4 w-4" />
      )}
    </Link>
  );
};

interface SidebarSubmenuProps {
  items: {
    label: string;
    to: string;
  }[];
  isOpen: boolean;
  collapsed: boolean;
}

const SidebarSubmenu: React.FC<SidebarSubmenuProps> = ({ items, isOpen, collapsed }) => {
  const location = useLocation();
  
  if (!isOpen || collapsed) return null;
  
  return (
    <div className="ml-8 mt-1 space-y-1 border-l border-blue-100 pl-3">
      {items.map((item, index) => (
        <Link
          key={index}
          to={item.to}
          className={cn(
            "block py-1.5 text-sm text-lawyer-600 transition-colors hover:text-blue-700",
            location.pathname === item.to && "font-medium text-blue-700"
          )}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleCollapse }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<{[key: string]: boolean}>({
    calculations: false,
    reports: false,
    management: false,
    system: false,
    security: false
  });
  
  const toggleSubmenu = (menu: string) => {
    if (collapsed) return;
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };
  
  const calculationItems = [
    { label: "Cálculos IRRF", to: "/irrf-calculations" },
    { label: "Recuperação IRRF/PJ", to: "/irrf-recovery" },
    { label: "Identificação de Créditos", to: "/credits-identification" },
  ];
  
  const reportItems = [
    { label: "Relatórios Detalhados", to: "/detailed-reports" },
    { label: "Comprovantes de Retenção", to: "/retention-receipts" },
    { label: "Relatórios Fiscais", to: "/fiscal-reports" },
    { label: "Dashboard Interativo", to: "/interactive-dashboard" },
  ];
  
  const managementItems = [
    { label: "Propostas Comerciais", to: "/commercial-proposals" },
    { label: "Compensação Tributária", to: "/tax-compensation" },
    { label: "Gestão de Auditorias", to: "/audit-management" },
  ];
  
  const systemItems = [
    { label: "Operacional", to: "/operational" },
    { label: "Site e Conteúdo", to: "/site-editor" },
    { label: "Importação", to: "/import" },
  ];

  const securityItems = [
    { label: "Autenticação em Dois Fatores", to: "/two-factor-auth" },
    { label: "Expiração de Sessão", to: "/session-expiration" },
    { label: "Proteção de Acesso", to: "/access-protection" },
    { label: "Trilhas de Auditoria", to: "/audit-trails" },
    { label: "Usuários e Permissões", to: "/users-permissions" },
  ];

  return (
    <aside className={cn(
      "h-screen fixed z-30 bg-white border-r transition-all duration-300 flex flex-col shadow-sm",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center h-16 border-b px-3">
        {!collapsed ? (
          <div className="w-full flex items-center justify-between">
            <AnimatedLogo size="small" />
            <button 
              onClick={toggleCollapse} 
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <button 
              onClick={toggleCollapse} 
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors"
            >
              <AnimatedLogo size="small" showText={false} />
            </button>
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {/* Dashboard */}
        <SidebarItem 
          icon={<Home />} 
          label="Dashboard" 
          to="/dashboard" 
          isActive={location.pathname === "/dashboard"}
          collapsed={collapsed} 
        />
        
        {/* Módulos Principais */}
        <div className={cn("pt-4 pb-2", !collapsed && "px-3")}>
          {!collapsed && <p className="text-xs text-blue-500 font-medium uppercase">Módulos Principais</p>}
        </div>
        
        <SidebarItem 
          icon={<Users />} 
          label="Gestão de Clientes" 
          to="/clients-management"
          isActive={location.pathname === "/clients-management"} 
          collapsed={collapsed}
        />
        
        <SidebarItem 
          icon={<Calculator />} 
          label="Cálculos e Recuperação" 
          to="#" 
          hasSubmenu={true}
          isSubmenuOpen={openMenus.calculations}
          toggleSubmenu={() => toggleSubmenu('calculations')}
          collapsed={collapsed}
        />
        
        <SidebarSubmenu 
          items={calculationItems} 
          isOpen={openMenus.calculations} 
          collapsed={collapsed} 
        />
        
        <SidebarItem 
          icon={<ShieldCheck />} 
          label="Auditoria Tributária" 
          to="/tax-audit"
          isActive={location.pathname === "/tax-audit"} 
          collapsed={collapsed}
        />
        
        <SidebarItem 
          icon={<FileText />} 
          label="Relatórios" 
          to="#" 
          hasSubmenu={true}
          isSubmenuOpen={openMenus.reports}
          toggleSubmenu={() => toggleSubmenu('reports')}
          collapsed={collapsed}
        />
        
        <SidebarSubmenu 
          items={reportItems} 
          isOpen={openMenus.reports} 
          collapsed={collapsed} 
        />
        
        <SidebarItem 
          icon={<BarChart3 />} 
          label="Gestão" 
          to="#" 
          hasSubmenu={true}
          isSubmenuOpen={openMenus.management}
          toggleSubmenu={() => toggleSubmenu('management')}
          collapsed={collapsed}
        />
        
        <SidebarSubmenu 
          items={managementItems} 
          isOpen={openMenus.management} 
          collapsed={collapsed} 
        />
        
        {/* Sistema */}
        <div className={cn("pt-4 pb-2", !collapsed && "px-3")}>
          {!collapsed && <p className="text-xs text-blue-500 font-medium uppercase">Sistema</p>}
        </div>
        
        <SidebarItem 
          icon={<Globe />} 
          label="Sistema" 
          to="#" 
          hasSubmenu={true}
          isSubmenuOpen={openMenus.system}
          toggleSubmenu={() => toggleSubmenu('system')}
          collapsed={collapsed}
        />
        
        <SidebarSubmenu 
          items={systemItems} 
          isOpen={openMenus.system} 
          collapsed={collapsed} 
        />

        {/* Segurança & Auditoria - New section */}
        <SidebarItem 
          icon={<ShieldAlert />} 
          label="Segurança & Auditoria" 
          to="#" 
          hasSubmenu={true}
          isSubmenuOpen={openMenus.security}
          toggleSubmenu={() => toggleSubmenu('security')}
          collapsed={collapsed}
        />
        
        <SidebarSubmenu 
          items={securityItems} 
          isOpen={openMenus.security} 
          collapsed={collapsed} 
        />
        
        <SidebarItem 
          icon={<LifeBuoy />} 
          label="Suporte" 
          to="/support" 
          isActive={location.pathname === "/support"}
          collapsed={collapsed}
        />
        
        <SidebarItem 
          icon={<Cog />} 
          label="Configurações" 
          to="/settings" 
          isActive={location.pathname === "/settings"}
          collapsed={collapsed}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
