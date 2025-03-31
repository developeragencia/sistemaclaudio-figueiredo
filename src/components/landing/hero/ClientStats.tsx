
import React from "react";
import { motion } from "framer-motion";

const ClientStats: React.FC = () => {
  return (
    <motion.div 
      className="mt-8 flex items-center gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      <div className="flex -space-x-2">
        {[1,2,3,4].map((i) => (
          <div 
            key={i} 
            className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center ${
              ['bg-sky-400', 'bg-blue-500', 'bg-indigo-500', 'bg-purple-500'][i-1]
            }`}
          >
            <span className="text-white text-xs font-medium">
              {String.fromCharCode(64 + i)}
            </span>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-600">
        <span className="font-semibold text-sky-700">+500</span> empresas confiam em nosso sistema
      </p>
    </motion.div>
  );
};

export default ClientStats;
