
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { SidebarItemProps } from './types';
import { Badge } from '@/components/ui/badge';

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
  
  // Determine badge color - use light green for "Novo", red for others
  const getBadgeVariant = (badgeText: string | number) => {
    return String(badgeText) === "Novo" ? "outline" : "destructive";
  };
  
  // Determine badge style - use light green for "Novo", red for others
  const getBadgeStyle = (badgeText: string | number) => {
    return String(badgeText) === "Novo" 
      ? "bg-green-100 text-green-700 border border-green-200" 
      : "";
  };
  
  // Animation variants for the menu items
  const menuItemVariants = {
    initial: { opacity: 0, y: 5 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -5 }
  };
  
  if (collapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <div className="mb-1">
            {hasSubmenu ? (
              <motion.button
                onClick={toggleSubmenu}
                className={cn(
                  "w-full p-2 flex justify-center rounded-lg transition-all",
                  isItemActive 
                    ? "bg-blue-500 shadow-md shadow-blue-200 text-white" 
                    : "text-blue-600 hover:bg-blue-50"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  {React.cloneElement(item.icon as React.ReactElement, { 
                    size: 20,
                    className: cn(isItemActive ? "text-white" : "text-blue-600") 
                  })}
                  
                  {item.badge && (
                    <span className={cn(
                      "absolute -top-1 -right-1 text-[10px] rounded-full w-4 h-4 flex items-center justify-center",
                      item.badge === "Novo" 
                        ? "bg-green-100 text-green-700 border border-green-200" 
                        : "bg-red-500 text-white"
                    )}>
                      {item.badge === "Novo" ? "N" : item.badge}
                    </span>
                  )}
                </div>
              </motion.button>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.to}
                  className={cn(
                    "w-full p-2 flex justify-center rounded-lg transition-all",
                    isItemActive 
                      ? "bg-blue-500 shadow-md shadow-blue-200 text-white" 
                      : "text-blue-600 hover:bg-blue-50"
                  )}
                >
                  <div className="relative">
                    {React.cloneElement(item.icon as React.ReactElement, { 
                      size: 20,
                      className: cn(isItemActive ? "text-white" : "text-blue-600") 
                    })}
                    
                    {item.badge && (
                      <span className={cn(
                        "absolute -top-1 -right-1 text-[10px] rounded-full w-4 h-4 flex items-center justify-center",
                        item.badge === "Novo" 
                          ? "bg-green-100 text-green-700 border border-green-200" 
                          : "bg-red-500 text-white"
                      )}>
                        {item.badge === "Novo" ? "N" : item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-white border-blue-100 text-blue-900">
          {item.label}
        </TooltipContent>
      </Tooltip>
    );
  }
  
  return (
    <div className="mb-1.5">
      {hasSubmenu ? (
        <div>
          <motion.button
            onClick={toggleSubmenu}
            className={cn(
              "w-full p-3 flex items-center justify-between rounded-lg transition-all",
              isItemActive 
                ? "bg-gradient-to-r from-blue-500 to-blue-600 shadow-md shadow-blue-200/50 text-white" 
                : "text-blue-700 hover:bg-blue-50 hover:text-blue-800"
            )}
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3">
              {React.cloneElement(item.icon as React.ReactElement, { 
                size: 18,
                className: cn(isItemActive ? "text-white" : "text-blue-600") 
              })}
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {item.badge && (
                <Badge 
                  variant={getBadgeVariant(item.badge)} 
                  className={cn(
                    "h-5 min-w-[20px] px-1.5 font-medium",
                    getBadgeStyle(item.badge)
                  )}
                >
                  {item.badge}
                </Badge>
              )}
              
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className={`h-4 w-4 ${isItemActive ? "text-white" : "text-blue-400"}`} />
              </motion.div>
            </div>
          </motion.button>
          
          <AnimatePresence initial={false}>
            {isOpen && hasSubmenu && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="ml-4 pl-4 border-l border-blue-200 mt-1 space-y-1"
              >
                {item.submenu?.map((subitem) => (
                  <motion.div
                    key={subitem.label}
                    variants={menuItemVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.15 }}
                  >
                    <Link
                      to={subitem.to}
                      className={cn(
                        "flex items-center justify-between py-2.5 px-3 my-1 rounded-md text-sm transition-all",
                        location.pathname === subitem.to 
                          ? "bg-blue-100 text-blue-700 font-medium" 
                          : "text-blue-600 hover:bg-blue-50 hover:text-blue-800"
                      )}
                    >
                      <span>{subitem.label}</span>
                      {subitem.badge && (
                        <Badge 
                          variant={getBadgeVariant(subitem.badge)} 
                          className={cn(
                            "h-5 min-w-[20px] px-1.5 font-medium",
                            getBadgeStyle(subitem.badge)
                          )}
                        >
                          {subitem.badge}
                        </Badge>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            to={item.to}
            className={cn(
              "w-full p-3 flex items-center justify-between rounded-lg transition-all",
              isItemActive 
                ? "bg-gradient-to-r from-blue-500 to-blue-600 shadow-md shadow-blue-200/50 text-white" 
                : "text-blue-700 hover:bg-blue-50 hover:text-blue-800"
            )}
          >
            <div className="flex items-center space-x-3">
              {React.cloneElement(item.icon as React.ReactElement, { 
                size: 18,
                className: cn(isItemActive ? "text-white" : "text-blue-600") 
              })}
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            
            {item.badge && (
              <Badge 
                variant={getBadgeVariant(item.badge)} 
                className={cn(
                  "h-5 min-w-[20px] px-1.5 font-medium",
                  getBadgeStyle(item.badge)
                )}
              >
                {item.badge}
              </Badge>
            )}
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default SidebarItem;
