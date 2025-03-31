
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './sidebar/Sidebar';
import { ClientProvider } from '../../contexts/ClientContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { userRole } = useAuth();
  
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

  return (
    <ClientProvider initialRole={userRole || 'admin'}>
      {/* Background with subtle gradient and pattern */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/30 to-white z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-5" style={{ 
          backgroundImage: `radial-gradient(circle, rgba(59, 130, 246, 0.2) 1px, transparent 1px)`, 
          backgroundSize: '30px 30px' 
        }}></div>
      </div>
      
      <div className="flex h-screen overflow-hidden relative z-10">
        {/* Sidebar */}
        <Sidebar collapsed={sidebarCollapsed} toggleCollapse={toggleSidebar} />
        
        {/* Main content */}
        <motion.div 
          className="flex flex-col flex-grow overflow-hidden w-full"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            marginLeft: sidebarCollapsed ? "80px" : "288px"
          }}
          transition={{ duration: 0.4 }}
        >
          <Header toggleSidebar={toggleSidebar} />
          
          <AnimatePresence mode="wait">
            {mounted && (
              <motion.main 
                className="flex-grow overflow-auto p-6 backdrop-blur-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ 
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1.0]
                }}
              >
                <motion.div 
                  className="container mx-auto"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  {children}
                </motion.div>
              </motion.main>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </ClientProvider>
  );
};

export default Layout;
