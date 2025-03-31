
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
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ 
        y: -5,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05)'
      }}
      className={cn(
        "rounded-xl border-none transition-all duration-300",
        "hover:shadow-xl group h-full",
        colorClass
      )}
    >
      <Link to={to} className="flex flex-col h-full">
        <div className="p-6 relative h-full flex flex-col">
          <div className="mb-3">
            <motion.div 
              className="p-2.5 rounded-lg bg-white/20 inline-flex"
              whileHover={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.6 }}
            >
              <Icon className="w-5 h-5 text-white" />
            </motion.div>
          </div>
          
          <h3 className="font-semibold text-lg text-white mb-2">{title}</h3>
          <p className="text-white/80 text-sm line-clamp-2 mb-4">{description}</p>
          
          <div className="mt-auto">
            <motion.div 
              className="inline-flex items-center text-white text-sm font-medium"
              whileHover={{ x: 5 }}
            >
              Acessar
              <motion.div
                className="ml-1.5"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.div>
            </motion.div>
          </div>
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

// Enhanced color classes with more vibrant gradients
const colorClasses = [
  "bg-gradient-to-br from-blue-600 to-blue-800",
  "bg-gradient-to-br from-indigo-600 to-indigo-800",
  "bg-gradient-to-br from-purple-600 to-purple-800",
  "bg-gradient-to-br from-sky-600 to-sky-800",
  "bg-gradient-to-br from-cyan-600 to-cyan-800", 
  "bg-gradient-to-br from-emerald-600 to-emerald-800",
  "bg-gradient-to-br from-violet-600 to-violet-800",
  "bg-gradient-to-br from-pink-600 to-pink-800",
  "bg-gradient-to-br from-amber-600 to-amber-800",
];

const ModuleGrid: React.FC<ModuleGridProps> = ({ modules }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
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
    </div>
  );
};

export default ModuleGrid;
