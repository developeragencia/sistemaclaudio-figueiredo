import React from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useQuery } from '@tanstack/react-query';
import { Download } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

// Dados simulados para os gráficos
const dadosPagamentosPorMes = [
  { mes: 'Jan', valor: 4000 },
  { mes: 'Fev', valor: 3000 },
  { mes: 'Mar', valor: 2000 },
  { mes: 'Abr', valor: 2780 },
  { mes: 'Mai', valor: 1890 },
  { mes: 'Jun', valor: 2390 },
];

const dadosRetencoesPorTipo = [
  { tipo: 'IR', valor: 1500 },
  { tipo: 'PIS', valor: 800 },
  { tipo: 'COFINS', valor: 2500 },
  { tipo: 'CSLL', valor: 1200 },
  { tipo: 'ISS', valor: 1800 },
];

const CORES = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function RelatoriosPage() {
  const [periodo, setPeriodo] = React.useState('ultimos_6_meses');
  const [tipoRelatorio, setTipoRelatorio] = React.useState('pagamentos');

  // Query para buscar dados dos relatórios
  const { data: relatorios, isLoading } = useQuery({
    queryKey: ['relatorios', periodo, tipoRelatorio],
    queryFn: async () => {
      // Implementar chamada à API
      return {
        totalPagamentos: 1250000,
        totalRetencoes: 187500,
        mediaMensal: 208333.33,
        quantidadePagamentos: 450
      };
    }
  });

  const handleExportarPDF = () => {
    // Implementar exportação para PDF
    alert('Exportando para PDF...');
  };

  const handleExportarExcel = () => {
    // Implementar exportação para Excel
    alert('Exportando para Excel...');
  };

  return (
    <AdminLayout>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Relatórios</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportarPDF}>
              <Download className="h-4 w-4 mr-2" />
              Exportar PDF
            </Button>
            <Button variant="outline" onClick={handleExportarExcel}>
              <Download className="h-4 w-4 mr-2" />
              Exportar Excel
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <Label>Período</Label>
            <Select value={periodo} onValueChange={setPeriodo}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ultimos_6_meses">Últimos 6 meses</SelectItem>
                <SelectItem value="ultimo_ano">Último ano</SelectItem>
                <SelectItem value="ano_atual">Ano atual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tipo de Relatório</Label>
            <Select value={tipoRelatorio} onValueChange={setTipoRelatorio}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pagamentos">Pagamentos</SelectItem>
                <SelectItem value="retencoes">Retenções</SelectItem>
                <SelectItem value="fornecedores">Fornecedores</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Pagamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(relatorios?.totalPagamentos || 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Retenções</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(relatorios?.totalRetencoes || 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Média Mensal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(relatorios?.mediaMensal || 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quantidade de Pagamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {relatorios?.quantidadePagamentos || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Pagamentos por Mês</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dadosPagamentosPorMes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="valor" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Retenções por Tipo</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dadosRetencoesPorTipo}
                    dataKey="valor"
                    nameKey="tipo"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {dadosRetencoesPorTipo.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
} 