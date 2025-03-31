
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
        scale: 1.02,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05)'
      }}
      className={cn(
        "rounded-xl border transition-all duration-300 h-full overflow-hidden shadow",
        "hover:shadow-xl group",
        colorClass
      )}
    >
      <Link to={to} className="flex flex-col h-full">
        <div className="px-5 pt-5 pb-4 relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <motion.div 
              className="absolute inset-0 bg-white/5"
              animate={{ 
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '15px 15px',
              }}
            />
          </div>
          
          <div className="relative z-10">
            <div className="mb-3">
              <motion.div 
                className="p-2.5 rounded-lg bg-white/30 inline-flex shadow-sm"
                whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                transition={{ duration: 0.6 }}
              >
                <Icon className="w-5 h-5 text-white" />
              </motion.div>
            </div>
            <h3 className="font-semibold text-base text-white mb-1">{title}</h3>
            <p className="text-white/90 text-sm line-clamp-2">{description}</p>
          </div>
        </div>
        
        <div className="mt-auto bg-black/10 p-3 group-hover:bg-black/20 transition-all duration-300">
          <motion.div 
            whileHover={{ x: 5 }}
            className="inline-flex items-center text-white text-sm font-medium"
          >
            Acessar
            <motion.div
              className="ml-1.5 flex items-center"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.div>
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

// Enhanced color classes with more vibrant gradients
const colorClasses = [
  "bg-gradient-to-br from-blue-500 to-blue-700",
  "bg-gradient-to-br from-indigo-500 to-indigo-700",
  "bg-gradient-to-br from-purple-500 to-purple-700",
  "bg-gradient-to-br from-teal-500 to-teal-700",
  "bg-gradient-to-br from-emerald-500 to-emerald-700", 
  "bg-gradient-to-br from-sky-500 to-sky-700",
  "bg-gradient-to-br from-violet-500 to-violet-700",
  "bg-gradient-to-br from-pink-500 to-pink-700",
  "bg-gradient-to-br from-cyan-500 to-cyan-700",
];

const ModuleGrid: React.FC<ModuleGridProps> = ({ modules }) => {
  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
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
