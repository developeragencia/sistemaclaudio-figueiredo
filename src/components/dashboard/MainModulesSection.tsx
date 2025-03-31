
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from 'lucide-react';
import DashboardModuleSection from './DashboardModuleSection';

interface MainModulesSectionProps {
  systemModules: {
    title: string;
    description: string;
    icon: any;
    to: string;
  }[];
  reportModules: {
    title: string;
    description: string;
    icon: any;
    to: string;
  }[];
  operationalModules: {
    title: string;
    description: string;
    icon: any;
    to: string;
  }[];
}

const MainModulesSection: React.FC<MainModulesSectionProps> = ({ 
  systemModules, 
  reportModules,
  operationalModules 
}) => {
  return (
    <Card className="w-full border-none rounded-xl overflow-hidden shadow-lg bg-white dark:bg-slate-800">
      <CardContent className="p-0">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center">
            <Layout className="mr-3 h-6 w-6 text-blue-600 dark:text-blue-400" />
            Módulos do Sistema
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Acesse as principais funcionalidades do sistema
          </p>
        </div>
        
        <div className="p-6">
          <div className="space-y-12">
            {/* Primary Modules Section */}
            <DashboardModuleSection 
              title="Principais Módulos" 
              iconColor="bg-blue-500" 
              modules={systemModules} 
            />
            
            {/* Report Modules Section */}
            <DashboardModuleSection 
              title="Relatórios e Análises" 
              iconColor="bg-purple-500" 
              modules={reportModules}
              delay={0.3} 
            />
            
            {/* Operational Modules Section */}
            <DashboardModuleSection 
              title="Operações" 
              iconColor="bg-emerald-500" 
              modules={operationalModules}
              delay={0.6} 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MainModulesSection;
