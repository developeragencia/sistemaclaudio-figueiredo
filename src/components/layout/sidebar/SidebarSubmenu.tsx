
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SidebarSubmenuProps {
  items: {
    label: string;
    to: string;
  }[];
  isOpen: boolean;
  collapsed: boolean;
}

const SidebarSubmenu: React.FC<SidebarSubmenuProps> = ({ items, isOpen, collapsed }) => {
  const location = useLocation();
  
  if (!isOpen || collapsed) return null;
  
  return (
    <div className="ml-8 mt-1 space-y-1 border-l border-blue-100 pl-3">
      {items.map((item, index) => (
        <Link
          key={index}
          to={item.to}
          className={cn(
            "block py-1.5 text-sm text-lawyer-600 transition-colors hover:text-blue-700",
            location.pathname === item.to && "font-medium text-blue-700"
          )}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default SidebarSubmenu;
