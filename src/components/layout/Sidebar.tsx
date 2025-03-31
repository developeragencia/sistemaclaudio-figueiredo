
import React from 'react';
import Sidebar from './sidebar/Sidebar';

interface SidebarWrapperProps {
  collapsed: boolean;
  toggleCollapse: () => void;
  isMobile?: boolean;
  isMobileMenuOpen?: boolean;
  closeMobileMenu?: () => void;
}

// This component serves as the entry point to maintain the same interface
const SidebarWrapper: React.FC<SidebarWrapperProps> = ({ 
  collapsed, 
  toggleCollapse,
  isMobile,
  isMobileMenuOpen,
  closeMobileMenu
}) => {
  return (
    <Sidebar 
      collapsed={collapsed} 
      toggleCollapse={toggleCollapse} 
      isMobile={isMobile}
      isMobileMenuOpen={isMobileMenuOpen}
      closeMobileMenu={closeMobileMenu}
    />
  );
};

export default SidebarWrapper;
