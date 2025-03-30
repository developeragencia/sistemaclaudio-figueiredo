import React from 'react';
import { useRouter } from 'next/router';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useQuery, useMutation } from '@tanstack/react-query';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';
import { Cliente } from '@/types/database.types';
import { maskCNPJ, maskPhone } from '@/lib/masks';

export default function ClienteFormPage() {
  const router = useRouter();
  const { id } = router.query;
  const isEditing = id !== 'novo';

  const [formData, setFormData] = React.useState<Partial<Cliente>>({
    cnpj: '',
    razao_social: '',
    nome_fantasia: '',
    email: '',
    telefone: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: ''
  });

  // Query para buscar dados do cliente em edição
  const { data: cliente } = useQuery<Cliente>({
    queryKey: ['cliente', id],
    queryFn: async () => {
      // Implementar chamada à API
      return {} as Cliente;
    },
    enabled: isEditing
  });

  // Mutation para salvar cliente
  const { mutate: salvarCliente, isPending } = useMutation({
    mutationFn: async (data: Partial<Cliente>) => {
      // Implementar chamada à API
      return {} as Cliente;
    },
    onSuccess: () => {
      toast.success(isEditing ? 'Cliente atualizado com sucesso!' : 'Cliente criado com sucesso!');
      router.push('/admin/clientes');
    },
    onError: (error) => {
      toast.error(`Erro ao ${isEditing ? 'atualizar' : 'criar'} cliente: ${error.message}`);
    }
  });

  // Atualiza o formulário quando carregar os dados do cliente
  React.useEffect(() => {
    if (cliente) {
      setFormData(cliente);
    }
  }, [cliente]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Aplica máscaras
    if (name === 'cnpj') {
      formattedValue = maskCNPJ(value);
    } else if (name === 'telefone') {
      formattedValue = maskPhone(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    salvarCliente(formData);
  };

  const handleVoltar = () => {
    router.push('/admin/clientes');
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
            {isEditing ? 'Editar Cliente' : 'Novo Cliente'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input
                id="cnpj"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleInputChange}
                placeholder="00.000.000/0000-00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="razao_social">Razão Social</Label>
              <Input
                id="razao_social"
                name="razao_social"
                value={formData.razao_social}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nome_fantasia">Nome Fantasia</Label>
              <Input
                id="nome_fantasia"
                name="nome_fantasia"
                value={formData.nome_fantasia}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                placeholder="(00) 00000-0000"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endereco">Endereço</Label>
              <Input
                id="endereco"
                name="endereco"
                value={formData.endereco}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cidade">Cidade</Label>
              <Input
                id="cidade"
                name="cidade"
                value={formData.cidade}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estado">Estado</Label>
              <Input
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cep">CEP</Label>
              <Input
                id="cep"
                name="cep"
                value={formData.cep}
                onChange={handleInputChange}
                required
              />
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