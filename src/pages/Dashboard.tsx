
import React from 'react';
import StatCard from '@/components/dashboard/StatCard';
import ActivityTimeline from '@/components/dashboard/ActivityTimeline';
import ClientsTable from '@/components/dashboard/ClientsTable';
import ModuleGrid from '@/components/dashboard/ModuleGrid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calculator, FileText, ShieldCheck, Lightbulb, BarChart3, Receipt, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { Activity, Client } from '@/types';

// Mock data for clients
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

// Mock data for activities
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
  const mainModules = [
    {
      title: "Gestão de Clientes",
      description: "Gerencie todos os dados de clientes, contratos e histórico de interações.",
      icon: Users,
      to: "/clients-management"
    },
    {
      title: "Cálculos e Recuperação",
      description: "Ferramentas para cálculos de IRRF e identificação de créditos tributários.",
      icon: Calculator,
      to: "/irrf-calculations"
    },
    {
      title: "Auditoria Tributária",
      description: "Análise detalhada das obrigações fiscais e identificação de oportunidades.",
      icon: ShieldCheck,
      to: "/tax-audit"
    },
    {
      title: "Relatórios",
      description: "Relatórios personalizados e dashboards com métricas importantes.",
      icon: FileText,
      to: "/reports"
    },
    {
      title: "Gestão de Fornecedores",
      description: "Organize e monitore todos os fornecedores e prestadores de serviços.",
      icon: Receipt,
      to: "/suppliers-management"
    },
    {
      title: "Gestão de Pagamentos",
      description: "Controle e auditoria de todos os pagamentos e retenções tributárias.",
      icon: CreditCard,
      to: "/payments-management"
    }
  ];

  // Animation variants
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
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 mb-6 text-white shadow-lg shadow-blue-600/10">
          <motion.h1 
            className="text-3xl font-bold mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Dashboard
          </motion.h1>
          <motion.p 
            className="opacity-90 max-w-2xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Bem-vindo ao painel de controle do sistema de gestão tributária. Visualize dados importantes, acesse módulos e acompanhe as atividades recentes.
          </motion.p>
        </div>
      </motion.div>

      {/* Stats Row */}
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

      {/* Main Modules Section */}
      <motion.div variants={itemVariants}>
        <Card className="border-none shadow-lg overflow-hidden bg-gradient-to-br from-white to-blue-50">
          <CardHeader className="pb-3 border-b">
            <CardTitle className="text-lg text-blue-800 flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-blue-600" />
              Módulos Principais
            </CardTitle>
            <CardDescription>
              Acesse as principais funcionalidades do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ModuleGrid modules={mainModules} />
          </CardContent>
        </Card>
      </motion.div>

      {/* Clients & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="lg:col-span-2"
          variants={itemVariants}
        >
          <Card className="border-none shadow-lg overflow-hidden">
            <CardHeader className="pb-3 border-b bg-gradient-to-r from-slate-50 to-blue-50">
              <CardTitle className="text-lg text-blue-800 flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-600" />
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
            <CardHeader className="pb-3 border-b bg-gradient-to-r from-slate-50 to-purple-50">
              <CardTitle className="text-lg text-purple-800 flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-purple-600" />
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
