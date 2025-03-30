import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuditoriaService } from '@/services/auditoria.service';
import { AuditoriaTable } from '@/components/AuditoriaTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export function AuditoriaPage() {
  const [clienteId, setClienteId] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  const { data: auditorias, refetch } = useQuery({
    queryKey: ['auditorias', clienteId],
    queryFn: async () => {
      if (!clienteId) return [];
      setIsProcessing(true);
      try {
        const service = AuditoriaService.getInstance();
        const result = await service.processarPagamentosCliente(clienteId);
        toast.success('Auditoria processada com sucesso!');
        return result;
      } catch (error) {
        toast.error(`Erro ao processar auditoria: ${error.message}`);
        return [];
      } finally {
        setIsProcessing(false);
      }
    },
    enabled: false
  });

  const handleProcessar = () => {
    if (!clienteId) {
      toast.error('Por favor, informe o ID do cliente');
      return;
    }
    refetch();
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Auditoria de Retenções</h1>
      
      <div className="flex gap-4 mb-8">
        <div className="flex-1">
          <Label htmlFor="clienteId">ID do Cliente</Label>
          <Input
            id="clienteId"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            placeholder="Digite o ID do cliente"
          />
        </div>
        <div className="flex items-end">
          <Button
            onClick={handleProcessar}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processando...' : 'Processar Auditoria'}
          </Button>
        </div>
      </div>

      {auditorias?.length > 0 && (
        <AuditoriaTable auditorias={auditorias} />
      )}

      {auditorias?.length === 0 && !isProcessing && (
        <div className="text-center text-gray-500">
          Nenhum resultado encontrado
        </div>
      )}
    </div>
  );
} 