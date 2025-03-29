
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, 
  FileText, 
  Clock, 
  BarChart2, 
  BookOpen,
  Calculator, 
  Receipt,
  ShieldAlert,
  Cog,
  LifeBuoy,
  Import,
  Globe,
  ShieldCheck,
  Lock
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import { Link } from 'react-router-dom';

const Admin: React.FC = () => {
  // Main statistics for the dashboard
  const statCards = [
    {
      title: "Clientes Ativos",
      value: "84",
      icon: <Users className="w-5 h-5 text-blue-700" />,
      trend: { value: 12, isPositive: true }
    },
    {
      title: "Créditos Identificados",
      value: "R$ 1,2M",
      icon: <FileText className="w-5 h-5 text-blue-700" />,
      trend: { value: 23, isPositive: true }
    },
    {
      title: "Declarações",
      value: "342",
      icon: <BookOpen className="w-5 h-5 text-blue-700" />,
      trend: { value: 5, isPositive: false }
    },
    {
      title: "Tempo Médio de Recuperação",
      value: "48 dias",
      icon: <Clock className="w-5 h-5 text-blue-700" />,
      trend: { value: 12, isPositive: true }
    },
  ];

  // All menu modules from sidebar
  const modules = [
    {
      title: "Gestão de Clientes",
      icon: <Users className="w-6 h-6 text-blue-700" />,
      link: "/clients-management",
      isNew: false
    },
    {
      title: "Cálculos e Recuperação",
      icon: <Calculator className="w-6 h-6 text-blue-700" />,
      link: "/irrf-calculations",
      isNew: false
    },
    {
      title: "Auditoria Tributária",
      icon: <ShieldCheck className="w-6 h-6 text-blue-700" />,
      link: "/tax-audit",
      isNew: false
    },
    {
      title: "Relatórios",
      icon: <FileText className="w-6 h-6 text-blue-700" />,
      link: "/detailed-reports",
      isNew: false
    },
    {
      title: "Gestão",
      icon: <BarChart2 className="w-6 h-6 text-blue-700" />,
      link: "/commercial-proposals",
      isNew: false
    },
    {
      title: "Sistema",
      icon: <Globe className="w-6 h-6 text-blue-700" />,
      link: "/operational",
      isNew: false
    },
    {
      title: "Segurança & Auditoria",
      icon: <ShieldAlert className="w-6 h-6 text-blue-700" />,
      link: "/two-factor-auth",
      isNew: true
    },
    {
      title: "Suporte",
      icon: <LifeBuoy className="w-6 h-6 text-blue-700" />,
      link: "/support",
      isNew: false
    },
    {
      title: "Configurações",
      icon: <Cog className="w-6 h-6 text-blue-700" />,
      link: "/settings",
      isNew: false
    },
  ];

  // Secondary modules (submenu items)
  const secondaryModules = [
    {
      title: "Identificação de Créditos",
      icon: <Receipt className="w-6 h-6 text-blue-700" />,
      link: "/credits-identification",
      isNew: false
    },
    {
      title: "Dashboard Interativo",
      icon: <BarChart2 className="w-6 h-6 text-blue-700" />,
      link: "/interactive-dashboard",
      isNew: false
    },
    {
      title: "Importação",
      icon: <Import className="w-6 h-6 text-blue-700" />,
      link: "/import",
      isNew: false
    },
    {
      title: "Proteção de Acesso",
      icon: <Lock className="w-6 h-6 text-blue-700" />,
      link: "/access-protection",
      isNew: true
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-blue-800">Painel Administrativo</h1>
          <p className="text-gray-500">Visão geral das principais informações do sistema</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold flex items-center text-blue-700 mb-2">
            <BarChart2 className="mr-2 h-5 w-5" />
            Métricas Principais
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((card, index) => (
              <StatCard
                key={index}
                title={card.title}
                value={card.value}
                icon={card.icon}
                trend={card.trend}
                className="bg-white"
              />
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold flex items-center text-blue-700 mb-4">
            <BookOpen className="mr-2 h-5 w-5" />
            Módulos Principais
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <Link to={module.link} key={index}>
                <Card className="p-6 bg-white hover:shadow-md transition-shadow relative">
                  {module.isNew && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold py-1 px-3 rounded-full">
                      Novo
                    </div>
                  )}
                  <CardContent className="p-0 flex flex-col items-center justify-center h-40">
                    {module.icon}
                    <div className="mt-4 text-center">
                      <h3 className="font-medium text-gray-800">{module.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">Acessar módulo</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold flex items-center text-blue-700 mb-4">
            <Cog className="mr-2 h-5 w-5" />
            Módulos Secundários
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {secondaryModules.map((module, index) => (
              <Link to={module.link} key={index}>
                <Card className="p-4 bg-white hover:shadow-md transition-shadow relative">
                  {module.isNew && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold py-0.5 px-2 rounded-full">
                      Novo
                    </div>
                  )}
                  <CardContent className="p-0 flex items-center space-x-3">
                    {module.icon}
                    <div>
                      <h3 className="font-medium text-gray-800 text-sm">{module.title}</h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
