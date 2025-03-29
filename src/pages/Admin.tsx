
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, FileText, Clock, BarChart2, BookOpen } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';

const Admin: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-blue-800">Painel</h1>
          <p className="text-gray-500">Visão geral das principais informações do sistema</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold flex items-center text-blue-700 mb-2">
            <BarChart2 className="mr-2 h-5 w-5" />
            Painel Principal
          </h2>
          <p className="text-gray-500 mb-4">Bem-vindo ao painel administrativo do sistema</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Clientes Ativos"
              value="84"
              icon={<Users className="w-5 h-5 text-blue-700" />}
              trend={{ value: 12, isPositive: true }}
              className="bg-white"
            />
            
            <StatCard
              title="Créditos Identificados"
              value="R$ 1,2M"
              icon={<FileText className="w-5 h-5 text-blue-700" />}
              trend={{ value: 23, isPositive: true }}
              className="bg-white"
            />
            
            <StatCard
              title="Declarações"
              value="342"
              icon={<BookOpen className="w-5 h-5 text-blue-700" />}
              trend={{ value: 5, isPositive: false }}
              className="bg-white"
            />
            
            <StatCard
              title="Tempo Médio de Recuperação"
              value="48 dias"
              icon={<Clock className="w-5 h-5 text-blue-700" />}
              trend={{ value: 12, isPositive: true }}
              className="bg-white"
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold flex items-center text-blue-700 mb-4">
            <BookOpen className="mr-2 h-5 w-5" />
            Módulos Principais
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-white">
              <CardContent className="p-0 flex flex-col items-center justify-center h-40">
                <div className="text-gray-400 mb-2">Módulo em desenvolvimento</div>
              </CardContent>
            </Card>
            
            <Card className="p-6 bg-white">
              <CardContent className="p-0 flex flex-col items-center justify-center h-40">
                <div className="text-gray-400 mb-2">Módulo em desenvolvimento</div>
              </CardContent>
            </Card>
            
            <Card className="p-6 bg-white relative">
              <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold py-1 px-3 rounded-full">
                Novo
              </div>
              <CardContent className="p-0 flex flex-col items-center justify-center h-40">
                <div className="text-gray-400 mb-2">Novo módulo disponível</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
