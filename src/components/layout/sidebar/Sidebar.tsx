
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import AnimatedLogo from '@/components/ui/AnimatedLogo';
import SidebarItem from './SidebarItem';
import { getGroupedSidebarItems } from './sidebarMenuItems';
import { SidebarProps } from './types';

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleCollapse }) => {
  const location = useLocation();
  const { userRole } = useAuth();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [openMenus, setOpenMenus] = useState<{[key: string]: boolean}>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Get grouped sidebar items
  const { mainItems, moduleItems, systemItems } = getGroupedSidebarItems();
  
  // Update active item based on current location
  useEffect(() => {
    const path = location.pathname;
    const allItems = [...mainItems, ...moduleItems, ...systemItems];
    
    const currentItem = allItems.find(item => 
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
  }, [location.pathname, mainItems, moduleItems, systemItems]);
  
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
            <SidebarHeader collapsed={collapsed} />
            
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
            <SidebarContent 
              items={mainItems} 
              title="Navegação Principal" 
              collapsed={collapsed}
              openMenus={openMenus}
              toggleSubmenu={toggleSubmenu}
              location={location}
            />
            
            <SidebarContent 
              items={moduleItems} 
              title="Módulos Principais" 
              collapsed={collapsed}
              openMenus={openMenus}
              toggleSubmenu={toggleSubmenu}
              location={location}
              hasBorder={true}
            />
            
            <SidebarContent 
              items={systemItems} 
              title="Sistema" 
              collapsed={collapsed}
              openMenus={openMenus}
              toggleSubmenu={toggleSubmenu}
              location={location}
              hasBorder={true}
            />
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

// Helper components
interface SidebarHeaderProps {
  collapsed: boolean;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed }) => {
  return (
    <motion.div
      initial={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : "auto" }}
      animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : "auto" }}
      exit={{ opacity: 0, width: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex items-center space-x-2",
        collapsed && "hidden"
      )}
    >
      <AnimatedLogo size="small" />
      <span className="font-semibold truncate">Admin Panel</span>
    </motion.div>
  );
};

interface SidebarContentProps {
  items: any[];
  title: string;
  collapsed: boolean;
  openMenus: {[key: string]: boolean};
  toggleSubmenu: (label: string) => void;
  location: any;
  hasBorder?: boolean;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ 
  items, 
  title, 
  collapsed, 
  openMenus, 
  toggleSubmenu, 
  location,
  hasBorder = false
}) => {
  return (
    <div className={cn("p-3", hasBorder && "border-t border-indigo-800/50")}>
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mb-2 px-3"
        >
          <span className="text-xs text-indigo-400 uppercase font-semibold">
            {title}
          </span>
        </motion.div>
      )}
      
      {items.map((item) => (
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
  );
};

export default Sidebar;
