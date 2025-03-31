
import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface ScrollIndicatorProps {
  scrollToCarousel: () => void;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ scrollToCarousel }) => {
  return (
    <motion.div 
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      <motion.button
        className="text-sky-600 flex flex-col items-center gap-1 cursor-pointer"
        onClick={scrollToCarousel}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-sm font-medium">Conhecer recursos</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.button>
    </motion.div>
  );
};

export default ScrollIndicator;
