
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MenuItemType } from './types';
import { ChevronDown } from 'lucide-react';

interface SidebarItemProps {
  item: MenuItemType;
  collapsed: boolean;
  isActive: boolean;
  isOpen: boolean;
  toggleSubmenu: () => void;
  showArrows?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  item, 
  collapsed, 
  isActive, 
  isOpen, 
  toggleSubmenu,
  showArrows = false 
}) => {
  const location = useLocation();
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  
  // Check if any submenu item is active
  const isSubmenuActive = hasSubmenu && item.submenu?.some(
    submenuItem => submenuItem.to === location.pathname
  );

  // Use either the active submenu item or the parent item itself
  const activeItem = isSubmenuActive ? 
    item.submenu?.find(submenuItem => submenuItem.to === location.pathname) : 
    isActive ? item : null;
  
  // Variants for animations
  const submenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2 }
    }
  };

  const Icon = item.icon;

  return (
    <div className="mb-1">
      {/* Main menu item */}
      {hasSubmenu ? (
        <button
          onClick={toggleSubmenu}
          className={cn(
            "flex items-center w-full px-3 py-2 rounded-md",
            "transition-all duration-150",
            (isActive || isSubmenuActive) 
              ? "bg-blue-700/50 text-white font-medium shadow-md"
              : "text-blue-100 hover:bg-blue-700/30",
            collapsed && "justify-center"
          )}
        >
          {item.icon && (
            <span className={cn(
              "text-blue-200",
              collapsed ? "text-lg" : "",
              (isActive || isSubmenuActive) ? "text-white" : ""
            )}>
              <Icon />
            </span>
          )}
          
          {!collapsed && (
            <>
              <span className="ml-3 flex-grow text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                {item.label}
              </span>
              
              {hasSubmenu && showArrows && (
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              )}
              
              {item.badge && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-500/80 text-white">
                  {item.badge}
                </span>
              )}
            </>
          )}
          
          {/* Show badges in collapsed mode */}
          {collapsed && item.badge && (
            <span className="absolute -right-1 top-0 px-1.5 py-0.5 text-xs font-medium rounded-full bg-blue-500/90 text-white">
              {item.badge}
            </span>
          )}
        </button>
      ) : (
        <Link
          to={item.to || "#"}
          className={cn(
            "flex items-center w-full px-3 py-2 rounded-md relative",
            "transition-all duration-150",
            isActive
              ? "bg-blue-700/50 text-white font-medium shadow-md"
              : "text-blue-100 hover:bg-blue-700/30",
            collapsed && "justify-center"
          )}
        >
          {item.icon && (
            <span className={cn(
              "text-blue-200", 
              collapsed ? "text-lg" : "",
              isActive ? "text-white" : ""
            )}>
              <Icon />
            </span>
          )}
          
          {!collapsed && (
            <>
              <span className="ml-3 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                {item.label}
              </span>
              
              {item.badge && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-500/80 text-white">
                  {item.badge}
                </span>
              )}
            </>
          )}
          
          {/* Show badges in collapsed mode */}
          {collapsed && item.badge && (
            <span className="absolute -right-1 top-0 px-1.5 py-0.5 text-xs font-medium rounded-full bg-blue-500/90 text-white">
              {item.badge}
            </span>
          )}
        </Link>
      )}

      {/* Submenu items with enhanced styling */}
      {hasSubmenu && (
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="submenu"
              variants={submenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                "overflow-hidden",
                collapsed 
                  ? "absolute left-full top-0 bg-gradient-to-b from-blue-900/95 via-blue-800/95 to-indigo-900/95 shadow-lg rounded-md border border-blue-700/30 min-w-[200px] mt-0 pl-2 pr-2 py-2 ml-2 backdrop-blur-md" 
                  : "pl-3 pr-1"
              )}
            >
              {item.submenu?.map((submenuItem, index) => (
                <Link
                  key={index}
                  to={submenuItem.to || "#"}
                  className={cn(
                    "flex items-center px-2 py-1.5 my-1 text-sm rounded-md group",
                    "transition-colors duration-150 relative",
                    !collapsed && "pl-4",
                    location.pathname === submenuItem.to
                      ? "bg-blue-600/40 text-white font-medium"
                      : "text-blue-100 hover:bg-blue-700/20"
                  )}
                >
                  {submenuItem.icon && (
                    <span className="text-blue-300 mr-2 group-hover:text-blue-100">
                      {React.createElement(submenuItem.icon, { className: "h-4 w-4" })}
                    </span>
                  )}
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                    {submenuItem.label}
                  </span>
                  
                  {submenuItem.badge && (
                    <span className="ml-2 px-1.5 py-0.5 text-xs font-medium rounded-full bg-blue-500/80 text-white">
                      {submenuItem.badge}
                    </span>
                  )}
                  
                  {/* Hover effect - subtle glow */}
                  <motion.span 
                    className="absolute inset-0 rounded-md bg-blue-400/0"
                    whileHover={{ backgroundColor: 'rgba(96, 165, 250, 0.05)' }}
                  />
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default SidebarItem;
