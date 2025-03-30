import React from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { Cliente } from '@/types/database.types';

export default function ClientesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState('');

  // Query para buscar clientes
  const { data: clientes, isLoading } = useQuery<Cliente[]>({
    queryKey: ['clientes', searchTerm],
    queryFn: async () => {
      // Implementar chamada à API
      return [];
    }
  });

  const handleNovoCliente = () => {
    router.push('/admin/clientes/novo');
  };

  const handleEditarCliente = (id: string) => {
    router.push(`/admin/clientes/${id}`);
  };

  const handleExcluirCliente = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return;
    
    try {
      // Implementar chamada à API para excluir
      alert('Cliente excluído com sucesso!');
    } catch (error) {
      alert('Erro ao excluir cliente');
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Clientes</h1>
          <Button onClick={handleNovoCliente}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar clientes..."
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
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : clientes?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    Nenhum cliente encontrado
                  </TableCell>
                </TableRow>
              ) : (
                clientes?.map((cliente) => (
                  <TableRow key={cliente.id}>
                    <TableCell>{cliente.id}</TableCell>
                    <TableCell>{cliente.cnpj}</TableCell>
                    <TableCell>{cliente.razao_social}</TableCell>
                    <TableCell>{cliente.nome_fantasia}</TableCell>
                    <TableCell>{cliente.email}</TableCell>
                    <TableCell>{cliente.telefone}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditarCliente(cliente.id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleExcluirCliente(cliente.id)}
                        >
                          <Trash2 className="h-4 w-4" />
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