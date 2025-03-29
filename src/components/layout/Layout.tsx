
import React, { useState, memo } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { ClientProvider } from '../../contexts/ClientContext';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = memo(({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Check if we are on the admin page
  const isAdminPage = location.pathname === '/admin';
  
  // Optimize the background style to avoid recomputation
  const bgStyle = isAdminPage 
    ? 'bg-slate-50' 
    : 'bg-gradient-to-br from-blue-50 to-white';

  return (
    <ClientProvider>
      <div className={`flex h-screen ${bgStyle} overflow-hidden`}>
        <Sidebar collapsed={sidebarCollapsed} toggleCollapse={toggleSidebar} />
        
        <div className="flex flex-col flex-grow overflow-hidden">
          <Header toggleSidebar={toggleSidebar} />
          
          <main className="flex-grow overflow-auto p-6 animate-fade-in">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ClientProvider>
  );
});

Layout.displayName = 'Layout';

export default Layout;
