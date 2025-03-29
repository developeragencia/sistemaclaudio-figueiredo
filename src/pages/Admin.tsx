
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
  Lock,
  Building,
  UserCog,
  BriefcaseBusiness,
  FileBarChart,
  DatabaseBackup,
  CreditCard
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
      icon: <Building className="w-6 h-6 text-blue-700" />,
      link: "/clients-management",
      isNew: false,
      description: "Cadastro e gerenciamento de clientes"
    },
    {
      title: "Usuários Ativos",
      icon: <UserCog className="w-6 h-6 text-blue-700" />,
      link: "/active-users",
      isNew: true,
      description: "Controle de usuários ativos por CNPJ"
    },
    {
      title: "Propostas Comerciais",
      icon: <BriefcaseBusiness className="w-6 h-6 text-blue-700" />,
      link: "/commercial-proposals",
      isNew: false,
      description: "Fluxo de trabalho para propostas"
    },
    {
      title: "Identificação de Créditos",
      icon: <Receipt className="w-6 h-6 text-blue-700" />,
      link: "/credits-identification",
      isNew: false,
      description: "Análise de pagamentos e créditos"
    },
    {
      title: "Auditoria Tributária",
      icon: <ShieldCheck className="w-6 h-6 text-blue-700" />,
      link: "/tax-audit",
      isNew: false,
      description: "Verificação de retenções e obrigações"
    },
    {
      title: "Correção Monetária Selic",
      icon: <CreditCard className="w-6 h-6 text-blue-700" />,
      link: "/selic-correction",
      isNew: true,
      description: "Atualização de créditos pela taxa Selic"
    },
    {
      title: "Relatórios",
      icon: <FileBarChart className="w-6 h-6 text-blue-700" />,
      link: "/detailed-reports",
      isNew: false,
      description: "Relatórios e dossiês tributários"
    },
    {
      title: "Importação de Dados",
      icon: <Import className="w-6 h-6 text-blue-700" />,
      link: "/import",
      isNew: true,
      description: "Processamento inteligente de dados"
    },
    {
      title: "Segurança & Auditoria",
      icon: <ShieldAlert className="w-6 h-6 text-blue-700" />,
      link: "/two-factor-auth",
      isNew: true,
      description: "Controles avançados de segurança"
    }
  ];

  // Secondary modules (submenu items)
  const secondaryModules = [
    {
      title: "Perfis de Usuários",
      icon: <Users className="w-6 h-6 text-blue-700" />,
      link: "/role-management",
      isNew: true,
      description: "Gerenciamento de perfis de acesso"
    },
    {
      title: "Dashboard Interativo",
      icon: <BarChart2 className="w-6 h-6 text-blue-700" />,
      link: "/interactive-dashboard",
      isNew: false,
      description: "Análise visual de dados"
    },
    {
      title: "Processamento em Fila",
      icon: <DatabaseBackup className="w-6 h-6 text-blue-700" />,
      link: "/processing-queue",
      isNew: true,
      description: "Gerenciamento de processamento assíncrono"
    },
    {
      title: "Trilhas de Auditoria",
      icon: <Lock className="w-6 h-6 text-blue-700" />,
      link: "/audit-trails",
      isNew: true,
      description: "Monitoramento de atividades no sistema"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-blue-800">Painel Administrativo</h1>
          <p className="text-gray-500">Visão geral das principais informações do sistema</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Import className="mr-2 h-4 w-4" />
            Importar Dados
          </Button>
          <Button size="sm">
            <UserCog className="mr-2 h-4 w-4" />
            Gerenciar Usuários
          </Button>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold flex items-center text-blue-700 mb-4">
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
            Módulos Principais do Sistema
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <Link to={module.link} key={index}>
                <Card className="p-6 bg-white hover:shadow-md transition-shadow relative overflow-hidden">
                  {module.isNew && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold py-1 px-3 rounded-full">
                      Novo
                    </div>
                  )}
                  <CardContent className="p-0 flex flex-col h-40">
                    <div className="flex items-center mb-4">
                      {module.icon}
                      <h3 className="font-medium text-gray-800 ml-3">{module.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500 flex-grow">{module.description}</p>
                    <div className="flex justify-end mt-4">
                      <span className="text-blue-600 text-sm font-medium hover:underline">
                        Acessar módulo →
                      </span>
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
            Ferramentas Auxiliares
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
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-3 mb-2">
                      {module.icon}
                      <h3 className="font-medium text-gray-800 text-sm">{module.title}</h3>
                    </div>
                    <p className="text-xs text-gray-500">{module.description}</p>
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
