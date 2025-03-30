import React from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Pencil, Trash2, FileText } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { Pagamento } from '@/types/database.types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function PagamentosPage() {
  const router = useRouter();
  const { fornecedor } = router.query;
  const [searchTerm, setSearchTerm] = React.useState('');

  // Query para buscar pagamentos
  const { data: pagamentos, isLoading } = useQuery<Pagamento[]>({
    queryKey: ['pagamentos', searchTerm, fornecedor],
    queryFn: async () => {
      // Implementar chamada à API
      return [];
    }
  });

  const handleNovoPagamento = () => {
    router.push('/admin/pagamentos/novo');
  };

  const handleEditarPagamento = (id: string) => {
    router.push(`/admin/pagamentos/${id}`);
  };

  const handleExcluirPagamento = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este pagamento?')) return;
    
    try {
      // Implementar chamada à API para excluir
      alert('Pagamento excluído com sucesso!');
    } catch (error) {
      alert('Erro ao excluir pagamento');
    }
  };

  const handleVerAuditoria = (id: string) => {
    router.push(`/admin/auditoria?pagamento=${id}`);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Pagamentos</h1>
          <Button onClick={handleNovoPagamento}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Pagamento
          </Button>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar pagamentos..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Nota Fiscal</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Tipo de Serviço</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : pagamentos?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    Nenhum pagamento encontrado
                  </TableCell>
                </TableRow>
              ) : (
                pagamentos?.map((pagamento) => (
                  <TableRow key={pagamento.id}>
                    <TableCell>{pagamento.id}</TableCell>
                    <TableCell>
                      {format(new Date(pagamento.data_pagamento), 'dd/MM/yyyy', { locale: ptBR })}
                    </TableCell>
                    <TableCell>{pagamento.fornecedor.razao_social}</TableCell>
                    <TableCell>{pagamento.cliente.razao_social}</TableCell>
                    <TableCell>{pagamento.numero_nota}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(pagamento.valor)}
                    </TableCell>
                    <TableCell>{pagamento.tipo_servico}</TableCell>
                    <TableCell>{pagamento.status}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditarPagamento(pagamento.id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleExcluirPagamento(pagamento.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleVerAuditoria(pagamento.id)}
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
} 