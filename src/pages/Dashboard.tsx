
import React from 'react';
import StatCard from '@/components/dashboard/StatCard';
import ActivityTimeline from '@/components/dashboard/ActivityTimeline';
import ClientsTable from '@/components/dashboard/ClientsTable';
import ModuleGrid from '@/components/dashboard/ModuleGrid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calculator, FileText, ShieldCheck, Lightbulb, BarChart3, Receipt, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

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
          trend={+2}
          trendLabel="desde o mês passado"
          icon={<Users className="h-5 w-5 text-blue-600" />}
          color="blue"
        />
        <StatCard 
          title="Retenções Identificadas" 
          value="R$ 42.500" 
          trend={+12.5}
          trendLabel="crescimento"
          icon={<Calculator className="h-5 w-5 text-purple-600" />}
          color="purple"
        />
        <StatCard 
          title="Auditorias Realizadas" 
          value={24} 
          trend={+5}
          trendLabel="este mês"
          icon={<ShieldCheck className="h-5 w-5 text-emerald-600" />}
          color="emerald"
        />
        <StatCard 
          title="Recuperação Projetada" 
          value="R$ 156.300" 
          trend={+8.2}
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
            <ClientsTable limit={5} />
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
            <ActivityTimeline limit={5} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
