
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
      <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
        <div className={`transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'} shadow-lg`}>
          <Sidebar collapsed={sidebarCollapsed} toggleCollapse={toggleSidebar} />
        </div>
        
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
};

export default Layout;
