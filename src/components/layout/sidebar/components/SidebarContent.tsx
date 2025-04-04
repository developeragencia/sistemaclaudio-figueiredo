
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import SidebarItem from '../SidebarItem';
import { MenuItemType } from '../types';
import { useLocation } from 'react-router-dom';
import { Home, Settings, PieChart, Users, FileText } from 'lucide-react';

interface SidebarContentProps {
  collapsed: boolean;
  items?: MenuItemType[];
  title?: string;
  openMenus?: {[key: string]: boolean};
  toggleSubmenu?: (label: string) => void;
  location?: any;
  hasBorder?: boolean;
  onMenuMouseEnter?: (label: string) => void;
  onMenuMouseLeave?: (label: string) => void;
  hoveredItem?: string | null;
}

// Default menu items if none provided
const defaultItems: MenuItemType[] = [
  {
    icon: Home,
    label: 'Dashboard',
    to: '/dashboard',
  },
  {
    icon: PieChart,
    label: 'Tax Credits',
    to: '/tax-credits',
  },
  {
    icon: Users,
    label: 'Clients',
    to: '/clients',
  },
  {
    icon: FileText,
    label: 'Reports',
    to: '/reports',
  },
  {
    icon: Settings,
    label: 'Settings',
    to: '/settings',
  },
];

const SidebarContent: React.FC<SidebarContentProps> = ({ 
  collapsed, 
  items = defaultItems,
  title = "Navigation",
  openMenus = {},
  toggleSubmenu = () => {},
  hasBorder = false,
  onMenuMouseEnter,
  onMenuMouseLeave,
  hoveredItem
}) => {
  // Use the React Router location
  const location = useLocation();
  
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      }
    }
  };

  return (
    <div className={cn("p-3", hasBorder && "border-t border-blue-700/30 pt-5")}>
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mb-3 px-3"
        >
          <span className="text-xs uppercase font-semibold tracking-wider text-blue-300 opacity-80">
            {title}
          </span>
        </motion.div>
      )}
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {items.map((item) => (
          <motion.div
            key={item.label}
            variants={childVariants}
            onMouseEnter={() => onMenuMouseEnter && onMenuMouseEnter(item.label)}
            onMouseLeave={() => onMenuMouseLeave && onMenuMouseLeave(item.label)}
          >
            <SidebarItem 
              item={item}
              collapsed={collapsed}
              isActive={location.pathname === item.to}
              isOpen={!!openMenus[item.label] || hoveredItem === item.label}
              toggleSubmenu={() => toggleSubmenu(item.label)}
              showArrows={false} 
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SidebarContent;
