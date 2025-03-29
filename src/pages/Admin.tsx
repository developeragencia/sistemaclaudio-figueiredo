
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
  Pie,
  Wallet,
  Inbox,
  List,
  Calendar,
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

  // Main modules
  const modules = [
    { 
      title: "Gestão de Clientes", 
      description: "Gerenciamento completo dos clientes",
      icon: <Users className="w-10 h-10 text-blue-600" />, 
      link: "/clients-management", 
      isNew: false 
    },
    { 
      title: "Cálculos e Recuperação", 
      description: "Sistema de cálculos tributários",
      icon: <Calculator className="w-10 h-10 text-blue-600" />, 
      link: "/irrf-calculations", 
      isNew: false 
    },
    { 
      title: "Auditoria Tributária", 
      description: "Auditoria avançada de tributos",
      icon: <ShieldCheck className="w-10 h-10 text-blue-600" />, 
      link: "/tax-audit", 
      isNew: false 
    },
    { 
      title: "Relatórios", 
      description: "Relatórios detalhados e análises",
      icon: <BarChart2 className="w-10 h-10 text-blue-600" />, 
      link: "/detailed-reports", 
      isNew: false 
    },
    { 
      title: "Financeiro", 
      description: "Controle financeiro e orçamentos",
      icon: <Wallet className="w-10 h-10 text-blue-600" />, 
      link: "/commercial-proposals", 
      isNew: true 
    },
    { 
      title: "Calendário", 
      description: "Agenda e prazos fiscais",
      icon: <Calendar className="w-10 h-10 text-blue-600" />, 
      link: "/calendar", 
      isNew: false 
    }
  ];

  // Secondary tools
  const tools = [
    { 
      title: "Importação de Dados", 
      icon: <Import className="w-5 h-5 text-blue-700" />, 
      link: "/import" 
    },
    { 
      title: "Dashboard Interativo", 
      icon: <Pie className="w-5 h-5 text-blue-700" />, 
      link: "/interactive-dashboard" 
    },
    { 
      title: "Configurações", 
      icon: <Cog className="w-5 h-5 text-blue-700" />, 
      link: "/settings" 
    },
    { 
      title: "Suporte", 
      icon: <LifeBuoy className="w-5 h-5 text-blue-700" />, 
      link: "/support" 
    },
    { 
      title: "Segurança", 
      icon: <Lock className="w-5 h-5 text-blue-700" />, 
      link: "/security-audit" 
    },
    { 
      title: "Site & Conteúdo", 
      icon: <Globe className="w-5 h-5 text-blue-700" />, 
      link: "/site-editor" 
    }
  ];

  // Activity items
  const activityItems = [
    {
      action: "Cliente atualizado",
      description: "Empresa ABC Ltda teve seus dados atualizados",
      time: "Agora mesmo",
      icon: <Users className="w-4 h-4 text-blue-500" />
    },
    {
      action: "Novo relatório",
      description: "Relatório fiscal do mês de Abril foi gerado",
      time: "2 horas atrás",
      icon: <FileText className="w-4 h-4 text-green-500" />
    },
    {
      action: "Processo iniciado",
      description: "Recuperação de crédito para XYZ Comércio",
      time: "5 horas atrás",
      icon: <Receipt className="w-4 h-4 text-orange-500" />
    },
    {
      action: "Alerta de segurança",
      description: "Tentativa de acesso não autorizado detectada",
      time: "1 dia atrás",
      icon: <ShieldAlert className="w-4 h-4 text-red-500" />
    }
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-800">Painel Administrativo</h1>
          <p className="text-gray-500">Visão geral do sistema e principais indicadores</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Exportar Relatório
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Users className="w-4 h-4 mr-2" />
            Novo Cliente
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <StatCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            trend={card.trend}
            className="bg-white shadow-sm"
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-700" />
              Módulos Principais
            </CardTitle>
            <CardDescription>Acesse as funcionalidades do sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {modules.map((module, index) => (
                <Link to={module.link} key={index} className="block">
                  <div className="border rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all group">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 rounded-lg p-2 group-hover:bg-white">
                        {module.icon}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-gray-800">{module.title}</h3>
                          {module.isNew && (
                            <span className="ml-2 bg-green-500 text-white text-xs font-bold py-0.5 px-2 rounded-full">
                              Novo
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{module.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-700" />
              Atividade Recente
            </CardTitle>
            <CardDescription>Últimas ações no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                  <div className="bg-gray-100 rounded-full p-1.5 mt-0.5">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.action}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <div className="text-xs text-gray-400 whitespace-nowrap">{item.time}</div>
                </div>
              ))}
              
              <div className="pt-2">
                <Button variant="ghost" className="text-blue-600 text-sm w-full justify-center">
                  Ver Todas as Atividades
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold flex items-center text-blue-700 mb-4">
          <Cog className="mr-2 h-5 w-5" />
          Ferramentas e Recursos
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {tools.map((tool, index) => (
            <Link to={tool.link} key={index}>
              <Card className="h-full hover:shadow-md transition-shadow border-gray-100">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                  <div className="bg-blue-50 rounded-full p-3 mb-3">
                    {tool.icon}
                  </div>
                  <h3 className="font-medium text-gray-800 text-sm">{tool.title}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
