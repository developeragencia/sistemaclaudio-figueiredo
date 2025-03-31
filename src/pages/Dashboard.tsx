import React from 'react';
import StatCard from '@/components/dashboard/StatCard';
import ActivityTimeline from '@/components/dashboard/ActivityTimeline';
import ClientsTable from '@/components/dashboard/ClientsTable';
import ModuleGrid from '@/components/dashboard/ModuleGrid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Calculator, 
  FileText, 
  ShieldCheck, 
  Lightbulb, 
  BarChart3, 
  Receipt, 
  CreditCard,
  Database,
  Globe,
  Settings,
  LifeBuoy,
  Shield,
  Cog,
  FileCheck,
  Import,
  Clipboard,
  Gauge,
  FileBarChart,
  Handshake,
  BookOpen,
  Layout,
  ArrowLeft
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, Client } from '@/types';

const mockClients: Client[] = [
  {
    id: "1",
    name: "Tech Solutions Ltda",
    cnpj: "12.345.678/0001-90",
    status: "active",
    email: "contato@techsolutions.com",
    phone: "(11) 97123-4567",
    createdAt: new Date("2023-09-01"),
    updatedAt: new Date("2023-10-15"),
  },
  {
    id: "2",
    name: "Inovação Digital S.A.",
    cnpj: "98.765.432/0001-21",
    status: "active",
    email: "contato@inovacaodigital.com",
    phone: "(11) 98765-4321",
    createdAt: new Date("2023-10-05"),
    updatedAt: new Date("2023-10-20"),
  },
  {
    id: "3",
    name: "Construções ABC Ltda",
    cnpj: "45.678.901/0001-23",
    status: "pending",
    email: "financeiro@construcabc.com",
    createdAt: new Date("2023-10-12"),
    updatedAt: new Date("2023-10-12"),
  },
  {
    id: "4",
    name: "Distribuidora XYZ",
    cnpj: "34.567.890/0001-12",
    status: "inactive",
    email: "contato@distxyz.com",
    phone: "(21) 98888-7777",
    createdAt: new Date("2023-06-30"),
    updatedAt: new Date("2023-09-15"),
  },
  {
    id: "5",
    name: "Serviços Rápidos Ltda",
    cnpj: "56.789.012/0001-34",
    status: "active",
    email: "atendimento@servicosrapidos.com",
    createdAt: new Date("2023-10-22"),
    updatedAt: new Date("2023-10-22"),
  }
];

const mockActivities: Activity[] = [
  {
    id: "1",
    userId: "user1",
    clientId: "1",
    type: "create_client",
    description: "Cliente Tech Solutions Ltda foi cadastrado",
    createdAt: new Date("2023-10-25T14:32:00"),
  },
  {
    id: "2",
    userId: "user1",
    type: "login",
    description: "Usuário fez login no sistema",
    createdAt: new Date("2023-10-25T14:30:00"),
  },
  {
    id: "3",
    userId: "user2",
    clientId: "2",
    type: "update_client",
    description: "Dados do cliente Inovação Digital foram atualizados",
    createdAt: new Date("2023-10-25T13:45:00"),
  },
  {
    id: "4",
    userId: "user1",
    clientId: "3",
    type: "create_proposal",
    description: "Nova proposta criada para Construções ABC",
    createdAt: new Date("2023-10-25T11:22:00"),
  },
  {
    id: "5",
    userId: "user3",
    clientId: "1",
    type: "update_proposal",
    description: "Proposta #12345 atualizada para Tech Solutions",
    createdAt: new Date("2023-10-24T16:08:00"),
  }
];

