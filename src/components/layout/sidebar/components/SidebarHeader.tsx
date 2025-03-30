
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedLogo from '@/components/ui/AnimatedLogo';

interface SidebarHeaderProps {
  collapsed: boolean;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed }) => {
  return (
    <motion.div
      initial={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : "auto" }}
      animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : "auto" }}
      exit={{ opacity: 0, width: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center space-x-2 ${collapsed && "hidden"}`}
    >
      <AnimatedLogo size="small" />
    </motion.div>
  );
};

export default SidebarHeader;
