
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, ChevronLeft, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import AnimatedLogo from '@/components/ui/AnimatedLogo';
import SidebarItem from './SidebarItem';
import { getGroupedSidebarItems } from './sidebarMenuItems';
import { SidebarProps } from './types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleCollapse }) => {
  const location = useLocation();
  const { userRole, currentUser } = useAuth();
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
        <motion.button 
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-blue-600 shadow-lg border border-blue-100"
          onClick={handleMobileToggle}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>

      {/* Sidebar overlay for mobile */}
      {isMobileMenuOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main sidebar */}
      <motion.aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full",
          "transition-all duration-300 ease-in-out",
          collapsed ? "w-20" : "w-72",
          !isMobileMenuOpen && "hidden md:block"
        )}
        initial={false}
        animate={{ 
          width: collapsed ? "80px" : "288px",
          x: isMobileMenuOpen ? 0 : (collapsed ? 0 : 0)
        }}
        transition={{ duration: 0.3 }}
      >
        <div className={cn(
          "flex flex-col h-full overflow-hidden",
          "bg-white shadow-xl rounded-r-xl",
          "text-blue-900 border-r border-blue-100"
        )}>
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-4 py-5 border-b border-blue-100">
            <SidebarHeader collapsed={collapsed} />
            
            <motion.button 
              onClick={toggleCollapse}
              className={cn(
                "w-8 h-8 flex items-center justify-center",
                "rounded-full hover:bg-blue-50 text-blue-500 transition-colors",
                collapsed && "mx-auto"
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {collapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </motion.button>
          </div>
          
          {/* Sidebar content */}
          <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
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
          
          {/* Sidebar user profile */}
          <div className="p-4 border-t border-blue-100 bg-blue-50/50">
            <div className={cn(
              "flex items-center",
              collapsed ? "justify-center" : "justify-between"
            )}>
              {!collapsed ? (
                <>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8 ring-2 ring-blue-500/30">
                      <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                      <AvatarFallback className="bg-blue-600 text-white">
                        {userRole?.substring(0, 1).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium leading-none text-blue-900">{currentUser?.name || 'Admin User'}</p>
                      <p className="text-xs text-blue-500">{userRole === 'admin' ? 'Administrador' : 'Usuário'}</p>
                    </div>
                  </div>
                  
                  <motion.button 
                    className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-blue-100 text-blue-500"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <LogOut size={16} />
                  </motion.button>
                </>
              ) : (
                <Avatar className="h-10 w-10 ring-2 ring-blue-500/30">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                  <AvatarFallback className="bg-blue-600 text-white">
                    {userRole?.substring(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
            
            {!collapsed && (
              <div className="mt-3 pt-3 border-t border-blue-100/50 text-xs text-center text-blue-400">
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span>Sistema v1.2.0</span>
                </div>
              </div>
            )}
          </div>
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
      <div className="space-y-0.5">
        <span className="font-semibold text-lg tracking-tight text-blue-900">TaxSystem</span>
        <p className="text-xs text-blue-500">Admin Dashboard</p>
      </div>
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
    <div className={cn("p-3", hasBorder && "border-t border-blue-100/70 pt-5")}>
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mb-3 px-3"
        >
          <span className="text-xs uppercase font-semibold tracking-wider text-blue-500">
            {title}
          </span>
        </motion.div>
      )}
      
      {items.map((item) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <SidebarItem 
            item={item}
            collapsed={collapsed}
            isActive={location.pathname === item.to}
            isOpen={!!openMenus[item.label]}
            toggleSubmenu={() => toggleSubmenu(item.label)}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default Sidebar;
