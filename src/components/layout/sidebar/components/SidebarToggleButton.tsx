
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SidebarToggleButtonProps {
  collapsed: boolean;
  toggleCollapse: () => void;
}

const SidebarToggleButton: React.FC<SidebarToggleButtonProps> = ({ collapsed, toggleCollapse }) => {
  return (
    <motion.button 
      onClick={toggleCollapse}
      className={cn(
        "w-8 h-8 flex items-center justify-center",
        "rounded-full hover:bg-blue-50 text-blue-500 transition-colors",
        collapsed && "mx-auto"
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {collapsed ? (
        <ChevronRight className="h-5 w-5" />
      ) : (
        <ChevronLeft className="h-5 w-5" />
      )}
    </motion.button>
  );
};

export default SidebarToggleButton;
