
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
  Lightbulb,
  LayoutDashboard,
  Check,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  badge?: number | string;
  className?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  to, 
  isActive = false, 
  collapsed = false,
  hasSubmenu = false,
  isSubmenuOpen = false,
  toggleSubmenu,
  badge,
  className
}) => {
  if (collapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Link 
            to={to} 
            className={cn(
              "flex items-center p-3 rounded-lg mb-1 hover:bg-white/20 transition-all ease-in-out duration-200",
              isActive && "bg-white/20 text-white shadow-md",
              className
            )}
            onClick={hasSubmenu && toggleSubmenu ? toggleSubmenu : undefined}
          >
            <div className="w-full flex justify-center relative">
              {React.cloneElement(icon as React.ReactElement, { 
                className: cn("h-5 w-5", isActive && "text-white") 
              })}
              
              {badge && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {badge}
                </span>
              )}
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="border-white/20">
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
        "flex items-center justify-between px-4 py-3 rounded-lg mb-1 transition-all duration-200 hover:bg-white/20 group",
        isActive && "bg-white/15 text-white shadow-md",
        className
      )}
    >
      <div className="flex items-center">
        {React.cloneElement(icon as React.ReactElement, { 
          className: cn("h-5 w-5 mr-3", 
            isActive ? "text-white" : "text-white/80") 
        })}
        <span className={cn(
          "font-medium text-sm transition-all", 
          isActive ? "text-white" : "text-white/80",
          "group-hover:text-white"
        )}>
          {label}
        </span>
      </div>
      
      <div className="flex items-center">
        {badge && (
          <span className="mr-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
            {badge}
          </span>
        )}
        
        {hasSubmenu && (
          <motion.div
            animate={{ rotate: isSubmenuOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="h-4 w-4" />
          </motion.div>
        )}
      </div>
    </Link>
  );
};

interface SidebarSubmenuProps {
  items: {
    label: string;
    to: string;
    badge?: number | string;
  }[];
  isOpen: boolean;
  collapsed: boolean;
}

const SidebarSubmenu: React.FC<SidebarSubmenuProps> = ({ items, isOpen, collapsed }) => {
  const location = useLocation();
  
  if (!isOpen || collapsed) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="ml-7 mt-1 space-y-1 border-l border-white/20 pl-3"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={cn(
                "flex items-center justify-between py-2 pl-2 pr-4 text-sm rounded-md transition-colors",
                location.pathname === item.to 
                  ? "text-white bg-white/10" 
                  : "text-white/70 hover:text-white hover:bg-white/10"
              )}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleCollapse }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<{[key: string]: boolean}>({
    calculations: false,
    reports: false,
    management: false,
    system: false
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
    { label: "Comprovantes de Retenção", to: "/retention-receipts", badge: "3" },
    { label: "Relatórios Fiscais", to: "/fiscal-reports" },
    { label: "Dashboard Interativo", to: "/interactive-dashboard" },
  ];
  
  const managementItems = [
    { label: "Propostas Comerciais", to: "/commercial-proposals", badge: "5" },
    { label: "Compensação Tributária", to: "/tax-compensation" },
    { label: "Gestão de Auditorias", to: "/audit-management" },
  ];
  
  const systemItems = [
    { label: "Segurança & Auditoria", to: "/security-audit" },
    { label: "Operacional", to: "/operational" },
    { label: "Site e Conteúdo", to: "/site-editor" },
    { label: "Importação", to: "/import" },
  ];

  // Sidebar animation
  const sidebarVariants = {
    expanded: { width: '16rem' },
    collapsed: { width: '4rem' }
  };

  return (
    <motion.aside 
      className={cn(
        "h-screen fixed z-30 bg-gradient-to-b from-sky-950 to-indigo-950 border-r border-indigo-900/30 transition-all flex flex-col shadow-xl",
        collapsed ? "w-16" : "w-64"
      )}
      variants={sidebarVariants}
      initial={collapsed ? "collapsed" : "expanded"}
      animate={collapsed ? "collapsed" : "expanded"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex items-center h-16 border-b border-white/10 px-3">
        {!collapsed ? (
          <div className="w-full flex items-center justify-between">
            <AnimatedLogo size="small" />
            <button 
              onClick={toggleCollapse} 
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="h-4 w-4 text-white" />
            </button>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <button 
              onClick={toggleCollapse} 
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <AnimatedLogo size="small" showText={false} />
            </button>
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {/* Back to Home Button */}
        <SidebarItem 
          icon={<ArrowLeft />} 
          label="Voltar para Home" 
          to="/" 
          isActive={location.pathname === "/"} 
          collapsed={collapsed} 
          className="mb-4 bg-gradient-to-r from-indigo-600/50 to-sky-600/50 hover:from-indigo-600/70 hover:to-sky-600/70"
        />
        
        {/* Dashboard */}
        <SidebarItem 
          icon={<LayoutDashboard />} 
          label="Dashboard" 
          to="/dashboard" 
          isActive={location.pathname === "/dashboard"}
          collapsed={collapsed} 
        />
        
        {/* Módulos Principais */}
        <div className={cn("pt-4 pb-2", !collapsed && "px-1")}>
          {!collapsed && (
            <div className="ml-2 text-xs text-indigo-300 font-medium uppercase border-b border-indigo-800/50 pb-1">
              Módulos Principais
            </div>
          )}
        </div>
        
        <SidebarItem 
          icon={<Users />} 
          label="Gestão de Clientes" 
          to="/clients-management"
          isActive={location.pathname === "/clients-management"} 
          collapsed={collapsed}
          badge="2"
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
          badge="3"
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
          badge="5"
        />
        
        <SidebarSubmenu 
          items={managementItems} 
          isOpen={openMenus.management} 
          collapsed={collapsed} 
        />
        
        {/* Sistema */}
        <div className={cn("pt-4 pb-2", !collapsed && "px-1")}>
          {!collapsed && (
            <div className="ml-2 text-xs text-indigo-300 font-medium uppercase border-b border-indigo-800/50 pb-1">
              Sistema
            </div>
          )}
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
      
      {/* Footer with status */}
      {!collapsed && (
        <div className="border-t border-white/10 px-3 py-2 bg-indigo-950/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
              <span className="text-xs text-indigo-200/80">Sistema operacional</span>
            </div>
            <span className="text-xs text-indigo-200/60">v1.2.0</span>
          </div>
        </div>
      )}
    </motion.aside>
  );
};

export default Sidebar;
