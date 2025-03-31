
import React from "react";
import { motion } from "framer-motion";

const AnimatedHeading: React.FC = () => {
  return (
    <motion.h1 
      className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight tracking-tight"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      <span className="block">Sistema de</span>
      <span className="relative">
        <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
          Gestão Tributária
        </span>
        <motion.span 
          className="absolute bottom-1 left-0 w-full h-1 bg-gradient-to-r from-sky-400/80 to-blue-500/80"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 1.2, duration: 1 }}
        ></motion.span>
      </span>
      <span className="block">para Escritórios de Advocacia</span>
    </motion.h1>
  );
};

export default AnimatedHeading;