const Dashboard = () => {
  const systemModules = [
    {
      title: "Gestão de Clientes",
      description: "Gerencie todos os dados de clientes, contratos e histórico de interações.",
      icon: Users,
      to: "/clients-management",
    },
    {
      title: "Créditos Tributários",
      description: "Gerenciamento de créditos e recuperação tributária.",
      icon: CreditCard,
      to: "/tax-credits",
    },
    {
      title: "Calculadora Avançada",
      description: "Ferramentas para cálculos de IRRF e identificação de créditos tributários.",
      icon: Calculator,
      to: "/advanced-calculator",
    },
    {
      title: "Cálculos IRRF",
      description: "Cálculos específicos para Imposto de Renda Retido na Fonte.",
      icon: Calculator,
      to: "/irrf-calculations",
    },
    {
      title: "Recuperação IRRF/PJ",
      description: "Ferramentas para recuperação de IRRF para Pessoas Jurídicas.",
      icon: FileCheck,
      to: "/irrf-recovery",
    },
    {
      title: "Identificação de Créditos",
      description: "Analisar e identificar créditos tributários disponíveis.",
      icon: Lightbulb,
      to: "/credits-identification",
    },
  ];
  
  const reportModules = [
    {
      title: "Relatórios Detalhados",
      description: "Relatórios personalizados e detalhados para análise tributária.",
      icon: FileText,
      to: "/detailed-reports",
    },
    {
      title: "Comprovantes de Retenção",
      description: "Gerenciamento de comprovantes de retenção tributária.",
      icon: Receipt,
      to: "/retention-receipts",
    },
    {
      title: "Relatórios Fiscais",
      description: "Relatórios específicos para obrigações fiscais.",
      icon: FileBarChart,
      to: "/fiscal-reports",
    }
  ];
  
  const operationalModules = [
    {
      title: "Painel Interativo",
      description: "Dashboard interativo com métricas e indicadores importantes.",
      icon: Gauge,
      to: "/interactive-dashboard",
    },
    {
      title: "Propostas Comerciais",
      description: "Gestão de propostas para clientes e prospects.",
      icon: Handshake,
      to: "/commercial-proposals",
    },
    {
      title: "Compensação Tributária",
      description: "Ferramentas para simulação e gestão de compensações tributárias.",
      icon: Clipboard,
      to: "/tax-compensation",
    },
    {
      title: "Gestão de Auditorias",
      description: "Controle e acompanhamento de processos de auditoria tributária.",
      icon: ShieldCheck,
      to: "/audit-management",
    },
    {
      title: "Operacional",
      description: "Gestão operacional do sistema.",
      icon: Database,
      to: "/operational-dashboard",
    }
  ];
  
  const systemSettingsModules = [
    {
      title: "Segurança & Auditoria",
      description: "Central de segurança e ferramentas de auditoria do sistema.",
      icon: Shield,
      to: "/security-hub",
    },
    {
      title: "Sistema",
      description: "Configurações do sistema e personalização.",
      icon: Globe,
      to: "/site-editor",
    },
    {
      title: "Suporte",
      description: "Acesso ao suporte e documentação.",
      icon: LifeBuoy,
      to: "/support",
    },
    {
      title: "Configurações",
      description: "Acesse as configurações do sistema.",
      icon: Cog,
      to: "/settings/profile",
    },
    {
      title: "Voltar para Home",
      description: "Retornar para a página inicial do site",
      icon: ArrowLeft,
      to: "/",
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants}>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 mb-6 text-white shadow-lg shadow-blue-600/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-10 -mb-10" />
          
          <motion.div 
            className="relative z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              Painel Administrador
              <motion.div 
                className="w-2 h-2 bg-white rounded-full ml-2"
                animate={{ 
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </h1>
            <motion.p 
              className="opacity-90 max-w-2xl text-blue-50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Bem-vindo ao painel de controle do sistema de gestão tributária. Acesse os módulos do sistema através dos cards abaixo.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants}>
          <StatCard 
            title="Total de Clientes" 
            value={15} 
            trend={{ value: 2, isPositive: true }}
            trendLabel="desde o mês passado"
            icon={<Users className="h-5 w-5 text-white" />}
            color="blue"
            iconClassName="bg-gradient-to-br from-blue-500 to-blue-600"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StatCard 
            title="Retenções Identificadas" 
            value="R$ 42.500" 
            trend={{ value: 12.5, isPositive: true }}
            trendLabel="crescimento"
            icon={<Calculator className="h-5 w-5 text-white" />}
            color="purple"
            iconClassName="bg-gradient-to-br from-purple-500 to-purple-600"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StatCard 
            title="Auditorias Realizadas" 
            value={24} 
            trend={{ value: 5, isPositive: true }}
            trendLabel="este mês"
            icon={<ShieldCheck className="h-5 w-5 text-white" />}
            color="emerald"
            iconClassName="bg-gradient-to-br from-emerald-500 to-emerald-600"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StatCard 
            title="Recuperação Projetada" 
            value="R$ 156.300" 
            trend={{ value: 8.2, isPositive: true }}
            trendLabel="do esperado"
            icon={<Lightbulb className="h-5 w-5 text-white" />}
            color="amber"
            iconClassName="bg-gradient-to-br from-amber-500 to-amber-600"
          />
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-none shadow-xl overflow-hidden backdrop-blur-sm bg-white/90 dark:bg-gray-900/80">
          <CardHeader className="pb-4 border-b border-blue-100/50 bg-gradient-to-r from-blue-50 to-indigo-50/50 dark:from-blue-900/30 dark:to-indigo-900/30">
            <CardTitle className="text-2xl text-blue-800 dark:text-blue-300 flex items-center">
              <Layout className="mr-3 h-7 w-7 text-blue-600 dark:text-blue-400" />
              Módulos do Sistema
            </CardTitle>
            <CardDescription className="text-blue-600/80 dark:text-blue-300/80 text-base">
              Gerencie todos os aspectos do sistema através destes módulos
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 pb-8">
            <div className="space-y-8">
              <div>
                <h3 className="text-base font-semibold text-blue-800 dark:text-blue-300 mb-4 border-l-4 border-blue-500 pl-3 flex items-center">
                  <motion.span 
                    animate={{ 
                      opacity: [1, 0.7, 1],
                      scale: [1, 1.02, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity
                    }}
                    className="inline-block mr-2 w-2 h-2 bg-blue-500 rounded-full" 
                  />
                  Principais Módulos
                </h3>
                <ModuleGrid modules={systemModules} />
              </div>
              
              <div>
                <h3 className="text-base font-semibold text-purple-800 dark:text-purple-300 mb-4 border-l-4 border-purple-500 pl-3 flex items-center">
                  <motion.span 
                    animate={{ 
                      opacity: [1, 0.7, 1],
                      scale: [1, 1.02, 1]
                    }}
                    transition={{ 
                      duration: 2.1,
                      repeat: Infinity
                    }}
                    className="inline-block mr-2 w-2 h-2 bg-purple-500 rounded-full" 
                  />
                  Relatórios e Análises
                </h3>
                <ModuleGrid modules={reportModules} />
              </div>
              
              <div>
                <h3 className="text-base font-semibold text-emerald-800 dark:text-emerald-300 mb-4 border-l-4 border-emerald-500 pl-3 flex items-center">
                  <motion.span 
                    animate={{ 
                      opacity: [1, 0.7, 1],
                      scale: [1, 1.02, 1]
                    }}
                    transition={{ 
                      duration: 2.2,
                      repeat: Infinity
                    }}
                    className="inline-block mr-2 w-2 h-2 bg-emerald-500 rounded-full" 
                  />
                  Operações
                </h3>
                <ModuleGrid modules={operationalModules} />
              </div>
              
              <div>
                <h3 className="text-base font-semibold text-amber-800 dark:text-amber-300 mb-4 border-l-4 border-amber-500 pl-3 flex items-center">
                  <motion.span 
                    animate={{ 
                      opacity: [1, 0.7, 1],
                      scale: [1, 1.02, 1]
                    }}
                    transition={{ 
                      duration: 2.3,
                      repeat: Infinity
                    }}
                    className="inline-block mr-2 w-2 h-2 bg-amber-500 rounded-full" 
                  />
                  Sistema e Suporte
                </h3>
                <ModuleGrid modules={systemSettingsModules} />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="lg:col-span-2"
          variants={itemVariants}
        >
          <Card className="border-none shadow-lg overflow-hidden">
            <CardHeader className="pb-3 border-b bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800/50 dark:to-blue-900/30">
              <CardTitle className="text-lg text-blue-800 dark:text-blue-300 flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                Clientes Recentes
              </CardTitle>
              <CardDescription>
                Os últimos clientes adicionados ou atualizados no sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ClientsTable clients={mockClients.slice(0, 5)} />
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
        >
          <Card className="border-none shadow-lg overflow-hidden">
            <CardHeader className="pb-3 border-b bg-gradient-to-r from-slate-50 to-purple-50 dark:from-slate-800/50 dark:to-purple-900/30">
              <CardTitle className="text-lg text-purple-800 dark:text-purple-300 flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-purple-600 dark:text-purple-400" />
                Atividades Recentes
              </CardTitle>
              <CardDescription>
                Últimas ações realizadas no sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ActivityTimeline activities={mockActivities.slice(0, 5)} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
