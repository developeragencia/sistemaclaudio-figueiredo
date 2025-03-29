
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '../components/dashboard/StatCard';
import ClientsTable from '../components/dashboard/ClientsTable';
import ActivityTimeline from '../components/dashboard/ActivityTimeline';
import { Users, FileText, CreditCard, BarChart2 } from 'lucide-react';
import { Client, Activity, DashboardStats } from '../types';
import { getClients, getActivities, getDashboardStats } from '../services/mockData';

const Dashboard: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Visão geral do sistema de recuperação de créditos tributários</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de Clientes"
          value={stats?.totalClients || 0}
          icon={<Users className="w-5 h-5 text-taxBlue-800" />}
          trend={{ value: 12, isPositive: true }}
        />
        
        <StatCard
          title="Clientes Ativos"
          value={stats?.activeClients || 0}
          icon={<Users className="w-5 h-5 text-taxBlue-800" />}
          trend={{ value: 8, isPositive: true }}
        />
        
        <StatCard
          title="Propostas Pendentes"
          value={stats?.pendingProposals || 0}
          icon={<FileText className="w-5 h-5 text-taxBlue-800" />}
          trend={{ value: 5, isPositive: false }}
        />
        
        <StatCard
          title="Total de Créditos (R$)"
          value={stats?.totalCredits || 0}
          icon={<CreditCard className="w-5 h-5 text-taxBlue-800" />}
          trend={{ value: 24, isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Clientes Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <ClientsTable clients={clients.slice(0, 3)} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Atividades</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityTimeline activities={activities.slice(0, 5)} />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recuperação de Créditos - Últimos 6 Meses</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <BarChart2 className="w-12 h-12 text-gray-300 mb-4" />
            <p className="text-gray-500">Gráficos de créditos recuperados serão exibidos aqui</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
