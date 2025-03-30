
import React, { useState, useEffect } from 'react';
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
  ChevronLeft,
  ShieldCheck,
  Lightbulb,
  LayoutDashboard,
  Check,
  ArrowLeft,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedLogo from '../ui/AnimatedLogo';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  collapsed: boolean;
  toggleCollapse: () => void;
}

interface MenuItemType {
  icon: React.ReactNode;
  label: string;
  to: string;
  badge?: number | string;
  submenu?: {
    label: string;
    to: string;
    badge?: number | string;
  }[];
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleCollapse }) => {
  const location = useLocation();
  const { userRole } = useAuth();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [openMenus, setOpenMenus] = useState<{[key: string]: boolean}>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Update active item based on current location
  useEffect(() => {
    const path = location.pathname;
    const currentItem = sidebarItems.find(item => 
      item.to === path || 
      item.submenu?.some(subitem => subitem.to === path)
    );
    
    if (currentItem) {
      setActiveItem(currentItem.label);
      // Auto-expand menu if a submenu item is active
      if (currentItem.submenu && currentItem.submenu.some(subitem => subitem.to === path)) {
        setOpenMenus(prev => ({ ...prev, [currentItem.label]: true }));
      }
    }
  }, [location.pathname]);
  
  // Handle submenu toggle
  const toggleSubmenu = (label: string) => {
    if (collapsed) {
      setOpenMenus({});
      return;
    }
    
    setOpenMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  // Sidebar items configuration
  const sidebarItems: MenuItemType[] = [
    { 
      icon: <ArrowLeft />, 
      label: "Voltar para Home", 
      to: "/" 
    },
    { 
      icon: <LayoutDashboard />, 
      label: "Dashboard", 
      to: "/dashboard" 
    },
    { 
      icon: <Users />, 
      label: "Gestão de Clientes", 
      to: "/clients-management",
      badge: "2" 
    },
    { 
      icon: <Calculator />, 
      label: "Cálculos e Recuperação", 
      to: "#",
      submenu: [
        { label: "Cálculos IRRF", to: "/irrf-calculations" },
        { label: "Recuperação IRRF/PJ", to: "/irrf-recovery" },
        { label: "Identificação de Créditos", to: "/credits-identification" },
      ]
    },
    { 
      icon: <ShieldCheck />, 
      label: "Auditoria Tributária", 
      to: "/tax-audit" 
    },
    { 
      icon: <FileText />, 
      label: "Relatórios", 
      to: "#",
      badge: "3",
      submenu: [
        { label: "Relatórios Detalhados", to: "/detailed-reports" },
        { label: "Comprovantes de Retenção", to: "/retention-receipts", badge: "3" },
        { label: "Relatórios Fiscais", to: "/fiscal-reports" },
        { label: "Dashboard Interativo", to: "/interactive-dashboard" },
      ]
    },
    { 
      icon: <BarChart3 />, 
      label: "Gestão", 
      to: "#",
      badge: "5",
      submenu: [
        { label: "Propostas Comerciais", to: "/commercial-proposals", badge: "5" },
        { label: "Compensação Tributária", to: "/tax-compensation" },
        { label: "Gestão de Auditorias", to: "/audit-management" },
      ]
    },
    { 
      icon: <Globe />, 
      label: "Sistema", 
      to: "#",
      submenu: [
        { label: "Segurança & Auditoria", to: "/security-audit" },
        { label: "Operacional", to: "/operational" },
        { label: "Site e Conteúdo", to: "/site-editor" },
        { label: "Importação", to: "/import" },
      ]
    },
    { 
      icon: <LifeBuoy />, 
      label: "Suporte", 
      to: "/support" 
    },
    { 
      icon: <Cog />, 
      label: "Configurações", 
      to: "/settings" 
    }
  ];
  
  // Group items by category
  const mainItems = sidebarItems.slice(0, 2);
  const moduleItems = sidebarItems.slice(2, 7);
  const systemItems = sidebarItems.slice(7);

  // Mobile toggle
  const handleMobileToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button 
          className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white shadow-lg"
          onClick={handleMobileToggle}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main sidebar */}
      <motion.aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full",
          "transition-all duration-300 ease-in-out",
          collapsed ? "w-20" : "w-64",
          !isMobileMenuOpen && "hidden md:block"
        )}
        initial={false}
        animate={{ 
          width: collapsed ? "80px" : "256px",
          x: isMobileMenuOpen ? 0 : (collapsed ? 0 : 0)
        }}
        transition={{ duration: 0.3 }}
      >
        <div className={cn(
          "flex flex-col h-full overflow-hidden",
          "bg-gradient-to-b from-indigo-900 to-indigo-950",
          "text-white shadow-xl"
        )}>
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-4 py-5 border-b border-indigo-800">
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center space-x-2"
                >
                  <AnimatedLogo size="small" />
                  <span className="font-semibold truncate">Admin Panel</span>
                </motion.div>
              )}
            </AnimatePresence>
            
            <button 
              onClick={toggleCollapse}
              className={cn(
                "w-8 h-8 flex items-center justify-center",
                "rounded-full hover:bg-indigo-800 transition-colors",
                collapsed && "mx-auto"
              )}
            >
              {collapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </button>
          </div>
          
          {/* Sidebar content */}
          <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-800">
            {/* Main navigation */}
            <div className="p-3">
              <AnimatePresence>
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mb-2 px-3"
                  >
                    <span className="text-xs text-indigo-400 uppercase font-semibold">
                      Navegação Principal
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {mainItems.map((item) => (
                <SidebarItem 
                  key={item.label}
                  item={item}
                  collapsed={collapsed}
                  isActive={location.pathname === item.to}
                  isOpen={!!openMenus[item.label]}
                  toggleSubmenu={() => toggleSubmenu(item.label)}
                />
              ))}
            </div>
            
            {/* Module items */}
            <div className="p-3 border-t border-indigo-800/50">
              <AnimatePresence>
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mb-2 px-3"
                  >
                    <span className="text-xs text-indigo-400 uppercase font-semibold">
                      Módulos Principais
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {moduleItems.map((item) => (
                <SidebarItem 
                  key={item.label}
                  item={item}
                  collapsed={collapsed}
                  isActive={location.pathname === item.to || activeItem === item.label}
                  isOpen={!!openMenus[item.label]}
                  toggleSubmenu={() => toggleSubmenu(item.label)}
                />
              ))}
            </div>
            
            {/* System items */}
            <div className="p-3 border-t border-indigo-800/50">
              <AnimatePresence>
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mb-2 px-3"
                  >
                    <span className="text-xs text-indigo-400 uppercase font-semibold">
                      Sistema
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {systemItems.map((item) => (
                <SidebarItem 
                  key={item.label}
                  item={item}
                  collapsed={collapsed}
                  isActive={location.pathname === item.to || activeItem === item.label}
                  isOpen={!!openMenus[item.label]}
                  toggleSubmenu={() => toggleSubmenu(item.label)}
                />
              ))}
            </div>
          </div>
          
          {/* Sidebar footer */}
          {!collapsed && (
            <div className="p-4 border-t border-indigo-800 bg-indigo-900/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse mr-2"></div>
                  <span className="text-xs text-indigo-300">Sistema online</span>
                </div>
                <span className="text-xs text-indigo-400">v1.2.0</span>
              </div>
              <div className="text-xs text-indigo-400 mt-2 text-center">
                <span>{userRole === 'admin' ? 'Administrador' : 'Usuário'}</span>
              </div>
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
};

// Sidebar Item Component
interface SidebarItemProps {
  item: MenuItemType;
  collapsed: boolean;
  isActive: boolean;
  isOpen: boolean;
  toggleSubmenu: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  item, 
  collapsed, 
  isActive, 
  isOpen,
  toggleSubmenu 
}) => {
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  const location = useLocation();
  
  // Check if any submenu item is active
  const isSubmenuActive = hasSubmenu && item.submenu?.some(
    subitem => subitem.to === location.pathname
  );
  
  // Combine active states
  const isItemActive = isActive || isSubmenuActive;
  
  if (collapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <div className="mb-1">
            {hasSubmenu ? (
              <button
                onClick={toggleSubmenu}
                className={cn(
                  "w-full p-2 flex justify-center rounded-lg transition-colors",
                  isItemActive 
                    ? "bg-indigo-700 text-white" 
                    : "text-indigo-200 hover:bg-indigo-800/60"
                )}
              >
                <div className="relative">
                  {React.cloneElement(item.icon as React.ReactElement, { 
                    size: 20,
                    className: cn(isItemActive ? "text-white" : "text-indigo-200") 
                  })}
                  
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
              </button>
            ) : (
              <Link
                to={item.to}
                className={cn(
                  "w-full p-2 flex justify-center rounded-lg transition-colors",
                  isItemActive 
                    ? "bg-indigo-700 text-white" 
                    : "text-indigo-200 hover:bg-indigo-800/60"
                )}
              >
                <div className="relative">
                  {React.cloneElement(item.icon as React.ReactElement, { 
                    size: 20,
                    className: cn(isItemActive ? "text-white" : "text-indigo-200") 
                  })}
                  
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-indigo-900 text-white border-indigo-700">
          {item.label}
        </TooltipContent>
      </Tooltip>
    );
  }
  
  return (
    <div className="mb-1">
      {hasSubmenu ? (
        <div>
          <button
            onClick={toggleSubmenu}
            className={cn(
              "w-full p-2 flex items-center justify-between rounded-lg transition-colors",
              isItemActive 
                ? "bg-indigo-700/80 text-white" 
                : "text-indigo-200 hover:bg-indigo-800/40"
            )}
          >
            <div className="flex items-center space-x-3">
              {React.cloneElement(item.icon as React.ReactElement, { 
                size: 18,
                className: cn(isItemActive ? "text-white" : "text-indigo-300") 
              })}
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {item.badge && (
                <span className="bg-red-500 text-white text-xs rounded-md px-1.5 py-0.5 min-w-[20px] text-center">
                  {item.badge}
                </span>
              )}
              
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-4 w-4 text-indigo-400" />
              </motion.div>
            </div>
          </button>
          
          <AnimatePresence initial={false}>
            {isOpen && hasSubmenu && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="ml-4 pl-4 border-l border-indigo-700/50 mt-1"
              >
                {item.submenu?.map((subitem) => (
                  <Link
                    key={subitem.label}
                    to={subitem.to}
                    className={cn(
                      "flex items-center justify-between py-2 px-3 my-1 rounded-md text-sm transition-colors",
                      location.pathname === subitem.to 
                        ? "bg-indigo-800/70 text-white" 
                        : "text-indigo-300 hover:bg-indigo-800/40 hover:text-white"
                    )}
                  >
                    <span>{subitem.label}</span>
                    {subitem.badge && (
                      <span className="bg-red-500 text-white text-xs rounded-md px-1.5 py-0.5 min-w-[20px] text-center">
                        {subitem.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <Link
          to={item.to}
          className={cn(
            "w-full p-2 flex items-center justify-between rounded-lg transition-colors",
            isItemActive 
              ? "bg-indigo-700/80 text-white" 
              : "text-indigo-200 hover:bg-indigo-800/40"
          )}
        >
          <div className="flex items-center space-x-3">
            {React.cloneElement(item.icon as React.ReactElement, { 
              size: 18,
              className: cn(isItemActive ? "text-white" : "text-indigo-300") 
            })}
            <span className="text-sm font-medium">{item.label}</span>
          </div>
          
          {item.badge && (
            <span className="bg-red-500 text-white text-xs rounded-md px-1.5 py-0.5 min-w-[20px] text-center">
              {item.badge}
            </span>
          )}
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
