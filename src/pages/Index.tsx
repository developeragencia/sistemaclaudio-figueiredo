import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { 
  AlertCircle, 
  ArrowUpRight, 
  Building2, 
  FileSearch, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign
} from 'lucide-react';

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

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Button className="flex items-center gap-2">
            Nova Retenção
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Retenções</CardTitle>
              <FileSearch className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.retencoes.total}</div>
              <p className="text-xs text-muted-foreground">
                {dashboardData.retencoes.pendentes} pendentes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Empresas Ativas</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.empresas.ativas}</div>
              <p className="text-xs text-muted-foreground">
                {dashboardData.empresas.consultasHoje} consultas hoje
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Retido</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.valores.totalRetencoes}</div>
              <p className="text-xs text-muted-foreground">
                Média: {dashboardData.valores.mediaRetencoes}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
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
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Status das Retenções</CardTitle>
              <CardDescription>Visão geral do status atual das retenções</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Concluídas</div>
                    <div className="text-2xl font-bold">{dashboardData.retencoes.concluidas}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Pendentes</div>
                    <div className="text-2xl font-bold">{dashboardData.retencoes.pendentes}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Em Atraso</div>
                    <div className="text-2xl font-bold">{dashboardData.retencoes.emAtraso}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Alertas Recentes</CardTitle>
              <CardDescription>Últimas notificações importantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.alertas.map((alerta, index) => (
                  <Alert key={index} variant={
                    alerta.tipo === 'urgente' ? 'destructive' :
                    alerta.tipo === 'importante' ? 'default' : 'secondary'
                  }>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle className="ml-2">
                      {alerta.tipo.charAt(0).toUpperCase() + alerta.tipo.slice(1)}
                    </AlertTitle>
                    <AlertDescription className="ml-6">
                      {alerta.mensagem}
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
