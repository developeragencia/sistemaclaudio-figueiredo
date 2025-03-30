
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { ClientProvider } from '../../contexts/ClientContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { userRole } = useAuth();
  
  // Handle animation mounting
  useEffect(() => {
    setMounted(true);
    
    // Check for saved sidebar state in localStorage
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState) {
      setSidebarCollapsed(savedState === 'true');
    }
    
    return () => setMounted(false);
  }, []);
  
  const toggleSidebar = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    // Save preference to localStorage
    localStorage.setItem('sidebarCollapsed', String(newState));
  };

  return (
    <ClientProvider initialRole={userRole || 'admin'}>
      <div className="flex h-screen overflow-hidden bg-gradient-to-br from-white to-blue-50/30">
        {/* Fixed Sidebar */}
        <div className="relative h-screen">
          <AnimatePresence mode="wait">
            <motion.div 
              className={`h-full transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'w-20' : 'w-72'}`}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Sidebar collapsed={sidebarCollapsed} toggleCollapse={toggleSidebar} />
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Main content */}
        <motion.div 
          className="flex flex-col flex-grow overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Header toggleSidebar={toggleSidebar} />
          
          <AnimatePresence mode="wait">
            {mounted && (
              <motion.main 
                className="flex-grow overflow-auto p-6 bg-white/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ 
                  duration: 0.3,
                  ease: [0.25, 0.1, 0.25, 1.0]
                }}
              >
                <div className="container mx-auto">
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
