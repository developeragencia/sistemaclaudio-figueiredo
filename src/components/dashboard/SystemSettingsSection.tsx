
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Settings } from 'lucide-react';
import DashboardModuleSection from './DashboardModuleSection';

interface SystemSettingsSectionProps {
  modules: {
    title: string;
    description: string;
    icon: any;
    to: string;
  }[];
}

const SystemSettingsSection: React.FC<SystemSettingsSectionProps> = ({ modules }) => {
  return (
    <Card className="w-full border-none rounded-xl overflow-hidden shadow-lg bg-white dark:bg-slate-800">
      <CardContent className="p-0">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center">
            <Settings className="mr-3 h-6 w-6 text-amber-600 dark:text-amber-400" />
            Sistema e Suporte
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Configurações e opções de sistema
          </p>
        </div>
        
        <div className="p-6">
          <DashboardModuleSection 
            title="Configurações e Suporte" 
            iconColor="bg-amber-500" 
            modules={modules}
            delay={0.9} 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemSettingsSection;
