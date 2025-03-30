
import React, { useState, useEffect } from 'react';
import Header from './Header';
import { ClientProvider } from '../../contexts/ClientContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const { userRole } = useAuth();
  
  // Handle animation mounting
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Add toggleSidebar function for Header component
  const toggleSidebar = () => {
    // This function is required by Header but since we removed the sidebar,
    // we'll keep it as an empty function for now
    console.log('Sidebar toggle requested, but sidebar has been removed');
  };

  return (
    <ClientProvider initialRole={userRole || 'admin'}>
      <div className="flex h-screen overflow-hidden bg-gradient-to-br from-white via-sky-50/10 to-blue-50/20">
        {/* Main content - full width without sidebar */}
        <motion.div 
          className="flex flex-col flex-grow overflow-hidden w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Header toggleSidebar={toggleSidebar} />
          
          <AnimatePresence mode="wait">
            {mounted && (
              <motion.main 
                className="flex-grow overflow-auto p-6 bg-white/50 backdrop-blur-sm"
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
