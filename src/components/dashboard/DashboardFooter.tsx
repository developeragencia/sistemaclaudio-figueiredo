
import React from 'react';
import { motion } from 'framer-motion';

const DashboardFooter = () => {
  return (
    <motion.div 
      className="w-full mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
    >
      <div className="flex flex-col items-center justify-center space-y-2">
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Sistema de Gestão Tributária • Versão 2.5.0
        </p>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          © 2024 Advogados Associados. Todos os direitos reservados.
        </p>
      </div>
    </motion.div>
  );
};

export default DashboardFooter;
