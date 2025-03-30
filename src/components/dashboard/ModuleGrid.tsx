
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

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
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
      }}
      className={cn(
        "rounded-xl p-6 border transition-all duration-300 h-full",
        colorClass
      )}
    >
      <Link to={to} className="flex flex-col h-full">
        <div className="flex items-center mb-4">
          <div className="p-3 rounded-full bg-white/30 mr-4">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-bold text-lg text-white">{title}</h3>
        </div>
        
        <p className="text-white/80 text-sm mb-4">{description}</p>
        
        <div className="mt-auto">
          <div className="inline-flex items-center text-white text-sm font-medium">
            Acessar
            <svg 
              className="ml-1 w-4 h-4 transition-transform duration-200 transform group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
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

const colorClasses = [
  "bg-gradient-to-br from-sky-600 to-blue-700 border-sky-500/20",
  "bg-gradient-to-br from-purple-600 to-indigo-700 border-purple-500/20",
  "bg-gradient-to-br from-rose-600 to-pink-700 border-rose-500/20",
  "bg-gradient-to-br from-amber-600 to-orange-700 border-amber-500/20",
  "bg-gradient-to-br from-emerald-600 to-green-700 border-emerald-500/20",
  "bg-gradient-to-br from-cyan-600 to-teal-700 border-cyan-500/20",
];

const ModuleGrid: React.FC<ModuleGridProps> = ({ modules }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
