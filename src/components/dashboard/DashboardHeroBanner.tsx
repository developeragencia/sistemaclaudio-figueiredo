
import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const DashboardHeroBanner = () => {
  return (
    <motion.div 
      className="relative w-full rounded-xl overflow-hidden bg-gradient-to-r from-blue-700 to-indigo-800 shadow-xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Animated circles */}
      <motion.div 
        className="absolute top-1/4 right-10 w-40 h-40 rounded-full bg-white/5"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      
      <motion.div 
        className="absolute bottom-5 right-1/4 w-24 h-24 rounded-full bg-white/10"
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, 30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      
      <div className="relative z-10 px-8 py-12 flex items-center">
        <div className="flex-1">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center mb-4"
          >
            <motion.div 
              className="mr-4 p-3 rounded-lg bg-white/10"
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Shield className="h-7 w-7 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Painel Administrativo
            </h1>
          </motion.div>
          
          <motion.p 
            className="text-xl max-w-2xl text-blue-100 font-light"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Bem-vindo à central de controle do sistema de gestão tributária.
            Acesse todos os recursos através dos módulos abaixo.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex mt-6 space-x-3"
          >
            <div className="px-3 py-2 rounded-full bg-white/20 text-white text-sm flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Sistema online
            </div>
            <div className="px-3 py-2 rounded-full bg-white/20 text-white text-sm">
              Última atualização: 15/06/2024
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHeroBanner;
