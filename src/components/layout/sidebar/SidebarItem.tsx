
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from 'react-router-dom';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive?: boolean;
  collapsed?: boolean;
  hasSubmenu?: boolean;
  isSubmenuOpen?: boolean;
  toggleSubmenu?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  to, 
  isActive = false, 
  collapsed = false,
  hasSubmenu = false,
  isSubmenuOpen = false,
  toggleSubmenu
}) => {
  if (collapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Link 
            to={to} 
            className={cn(
              "flex items-center p-3 rounded-md hover:bg-blue-50 transition-colors",
              isActive && "bg-blue-50 text-blue-700"
            )}
            onClick={hasSubmenu && toggleSubmenu ? toggleSubmenu : undefined}
          >
            <div className="w-full flex justify-center">
              {React.cloneElement(icon as React.ReactElement, { 
                className: cn("h-5 w-5", isActive && "text-blue-700") 
              })}
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }
  
  return (
    <Link
      to={hasSubmenu ? "#" : to}
      onClick={hasSubmenu && toggleSubmenu ? toggleSubmenu : undefined}
      className={cn(
        "flex items-center px-3 py-2 rounded-md hover:bg-blue-50 transition-colors",
        isActive && "bg-blue-50 text-blue-700"
      )}
    >
      {React.cloneElement(icon as React.ReactElement, { 
        className: cn("h-5 w-5 mr-3", isActive && "text-blue-700") 
      })}
      <span className="font-medium text-sm flex-1">{label}</span>
      {hasSubmenu && (
        isSubmenuOpen ? 
          <ChevronDown className="h-4 w-4" /> : 
          <ChevronRight className="h-4 w-4" />
      )}
    </Link>
  );
};

export default SidebarItem;
