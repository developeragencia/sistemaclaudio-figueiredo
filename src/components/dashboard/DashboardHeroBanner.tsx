
import React from 'react';
import { motion } from 'framer-motion';

const DashboardHeroBanner = () => {
  return (
    <motion.div 
      className="relative overflow-hidden rounded-2xl"
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1 }
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90"></div>
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'52\' height=\'26\' viewBox=\'0 0 52 26\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z\' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
      <div className="relative z-10 px-8 py-14 text-white">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4 flex items-center">
            Painel Administrador
            <motion.div 
              className="ml-3 w-3 h-3 bg-white rounded-full"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </h1>
          <p className="text-xl max-w-2xl text-blue-100">
            Bem-vindo ao painel de controle do sistema de gestão tributária. 
            Acesse os módulos através dos cards abaixo.
          </p>
        </motion.div>
      </div>
      
      {/* Animated shapes */}
      <motion.div 
        className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white/10"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-10 right-40 w-24 h-24 rounded-full bg-white/5"
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, 30, 0]
        }}
        transition={{ duration: 25, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default DashboardHeroBanner;
