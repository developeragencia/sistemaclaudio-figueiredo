
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { ClientProvider } from '../../contexts/ClientContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <ClientProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar collapsed={sidebarCollapsed} toggleCollapse={toggleSidebar} />
        
        <div className="flex flex-col flex-grow overflow-hidden">
          <Header toggleSidebar={toggleSidebar} />
          
          <main className="flex-grow overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </ClientProvider>
  );
};

export default Layout;
