
import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarToggleButtonProps {
  collapsed: boolean;
  toggleCollapse: () => void;
}

const SidebarToggleButton: React.FC<SidebarToggleButtonProps> = ({ collapsed, toggleCollapse }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button 
            onClick={toggleCollapse}
            className={cn(
              "w-10 h-10 flex items-center justify-center",
              "rounded-full bg-gradient-to-r from-blue-700/80 to-blue-900/80 hover:from-blue-600/80 hover:to-blue-800/80 text-blue-50 transition-colors",
              "shadow-md shadow-blue-900/20",
              collapsed && "mx-auto"
            )}
            whileHover={{ scale: 1.1, boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.9 }}
            initial={{ rotate: 0 }}
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {collapsed ? (
              <ChevronsRight className="h-5 w-5" />
            ) : (
              <ChevronsLeft className="h-5 w-5" />
            )}
            
            {/* Subtle pulse effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-blue-400/20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1.2, 0.8], 
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          </motion.button>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-blue-900 text-white border-blue-700">
          {collapsed ? 'Expandir menu' : 'Recolher menu'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SidebarToggleButton;
