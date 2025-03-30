
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface ModuleItemProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  colorClass: string;
  index: number;
}

const ModuleItem: React.FC<ModuleItemProps> = ({ 
  title, 
  description, 
  icon: Icon,
  to,
  colorClass,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -8,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
      }}
      className={cn(
        "rounded-xl border transition-all duration-500 h-full overflow-hidden shadow-md group",
        colorClass
      )}
    >
      <Link to={to} className="flex flex-col h-full">
        <div className="px-6 pt-8 pb-4 relative overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-black/20 opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <motion.div 
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-3 rounded-full bg-white/20 mb-5 inline-flex"
            >
              <Icon className="w-7 h-7 text-white" />
            </motion.div>
            
            <h3 className="font-bold text-xl text-white mb-3">{title}</h3>
            <p className="text-white/80 text-sm mb-6 line-clamp-3">{description}</p>
          </div>
        </div>
        
        <div className="mt-auto bg-black/10 p-4 group-hover:bg-black/20 transition-all duration-300">
          <motion.div 
            whileHover={{ x: 5 }}
            className="inline-flex items-center text-white text-sm font-medium"
          >
            Acessar
            <motion.span 
              className="ml-2 transition-transform duration-300"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

interface ModuleGridProps {
  modules: {
    title: string;
    description: string;
    icon: LucideIcon;
    to: string;
  }[];
}

const colorClasses = [
  "bg-gradient-to-br from-blue-600 to-blue-800 border-blue-500/20",
  "bg-gradient-to-br from-purple-600 to-indigo-800 border-purple-500/20",
  "bg-gradient-to-br from-rose-500 to-pink-700 border-rose-500/20",
  "bg-gradient-to-br from-amber-500 to-orange-700 border-amber-500/20",
  "bg-gradient-to-br from-emerald-500 to-green-700 border-emerald-500/20",
  "bg-gradient-to-br from-cyan-500 to-teal-700 border-cyan-500/20",
];

const ModuleGrid: React.FC<ModuleGridProps> = ({ modules }) => {
  // Container variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {modules.map((module, index) => (
        <ModuleItem 
          key={module.title}
          title={module.title}
          description={module.description}
          icon={module.icon}
          to={module.to}
          colorClass={colorClasses[index % colorClasses.length]}
          index={index}
        />
      ))}
    </motion.div>
  );
};

export default ModuleGrid;
