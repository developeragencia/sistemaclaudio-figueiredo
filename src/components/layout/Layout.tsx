
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
    return () => setMounted(false);
  }, []);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <ClientProvider initialRole={userRole || 'admin'}>
      <div className="flex h-screen bg-gradient-to-br from-sky-50 to-white overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div 
            className={`transition-all duration-300 relative ${sidebarCollapsed ? 'w-16' : 'w-64'}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Sidebar collapsed={sidebarCollapsed} toggleCollapse={toggleSidebar} />
          </motion.div>
        </AnimatePresence>
        
        <div className="flex flex-col flex-grow overflow-hidden">
          <Header toggleSidebar={toggleSidebar} />
          
          <AnimatePresence mode="wait">
            {mounted && (
              <motion.main 
                className="flex-grow overflow-auto p-6 bg-background/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1.0]
                }}
              >
                <div className="container mx-auto">
                  {children}
                </div>
              </motion.main>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ClientProvider>
  );
};

export default Layout;
