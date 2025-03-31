
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SidebarHeader from './components/SidebarHeader';
import SidebarContent from './components/SidebarContent';
import SidebarUserProfile from './components/SidebarUserProfile';
import SidebarToggleButton from './components/SidebarToggleButton';
import { useLocation } from 'react-router-dom';

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
                  <SidebarContent collapsed={false} />
                </div>
                <div className="mt-auto">
                  <SidebarUserProfile collapsed={false} />
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
          <SidebarContent collapsed={collapsed} />
        </div>
        
        <div className="mt-auto w-full">
          <SidebarUserProfile collapsed={collapsed} />
          
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
