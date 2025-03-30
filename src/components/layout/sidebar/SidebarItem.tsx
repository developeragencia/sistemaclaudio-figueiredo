
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { SidebarItemProps } from './types';

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  item, 
  collapsed, 
  isActive, 
  isOpen,
  toggleSubmenu 
}) => {
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  const location = useLocation();
  
  // Check if any submenu item is active
  const isSubmenuActive = hasSubmenu && item.submenu?.some(
    subitem => subitem.to === location.pathname
  );
  
  // Combine active states
  const isItemActive = isActive || isSubmenuActive;
  
  if (collapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <div className="mb-1">
            {hasSubmenu ? (
              <button
                onClick={toggleSubmenu}
                className={cn(
                  "w-full p-2 flex justify-center rounded-lg transition-colors",
                  isItemActive 
                    ? "bg-indigo-700 text-white" 
                    : "text-indigo-200 hover:bg-indigo-800/60"
                )}
              >
                <div className="relative">
                  {React.cloneElement(item.icon as React.ReactElement, { 
                    size: 20,
                    className: cn(isItemActive ? "text-white" : "text-indigo-200") 
                  })}
                  
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
              </button>
            ) : (
              <Link
                to={item.to}
                className={cn(
                  "w-full p-2 flex justify-center rounded-lg transition-colors",
                  isItemActive 
                    ? "bg-indigo-700 text-white" 
                    : "text-indigo-200 hover:bg-indigo-800/60"
                )}
              >
                <div className="relative">
                  {React.cloneElement(item.icon as React.ReactElement, { 
                    size: 20,
                    className: cn(isItemActive ? "text-white" : "text-indigo-200") 
                  })}
                  
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-indigo-900 text-white border-indigo-700">
          {item.label}
        </TooltipContent>
      </Tooltip>
    );
  }
  
  return (
    <div className="mb-1">
      {hasSubmenu ? (
        <div>
          <button
            onClick={toggleSubmenu}
            className={cn(
              "w-full p-2 flex items-center justify-between rounded-lg transition-colors",
              isItemActive 
                ? "bg-indigo-700/80 text-white" 
                : "text-indigo-200 hover:bg-indigo-800/40"
            )}
          >
            <div className="flex items-center space-x-3">
              {React.cloneElement(item.icon as React.ReactElement, { 
                size: 18,
                className: cn(isItemActive ? "text-white" : "text-indigo-300") 
              })}
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {item.badge && (
                <span className="bg-red-500 text-white text-xs rounded-md px-1.5 py-0.5 min-w-[20px] text-center">
                  {item.badge}
                </span>
              )}
              
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-4 w-4 text-indigo-400" />
              </motion.div>
            </div>
          </button>
          
          <AnimatePresence initial={false}>
            {isOpen && hasSubmenu && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="ml-4 pl-4 border-l border-indigo-700/50 mt-1"
              >
                {item.submenu?.map((subitem) => (
                  <Link
                    key={subitem.label}
                    to={subitem.to}
                    className={cn(
                      "flex items-center justify-between py-2 px-3 my-1 rounded-md text-sm transition-colors",
                      location.pathname === subitem.to 
                        ? "bg-indigo-800/70 text-white" 
                        : "text-indigo-300 hover:bg-indigo-800/40 hover:text-white"
                    )}
                  >
                    <span>{subitem.label}</span>
                    {subitem.badge && (
                      <span className="bg-red-500 text-white text-xs rounded-md px-1.5 py-0.5 min-w-[20px] text-center">
                        {subitem.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <Link
          to={item.to}
          className={cn(
            "w-full p-2 flex items-center justify-between rounded-lg transition-colors",
            isItemActive 
              ? "bg-indigo-700/80 text-white" 
              : "text-indigo-200 hover:bg-indigo-800/40"
          )}
        >
          <div className="flex items-center space-x-3">
            {React.cloneElement(item.icon as React.ReactElement, { 
              size: 18,
              className: cn(isItemActive ? "text-white" : "text-indigo-300") 
            })}
            <span className="text-sm font-medium">{item.label}</span>
          </div>
          
          {item.badge && (
            <span className="bg-red-500 text-white text-xs rounded-md px-1.5 py-0.5 min-w-[20px] text-center">
              {item.badge}
            </span>
          )}
        </Link>
      )}
    </div>
  );
};

export default SidebarItem;
