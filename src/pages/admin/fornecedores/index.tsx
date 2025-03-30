import React from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Pencil, Trash2, FileText } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { Fornecedor } from '@/types/database.types';

export default function FornecedoresPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState('');

  // Query para buscar fornecedores
  const { data: fornecedores, isLoading } = useQuery<Fornecedor[]>({
    queryKey: ['fornecedores', searchTerm],
    queryFn: async () => {
      // Implementar chamada à API
      return [];
    }
  });

  const handleNovoFornecedor = () => {
    router.push('/admin/fornecedores/novo');
  };

  const handleEditarFornecedor = (id: string) => {
    router.push(`/admin/fornecedores/${id}`);
  };

  const handleExcluirFornecedor = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este fornecedor?')) return;
    
    try {
      // Implementar chamada à API para excluir
      alert('Fornecedor excluído com sucesso!');
    } catch (error) {
      alert('Erro ao excluir fornecedor');
    }
  };

  const handleVerPagamentos = (id: string) => {
    router.push(`/admin/pagamentos?fornecedor=${id}`);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Fornecedores</h1>
          <Button onClick={handleNovoFornecedor}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Fornecedor
          </Button>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar fornecedores..."
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
                <TableHead>CNPJ</TableHead>
                <TableHead>Razão Social</TableHead>
                <TableHead>Nome Fantasia</TableHead>
                <TableHead>Atividade Principal</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : fornecedores?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    Nenhum fornecedor encontrado
                  </TableCell>
                </TableRow>
              ) : (
                fornecedores?.map((fornecedor) => (
                  <TableRow key={fornecedor.id}>
                    <TableCell>{fornecedor.id}</TableCell>
                    <TableCell>{fornecedor.cnpj}</TableCell>
                    <TableCell>{fornecedor.razao_social}</TableCell>
                    <TableCell>{fornecedor.nome_fantasia}</TableCell>
                    <TableCell>{fornecedor.atividade_principal}</TableCell>
                    <TableCell>{fornecedor.email}</TableCell>
                    <TableCell>{fornecedor.telefone}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditarFornecedor(fornecedor.id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleExcluirFornecedor(fornecedor.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleVerPagamentos(fornecedor.id)}
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