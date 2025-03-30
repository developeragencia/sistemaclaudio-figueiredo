
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

  return (
    <div className="space-y-6">
      <div>
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-sky-800 mb-1"
        >
          Dashboard
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted-foreground mb-6"
        >
          Bem-vindo ao painel de controle do sistema de gestão tributária.
        </motion.p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total de Clientes" 
          value={15} 
          trend={{ value: 2, isPositive: true }}
          trendLabel="desde o mês passado"
          icon={<Users className="h-5 w-5 text-blue-600" />}
          color="blue"
        />
        <StatCard 
          title="Retenções Identificadas" 
          value="R$ 42.500" 
          trend={{ value: 12.5, isPositive: true }}
          trendLabel="crescimento"
          icon={<Calculator className="h-5 w-5 text-purple-600" />}
          color="purple"
        />
        <StatCard 
          title="Auditorias Realizadas" 
          value={24} 
          trend={{ value: 5, isPositive: true }}
          trendLabel="este mês"
          icon={<ShieldCheck className="h-5 w-5 text-emerald-600" />}
          color="emerald"
        />
        <StatCard 
          title="Recuperação Projetada" 
          value="R$ 156.300" 
          trend={{ value: 8.2, isPositive: true }}
          trendLabel="do esperado"
          icon={<Lightbulb className="h-5 w-5 text-amber-600" />}
          color="amber"
        />
      </div>

      {/* Main Modules Section */}
      <Card className="border-none shadow-md bg-gradient-to-br from-white to-slate-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-sky-800">Módulos Principais</CardTitle>
          <CardDescription>
            Acesse as principais funcionalidades do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ModuleGrid modules={mainModules} />
        </CardContent>
      </Card>

      {/* Clients & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-sky-800">Clientes Recentes</CardTitle>
            <CardDescription>
              Os últimos clientes adicionados ou atualizados no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ClientsTable clients={mockClients.slice(0, 5)} />
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-sky-800">Atividades Recentes</CardTitle>
            <CardDescription>
              Últimas ações realizadas no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityTimeline activities={mockActivities.slice(0, 5)} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
