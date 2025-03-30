import React from 'react';
import { useRouter } from 'next/router';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery, useMutation } from '@tanstack/react-query';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';
import { Pagamento, Cliente, Fornecedor } from '@/types/database.types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function PagamentoFormPage() {
  const router = useRouter();
  const { id } = router.query;
  const isEditing = id !== 'novo';

  const [formData, setFormData] = React.useState<Partial<Pagamento>>({
    data_pagamento: format(new Date(), 'yyyy-MM-dd'),
    fornecedor_id: '',
    cliente_id: '',
    numero_nota: '',
    valor: '',
    tipo_servico: '',
    status: 'pendente'
  });

  // Query para buscar dados do pagamento em edição
  const { data: pagamento } = useQuery<Pagamento>({
    queryKey: ['pagamento', id],
    queryFn: async () => {
      // Implementar chamada à API
      return {} as Pagamento;
    },
    enabled: isEditing
  });

  // Query para buscar clientes
  const { data: clientes } = useQuery<Cliente[]>({
    queryKey: ['clientes'],
    queryFn: async () => {
      // Implementar chamada à API
      return [];
    }
  });

  // Query para buscar fornecedores
  const { data: fornecedores } = useQuery<Fornecedor[]>({
    queryKey: ['fornecedores'],
    queryFn: async () => {
      // Implementar chamada à API
      return [];
    }
  });

  // Mutation para salvar pagamento
  const { mutate: salvarPagamento, isPending } = useMutation({
    mutationFn: async (data: Partial<Pagamento>) => {
      // Implementar chamada à API
      return {} as Pagamento;
    },
    onSuccess: () => {
      toast.success(isEditing ? 'Pagamento atualizado com sucesso!' : 'Pagamento criado com sucesso!');
      router.push('/admin/pagamentos');
    },
    onError: (error) => {
      toast.error(`Erro ao ${isEditing ? 'atualizar' : 'criar'} pagamento: ${error.message}`);
    }
  });

  // Atualiza o formulário quando carregar os dados do pagamento
  React.useEffect(() => {
    if (pagamento) {
      setFormData({
        ...pagamento,
        data_pagamento: format(new Date(pagamento.data_pagamento), 'yyyy-MM-dd'),
        valor: pagamento.valor.toString()
      });
    }
  }, [pagamento]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    salvarPagamento({
      ...formData,
      valor: parseFloat(formData.valor || '0')
    });
  };

  const handleVoltar = () => {
    router.push('/admin/pagamentos');
  };

  return (
    <AdminLayout>
      <div className="container mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={handleVoltar}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold">
            {isEditing ? 'Editar Pagamento' : 'Novo Pagamento'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="data_pagamento">Data do Pagamento</Label>
              <Input
                id="data_pagamento"
                name="data_pagamento"
                type="date"
                value={formData.data_pagamento}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fornecedor_id">Fornecedor</Label>
              <Select
                value={formData.fornecedor_id}
                onValueChange={(value) => handleSelectChange('fornecedor_id', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um fornecedor" />
                </SelectTrigger>
                <SelectContent>
                  {fornecedores?.map((fornecedor) => (
                    <SelectItem key={fornecedor.id} value={fornecedor.id}>
                      {fornecedor.razao_social}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cliente_id">Cliente</Label>
              <Select
                value={formData.cliente_id}
                onValueChange={(value) => handleSelectChange('cliente_id', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clientes?.map((cliente) => (
                    <SelectItem key={cliente.id} value={cliente.id}>
                      {cliente.razao_social}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="numero_nota">Número da Nota</Label>
              <Input
                id="numero_nota"
                name="numero_nota"
                value={formData.numero_nota}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="valor">Valor</Label>
              <Input
                id="valor"
                name="valor"
                type="number"
                step="0.01"
                value={formData.valor}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo_servico">Tipo de Serviço</Label>
              <Input
                id="tipo_servico"
                name="tipo_servico"
                value={formData.tipo_servico}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="pago">Pago</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={handleVoltar}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              <Save className="h-4 w-4 mr-2" />
              {isPending ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
} 