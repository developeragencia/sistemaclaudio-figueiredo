
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
        boxShadow: '0 15px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)'
      }}
      className={cn(
        "rounded-xl border transition-all duration-300 h-full overflow-hidden shadow-md group",
        colorClass
      )}
    >
      <Link to={to} className="flex flex-col h-full">
        <div className="px-5 pt-5 pb-4">
          <div className="mb-3">
            <div className="p-2 rounded-lg bg-white/30 inline-flex shadow-sm">
              <Icon className="w-5 h-5 text-white" />
            </div>
          </div>
          <h3 className="font-semibold text-base text-white mb-1">{title}</h3>
          <p className="text-white/90 text-sm line-clamp-2">{description}</p>
        </div>
        
        <div className="mt-auto bg-black/10 p-2 group-hover:bg-black/20 transition-all duration-300">
          <motion.div 
            whileHover={{ x: 5 }}
            className="inline-flex items-center text-white text-sm font-medium"
          >
            Acessar
            <ArrowRight className="ml-1 w-3.5 h-3.5" />
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

// Modern color classes with improved gradients
const colorClasses = [
  "bg-gradient-to-br from-blue-500 to-blue-600",
  "bg-gradient-to-br from-indigo-500 to-indigo-600",
  "bg-gradient-to-br from-purple-500 to-purple-600",
  "bg-gradient-to-br from-teal-500 to-teal-600",
  "bg-gradient-to-br from-emerald-500 to-emerald-600",
  "bg-gradient-to-br from-sky-500 to-sky-600",
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
