
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import StatCard from '../components/dashboard/StatCard';
import ClientsTable from '../components/dashboard/ClientsTable';
import ActivityTimeline from '../components/dashboard/ActivityTimeline';
import { Users, FileText, CreditCard, BarChart2, TrendingUp, TrendingDown, ChevronRight, Clock, Info, ShieldCheck, Search } from 'lucide-react';
import { Client, Activity, DashboardStats } from '../types';
import { getClients, getActivities, getDashboardStats } from '../services/mockData';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Dashboard: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("month");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [clientsData, activitiesData, statsData] = await Promise.all([
          getClients(),
          getActivities(),
          getDashboardStats()
        ]);
        
        setClients(clientsData);
        setActivities(activitiesData);
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-3"></div>
          <p className="text-muted-foreground">Carregando dados...</p>
        </div>
      </div>
    );
  }
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  const cardColors = [
    "from-blue-50 to-blue-100 border-blue-200",
    "from-green-50 to-green-100 border-green-200",
    "from-yellow-50 to-yellow-100 border-yellow-200",
    "from-purple-50 to-purple-100 border-purple-200",
  ];

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-lawyer-800 to-lawyer-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Visão geral do sistema de recuperação de créditos tributários
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex items-center space-x-2">
          <Button
            variant={selectedPeriod === "week" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod("week")}
          >
            Semana
          </Button>
          <Button
            variant={selectedPeriod === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod("month")}
          >
            Mês
          </Button>
          <Button
            variant={selectedPeriod === "year" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod("year")}
          >
            Ano
          </Button>
        </motion.div>
      </div>
      
      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de Clientes"
          value={stats?.totalClients || 0}
          icon={<Users className="w-5 h-5 text-blue-700" />}
          trend={{ value: 12, isPositive: true }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-blue-200/50"
          iconClassName="bg-blue-100"
        />
        
        <StatCard
          title="Clientes Ativos"
          value={stats?.activeClients || 0}
          icon={<Users className="w-5 h-5 text-green-700" />}
          trend={{ value: 8, isPositive: true }}
          className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-green-200/50"
          iconClassName="bg-green-100"
        />
        
        <StatCard
          title="Propostas Pendentes"
          value={stats?.pendingProposals || 0}
          icon={<FileText className="w-5 h-5 text-yellow-700" />}
          trend={{ value: 5, isPositive: false }}
          className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 hover:shadow-yellow-200/50"
          iconClassName="bg-yellow-100"
        />
        
        <StatCard
          title="Total de Créditos (R$)"
          value={stats?.totalCredits || 0}
          icon={<CreditCard className="w-5 h-5 text-purple-700" />}
          trend={{ value: 24, isPositive: true }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-purple-200/50"
          iconClassName="bg-purple-100"
        />
      </motion.div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Clients */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="overflow-hidden border transition-all hover:shadow-lg">
            <CardHeader className="bg-gradient-to-r from-background to-muted/50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Clientes Recentes</CardTitle>
                  <CardDescription>Os clientes mais recentes cadastrados no sistema</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="text-xs">
                  Ver todos
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ClientsTable clients={clients.slice(0, 3)} />
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Activities */}
        <motion.div variants={itemVariants}>
          <Card className="border transition-all hover:shadow-lg">
            <CardHeader className="bg-gradient-to-r from-background to-muted/50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Atividades</CardTitle>
                  <CardDescription>Atividades recentes no sistema</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Clock className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ActivityTimeline activities={activities.slice(0, 5)} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Bottom section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Credits Recovery */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="overflow-hidden border transition-all hover:shadow-lg">
            <CardHeader className="bg-gradient-to-r from-background to-muted/50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recuperação de Créditos</CardTitle>
                  <CardDescription>Últimos 6 meses</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                    <span className="text-xs text-muted-foreground">Identificados</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                    <span className="text-xs text-muted-foreground">Recuperados</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-64 flex items-center justify-center">
                <div className="flex flex-col items-center text-center">
                  <BarChart2 className="w-12 h-12 text-gray-300 mb-4" />
                  <p className="text-gray-500">Gráficos de créditos recuperados serão exibidos aqui</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Quick Stats */}
        <motion.div variants={itemVariants}>
          <Card className="border transition-all hover:shadow-lg">
            <CardHeader className="bg-gradient-to-r from-background to-muted/50">
              <CardTitle>Indicadores Rápidos</CardTitle>
              <CardDescription>Desempenho atual</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-blue-100 mr-3">
                    <TrendingUp className="h-4 w-4 text-blue-800" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Taxa de conversão</p>
                    <p className="text-xs text-muted-foreground">De propostas para contratos</p>
                  </div>
                </div>
                <p className="text-lg font-bold text-blue-800">68%</p>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-green-100 mr-3">
                    <ShieldCheck className="h-4 w-4 text-green-800" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Credibilidade</p>
                    <p className="text-xs text-muted-foreground">Índice de aprovação fiscal</p>
                  </div>
                </div>
                <p className="text-lg font-bold text-green-800">94%</p>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-yellow-100 mr-3">
                    <Clock className="h-4 w-4 text-yellow-800" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Tempo médio</p>
                    <p className="text-xs text-muted-foreground">Conclusão de processos</p>
                  </div>
                </div>
                <p className="text-lg font-bold text-yellow-800">42 dias</p>
              </div>
              
              <Button variant="outline" className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Analisar detalhes
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Tips Section */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-muted/50 to-background p-4 rounded-lg border">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
            <Info className="h-6 w-6 text-blue-800" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">Dicas para otimizar seu fluxo de trabalho</h3>
            <p className="text-muted-foreground">
              Configure alertas personalizados para ser notificado automaticamente quando novos créditos forem identificados para seus clientes,
              aumentando a eficiência do processo de recuperação.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
