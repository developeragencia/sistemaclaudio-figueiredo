
import React from 'react';
import { cn } from '@/lib/utils';
import AnimatedLogo from '@/components/ui/AnimatedLogo';
import { ChevronRight } from 'lucide-react';

interface SidebarHeaderProps {
  collapsed: boolean;
  toggleCollapse: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed, toggleCollapse }) => {
  return (
    <div className="flex items-center h-16 border-b px-3">
      {!collapsed ? (
        <div className="w-full flex items-center justify-between">
          <AnimatedLogo size="small" />
          <button 
            onClick={toggleCollapse} 
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <button 
            onClick={toggleCollapse} 
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors"
          >
            <AnimatedLogo size="small" showText={false} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SidebarHeader;
