
import React from 'react';
import { motion } from 'framer-motion';
import ModuleGrid from './ModuleGrid';
import { LucideIcon } from 'lucide-react';

interface DashboardModuleSectionProps {
  title: string;
  iconColor: string;
  modules: {
    title: string;
    description: string;
    icon: LucideIcon;
    to: string;
  }[];
  delay?: number;
}

const DashboardModuleSection: React.FC<DashboardModuleSectionProps> = ({ 
  title, 
  iconColor, 
  modules,
  delay = 0
}) => {
  return (
    <div>
      <div className="mb-5 flex items-center">
        <motion.div 
          className={`h-1.5 w-1.5 rounded-full ${iconColor} mr-2`}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, delay, repeat: Infinity }}
        />
        <h3 className={`text-lg font-medium ${iconColor.replace('bg-', 'text-').replace('-500', '-700')} dark:${iconColor.replace('bg-', 'text-').replace('-500', '-300')}`}>
          {title}
        </h3>
      </div>
      <ModuleGrid modules={modules} />
    </div>
  );
};

export default DashboardModuleSection;
