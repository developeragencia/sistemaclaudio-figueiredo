
import React from 'react';
import { cn } from '@/lib/utils';

interface SidebarSectionProps {
  title?: string;
  collapsed: boolean;
  children: React.ReactNode;
  className?: string;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ 
  title, 
  collapsed, 
  children,
  className
}) => {
  return (
    <>
      {title && (
        <div className={cn("pt-4 pb-2", !collapsed && "px-3")}>
          {!collapsed && <p className="text-xs text-blue-500 font-medium uppercase">{title}</p>}
        </div>
      )}
      <div className={cn("space-y-1", className)}>
        {children}
      </div>
    </>
  );
};

export default SidebarSection;
