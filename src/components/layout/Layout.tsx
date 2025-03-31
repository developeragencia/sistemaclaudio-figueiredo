
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './sidebar/Sidebar';
import { ClientProvider } from '../../contexts/ClientContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import SidebarMobileToggle from './sidebar/components/SidebarMobileToggle';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { userRole } = useAuth();
  const location = useLocation();
  
  // Handle animation mounting
  useEffect(() => {
    setMounted(true);
    
    // Check for saved sidebar state in localStorage
    const savedState = localStorage.getItem('sidebar-collapsed');
    if (savedState) {
      setSidebarCollapsed(savedState === 'true');
    }
    
    return () => setMounted(false);
  }, []);

  // Toggle sidebar and save state
  const toggleSidebar = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    localStorage.setItem('sidebar-collapsed', String(newState));
  };

  // Mobile menu toggle
  const handleMobileToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <ClientProvider initialRole={userRole || 'admin'}>
      {/* Background with subtle gradient and pattern */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-5" style={{ 
          backgroundImage: `radial-gradient(circle, rgba(59, 130, 246, 0.2) 1px, transparent 1px)`, 
          backgroundSize: '30px 30px' 
        }}></div>
      </div>
      
      {/* Mobile menu toggle button */}
      {isMobile && (
        <SidebarMobileToggle 
          isMobileMenuOpen={isMobileMenuOpen} 
          handleMobileToggle={handleMobileToggle} 
        />
      )}
      
      <div className="flex h-screen overflow-hidden relative z-10">
        {/* Sidebar - show based on mobile state */}
        <Sidebar 
          collapsed={sidebarCollapsed} 
          toggleCollapse={toggleSidebar} 
          isMobile={isMobile}
          isMobileMenuOpen={isMobileMenuOpen}
          closeMobileMenu={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Main content */}
        <motion.div 
          className="flex flex-col flex-grow overflow-hidden w-full"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            marginLeft: isMobile ? "0px" : (sidebarCollapsed ? "80px" : "288px")
          }}
          transition={{ duration: 0.3 }}
        >
          <Header toggleSidebar={toggleSidebar} />
          
          <AnimatePresence mode="wait">
            {mounted && (
              <motion.main 
                className="flex-grow overflow-auto p-4 sm:p-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="max-w-7xl mx-auto">
                  {children}
                </div>
              </motion.main>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </ClientProvider>
  );
};

export default Layout;
