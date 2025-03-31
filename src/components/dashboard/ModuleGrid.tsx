
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
        y: -5,
        scale: 1.02,
        boxShadow: '0 15px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
      }}
      className={cn(
        "rounded-xl border transition-all duration-500 h-full overflow-hidden shadow-md group",
        colorClass
      )}
    >
      <Link to={to} className="flex flex-col h-full">
        <div className="px-5 pt-6 pb-3 relative overflow-hidden">
          {/* Animated background gradient with transparency */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-black/20 opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
          
          {/* Subtle animated pattern overlay */}
          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
               style={{
                 backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                 backgroundSize: '15px 15px'
               }} />
          
          <div className="relative z-10">
            <motion.div 
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.15, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="p-3 rounded-full bg-white/30 mb-4 inline-flex shadow-md"
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>
            
            <h3 className="font-bold text-lg text-white mb-2">{title}</h3>
            <p className="text-white/90 text-sm mb-4 line-clamp-2">{description}</p>
          </div>
        </div>
        
        <div className="mt-auto bg-black/15 p-3 group-hover:bg-black/25 transition-all duration-300">
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

// Enhanced color classes with alternating light colors and improved gradients
const colorClasses = [
  "bg-gradient-to-br from-blue-400/90 via-blue-500/80 to-blue-600/90 border-blue-300/30",
  "bg-gradient-to-br from-indigo-400/90 via-indigo-500/80 to-indigo-600/90 border-indigo-300/30",
  "bg-gradient-to-br from-purple-400/90 via-purple-500/80 to-purple-600/90 border-purple-300/30",
  "bg-gradient-to-br from-teal-400/90 via-teal-500/80 to-teal-600/90 border-teal-300/30",
  "bg-gradient-to-br from-emerald-400/90 via-emerald-500/80 to-emerald-600/90 border-emerald-300/30",
  "bg-gradient-to-br from-sky-400/90 via-sky-500/80 to-sky-600/90 border-sky-300/30",
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
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4"
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
