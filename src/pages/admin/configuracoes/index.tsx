import React from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

interface ConfiguracaoSistema {
  api_key_cnpjws: string;
  notificacoes_email: boolean;
  email_notificacoes: string;
  limite_consultas_diarias: number;
  dias_retencao_cache: number;
  valor_minimo_retencao: number;
}

export default function ConfiguracoesPage() {
  const [formData, setFormData] = React.useState<ConfiguracaoSistema>({
    api_key_cnpjws: '',
    notificacoes_email: false,
    email_notificacoes: '',
    limite_consultas_diarias: 100,
    dias_retencao_cache: 30,
    valor_minimo_retencao: 666.66
  });

  // Query para buscar configurações
  const { data: configuracoes } = useQuery<ConfiguracaoSistema>({
    queryKey: ['configuracoes'],
    queryFn: async () => {
      // Implementar chamada à API
      return {} as ConfiguracaoSistema;
    }
  });

  // Mutation para salvar configurações
  const { mutate: salvarConfiguracoes, isPending } = useMutation({
    mutationFn: async (data: ConfiguracaoSistema) => {
      // Implementar chamada à API
      return {} as ConfiguracaoSistema;
    },
    onSuccess: () => {
      toast.success('Configurações salvas com sucesso!');
    },
    onError: (error) => {
      toast.error(`Erro ao salvar configurações: ${error.message}`);
    }
  });

  // Atualiza o formulário quando carregar as configurações
  React.useEffect(() => {
    if (configuracoes) {
      setFormData(configuracoes);
    }
  }, [configuracoes]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      notificacoes_email: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    salvarConfiguracoes(formData);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Configurações</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integração CNPJ.ws</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api_key_cnpjws">API Key</Label>
                <Input
                  id="api_key_cnpjws"
                  name="api_key_cnpjws"
                  type="password"
                  value={formData.api_key_cnpjws}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="limite_consultas_diarias">Limite de Consultas Diárias</Label>
                <Input
                  id="limite_consultas_diarias"
                  name="limite_consultas_diarias"
                  type="number"
                  value={formData.limite_consultas_diarias}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dias_retencao_cache">Dias de Retenção em Cache</Label>
                <Input
                  id="dias_retencao_cache"
                  name="dias_retencao_cache"
                  type="number"
                  value={formData.dias_retencao_cache}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notificacoes_email">Notificações por Email</Label>
                <Switch
                  id="notificacoes_email"
                  checked={formData.notificacoes_email}
                  onCheckedChange={handleSwitchChange}
                />
              </div>

              {formData.notificacoes_email && (
                <div className="space-y-2">
                  <Label htmlFor="email_notificacoes">Email para Notificações</Label>
                  <Input
                    id="email_notificacoes"
                    name="email_notificacoes"
                    type="email"
                    value={formData.email_notificacoes}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Retenções</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="valor_minimo_retencao">Valor Mínimo para Retenção</Label>
                <Input
                  id="valor_minimo_retencao"
                  name="valor_minimo_retencao"
                  type="number"
                  step="0.01"
                  value={formData.valor_minimo_retencao}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              <Save className="h-4 w-4 mr-2" />
              {isPending ? 'Salvando...' : 'Salvar Configurações'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
} 