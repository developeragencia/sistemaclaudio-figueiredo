
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
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
      }}
      className={cn(
        "rounded-xl border transition-all duration-300 h-full overflow-hidden shadow-md",
        colorClass
      )}
    >
      <Link to={to} className="flex flex-col h-full">
        <div className="px-6 pt-6 pb-0">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-white/20 mr-4">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-lg text-white">{title}</h3>
          </div>
          
          <p className="text-white/80 text-sm mb-4">{description}</p>
        </div>
        
        <div className="mt-auto bg-black/10 p-4">
          <div className="inline-flex items-center text-white text-sm font-medium">
            Acessar
            <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 transform group-hover:translate-x-1" />
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
  "bg-gradient-to-r from-blue-600 to-blue-700 border-blue-500/20",
  "bg-gradient-to-r from-purple-600 to-indigo-700 border-purple-500/20",
  "bg-gradient-to-r from-rose-600 to-pink-700 border-rose-500/20",
  "bg-gradient-to-r from-amber-600 to-orange-700 border-amber-500/20",
  "bg-gradient-to-r from-emerald-600 to-green-700 border-emerald-500/20",
  "bg-gradient-to-r from-cyan-600 to-teal-700 border-cyan-500/20",
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
