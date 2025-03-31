
import React from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarMobileToggleProps {
  isMobileMenuOpen: boolean;
  handleMobileToggle: () => void;
}

const SidebarMobileToggle: React.FC<SidebarMobileToggleProps> = ({ 
  isMobileMenuOpen, 
  handleMobileToggle 
}) => {
  return (
    <div className="fixed top-4 left-4 z-50 md:hidden">
      <motion.button 
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg border border-blue-100"
        onClick={handleMobileToggle}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </motion.button>
    </div>
  );
};

export default SidebarMobileToggle;
