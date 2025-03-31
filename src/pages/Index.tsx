
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import ModuleGrid from '@/components/dashboard/ModuleGrid';
import { 
  AlertCircle, 
  ArrowUpRight, 
  Building2, 
  FileSearch, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  Users,
  BarChart3,
  Settings,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  // Dados mockados para exemplo
  const dashboardData = {
    retencoes: {
      total: 150,
      pendentes: 45,
      emAtraso: 12,
      concluidas: 93
    },
    empresas: {
      total: 85,
      ativas: 72,
      pendentesDocumentacao: 13,
      consultasHoje: 24
    },
    valores: {
      totalRetencoes: 'R$ 256.789,45',
      mediaRetencoes: 'R$ 1.711,93',
      maiorRetencao: 'R$ 15.432,21',
      menorRetencao: 'R$ 156,78'
    },
    alertas: [
      {
        tipo: 'urgente',
        mensagem: 'Existem 12 retenções em atraso que precisam de atenção imediata',
        data: '2024-02-20'
      },
      {
        tipo: 'importante',
        mensagem: '13 empresas com documentação pendente de atualização',
        data: '2024-02-20'
      },
      {
        tipo: 'info',
        mensagem: 'Sistema CNPJ.ws com 98% de disponibilidade no mês atual',
        data: '2024-02-20'
      }
    ]
  };

  // Define modules for the module grid
  const modules = [
    {
      title: 'Empresas',
      description: 'Gerenciar empresas e consultar CNPJ',
      icon: Building2,
      to: '/empresas'
    },
    {
      title: 'Retenções',
      description: 'Gerenciar retenções e impostos',
      icon: FileSearch,
      to: '/retencoes'
    },
    {
      title: 'Relatórios',
      description: 'Visualizar e exportar relatórios',
      icon: BarChart3,
      to: '/relatorios'
    },
    {
      title: 'Clientes',
      description: 'Cadastro e gestão de clientes',
      icon: Users,
      to: '/clientes'
    },
    {
      title: 'Documentos',
      description: 'Gerenciamento de documentos',
      icon: FileText,
      to: '/documentos'
    },
    {
      title: 'Configurações',
      description: 'Ajustes e parâmetros do sistema',
      icon: Settings,
      to: '/configuracoes'
    }
  ];

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-8"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            Nova Retenção
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Module Grid */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Módulos Principais</h2>
          <ModuleGrid modules={modules} />
        </section>

        {/* Stats Cards */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Visão Geral</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" data-test="dashboard-widgets">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              data-test="widget"
            >
              <Card className="overflow-hidden border-t-4 border-t-blue-500 shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Retenções</CardTitle>
                  <FileSearch className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.retencoes.total}</div>
                  <p className="text-xs text-muted-foreground">
                    {dashboardData.retencoes.pendentes} pendentes
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              data-test="widget"
            >
              <Card className="overflow-hidden border-t-4 border-t-green-500 shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Empresas Ativas</CardTitle>
                  <Building2 className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.empresas.ativas}</div>
                  <p className="text-xs text-muted-foreground">
                    {dashboardData.empresas.consultasHoje} consultas hoje
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              data-test="widget"
            >
              <Card className="overflow-hidden border-t-4 border-t-purple-500 shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Retido</CardTitle>
                  <DollarSign className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.valores.totalRetencoes}</div>
                  <p className="text-xs text-muted-foreground">
                    Média: {dashboardData.valores.mediaRetencoes}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              data-test="widget"
            >
              <Card className="overflow-hidden border-t-4 border-t-amber-500 shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-amber-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round((dashboardData.retencoes.concluidas / dashboardData.retencoes.total) * 100)}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {dashboardData.retencoes.concluidas} concluídas
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Status and Alerts */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Status das Retenções</CardTitle>
              <CardDescription>Visão geral do status atual das retenções</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Concluídas</div>
                    <div className="text-2xl font-bold">{dashboardData.retencoes.concluidas}</div>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Pendentes</div>
                    <div className="text-2xl font-bold">{dashboardData.retencoes.pendentes}</div>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Em Atraso</div>
                    <div className="text-2xl font-bold">{dashboardData.retencoes.emAtraso}</div>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3 shadow-md hover:shadow-lg transition-all duration-300" data-test="alerts-widget">
            <CardHeader>
              <CardTitle>Alertas Recentes</CardTitle>
              <CardDescription>Últimas notificações importantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.alertas.map((alerta, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Alert variant={
                      alerta.tipo === 'urgente' ? 'destructive' :
                      alerta.tipo === 'importante' ? 'default' : 'default'
                    }>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle className="ml-2">
                        {alerta.tipo.charAt(0).toUpperCase() + alerta.tipo.slice(1)}
                      </AlertTitle>
                      <AlertDescription className="ml-6">
                        {alerta.mensagem}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </Layout>
  );
}
