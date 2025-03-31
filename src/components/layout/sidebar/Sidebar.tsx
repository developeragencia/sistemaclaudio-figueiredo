
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SidebarHeader from './components/SidebarHeader';
import SidebarContent from './components/SidebarContent';
import SidebarUserProfile from './components/SidebarUserProfile';
import SidebarToggleButton from './components/SidebarToggleButton';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  collapsed: boolean;
  toggleCollapse: () => void;
  isMobile?: boolean;
  isMobileMenuOpen?: boolean;
  closeMobileMenu?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  collapsed, 
  toggleCollapse, 
  isMobile = false,
  isMobileMenuOpen = false,
  closeMobileMenu = () => {},
}) => {
  const location = useLocation();
  const { userRole, currentUser } = useAuth();
  
  // State for sidebar menu management
  const [openMenus, setOpenMenus] = useState<{[key: string]: boolean}>({});
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  // Toggle submenu open/close state
  const toggleSubmenu = (label: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  // Handle hover effects for menu items
  const handleMenuMouseEnter = (label: string) => {
    setHoveredItem(label);
  };
  
  const handleMenuMouseLeave = () => {
    setHoveredItem(null);
  };
  
  // Don't render the sidebar on the login or index page
  if (location.pathname === '/login' || location.pathname === '/') {
    return null;
  }

  // Mobile sidebar
  if (isMobile) {
    return (
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />
            
            {/* Mobile Sidebar */}
            <motion.div
              className="fixed top-0 left-0 h-screen w-64 z-50 bg-white shadow-lg"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex flex-col h-full">
                <SidebarHeader collapsed={false} />
                <div className="flex-1 overflow-y-auto scrollbar-none">
                  <SidebarContent 
                    collapsed={false} 
                    openMenus={openMenus}
                    toggleSubmenu={toggleSubmenu}
                    location={location}
                    title="Navigation"
                  />
                </div>
                <div className="mt-auto">
                  <SidebarUserProfile 
                    collapsed={false} 
                    userRole={userRole}
                    currentUser={currentUser}
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Desktop sidebar
  return (
    <motion.div
      className="h-screen z-30"
      initial={{ width: collapsed ? 80 : 288 }}
      animate={{ width: collapsed ? 80 : 288 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
    >
      <div className={`h-full flex flex-col ${collapsed ? 'items-center' : ''} bg-sidebar bg-gradient-sidebar border-r border-sidebar-border overflow-hidden`}>
        <SidebarHeader collapsed={collapsed} />
        
        <div className="flex-1 w-full overflow-y-auto scrollbar-none">
          <SidebarContent 
            collapsed={collapsed} 
            openMenus={openMenus}
            toggleSubmenu={toggleSubmenu}
            location={location}
            onMenuMouseEnter={handleMenuMouseEnter}
            onMenuMouseLeave={handleMenuMouseLeave}
            hoveredItem={hoveredItem}
            title="Navigation"
          />
        </div>
        
        <div className="mt-auto w-full">
          <SidebarUserProfile 
            collapsed={collapsed} 
            userRole={userRole}
            currentUser={currentUser}
          />
          
          <div className={`py-4 px-2 ${collapsed ? 'flex justify-center' : ''}`}>
            <SidebarToggleButton
              collapsed={collapsed}
              toggleCollapse={toggleCollapse}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
