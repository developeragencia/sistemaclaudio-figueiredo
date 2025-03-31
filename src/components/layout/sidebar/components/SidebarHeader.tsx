
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedLogo from '@/components/ui/AnimatedLogo';

interface SidebarHeaderProps {
  collapsed: boolean;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'} py-2 relative overflow-hidden`}
    >
      {/* Subtle animated background effect */}
      <motion.div 
        className="absolute inset-0 bg-sidebar-accent/10 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-20"
             style={{
               backgroundSize: '200% 100%',
               animation: 'shimmer 2s infinite',
             }}
        />
      </motion.div>
      
      {/* Logo with enhanced animation */}
      <motion.div
        className="relative z-10"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <AnimatedLogo size={collapsed ? "small" : "medium"} showText={!collapsed} />
      </motion.div>
    </motion.div>
  );
};

export default SidebarHeader;
