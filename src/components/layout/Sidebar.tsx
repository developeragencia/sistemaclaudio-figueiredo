
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
              "flex items-center justify-center p-3 rounded-xl mb-2 transition-all duration-300",
              isActive 
                ? "bg-white/20 text-white shadow-lg" 
                : "hover:bg-white/10 text-white/70",
              className
            )}
            onClick={hasSubmenu && toggleSubmenu ? toggleSubmenu : undefined}
          >
            <div className="relative">
              {React.cloneElement(icon as React.ReactElement, { 
                className: cn("h-5 w-5", isActive ? "text-white" : "text-white/70") 
              })}
              
              {badge && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {badge}
                </span>
              )}
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="border-none bg-gray-800/90">
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
        "flex items-center justify-between px-4 py-3 rounded-xl mb-2 transition-all duration-300",
        isActive 
          ? "bg-white/20 text-white shadow-lg" 
          : "text-white/70 hover:bg-white/10 hover:text-white",
        className
      )}
    >
      <div className="flex items-center">
        {React.cloneElement(icon as React.ReactElement, { 
          className: cn("h-5 w-5 mr-3", 
            isActive ? "text-white" : "text-white/70") 
        })}
        <span className={cn(
          "font-medium text-sm",
          isActive ? "text-white" : "text-white/80"
        )}>
          {label}
        </span>
      </div>
      
      <div className="flex items-center">
        {badge && (
          <span className="mr-2 bg-rose-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
            {badge}
          </span>
        )}
        
        {hasSubmenu && (
          <motion.div
            animate={{ rotate: isSubmenuOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="h-4 w-4 text-white/70" />
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
          className="ml-5 mt-1 mb-3 space-y-1 border-l border-white/20 pl-3"
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
                "flex items-center justify-between py-2 pl-2 pr-3 text-sm rounded-md transition-all duration-200",
                location.pathname === item.to 
                  ? "text-white bg-white/10 font-medium" 
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="bg-rose-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
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

const SidebarSection: React.FC<{title: string, collapsed: boolean}> = ({ title, collapsed }) => {
  if (collapsed) return null;
  
  return (
    <div className="px-4 py-2">
      <h3 className="text-xs font-semibold uppercase text-white/50 tracking-wider">
        {title}
      </h3>
    </div>
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

  const sidebarVariants = {
    expanded: { width: '260px' },
    collapsed: { width: '80px' }
  };

  return (
    <motion.aside 
      className={cn(
        "h-screen fixed z-30 transition-all flex flex-col",
        "bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-md",
        "shadow-xl border-r border-white/10",
        collapsed ? "w-20" : "w-64"
      )}
      variants={sidebarVariants}
      initial={collapsed ? "collapsed" : "expanded"}
      animate={collapsed ? "collapsed" : "expanded"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className={cn(
        "flex items-center h-16 border-b border-white/10",
        collapsed ? "justify-center px-2" : "px-4 justify-between"
      )}>
        {!collapsed ? (
          <>
            <AnimatedLogo size="small" />
            <button 
              onClick={toggleCollapse} 
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 text-white/80" />
            </button>
          </>
        ) : (
          <button 
            onClick={toggleCollapse} 
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"
          >
            <AnimatedLogo size="small" showText={false} />
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <SidebarItem 
          icon={<ArrowLeft />} 
          label="Voltar para Home" 
          to="/" 
          isActive={location.pathname === "/"} 
          collapsed={collapsed} 
          className="mb-4 bg-gradient-to-r from-blue-600/70 to-indigo-600/70 hover:from-blue-600/80 hover:to-indigo-600/80"
        />
        
        <SidebarItem 
          icon={<LayoutDashboard />} 
          label="Dashboard" 
          to="/dashboard" 
          isActive={location.pathname === "/dashboard"}
          collapsed={collapsed} 
        />
        
        <SidebarSection title="Módulos Principais" collapsed={collapsed} />
        
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
        
        <SidebarSection title="Sistema" collapsed={collapsed} />
        
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
      
      {!collapsed && (
        <div className="border-t border-white/10 px-4 py-3 bg-white/5 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
              <span className="text-xs text-white/70">Sistema operacional</span>
            </div>
            <span className="text-xs text-white/50">v1.2.0</span>
          </div>
        </div>
      )}
    </motion.aside>
  );
};

export default Sidebar;
