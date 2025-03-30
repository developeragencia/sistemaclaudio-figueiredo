import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuditoriaService } from '@/services/auditoria.service';
import { AuditoriaTable } from '@/components/AuditoriaTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export function AuditoriaPage() {
  const [clienteId, setClienteId] = React.useState('');
  const [dataInicio, setDataInicio] = React.useState<Date>();
  const [dataFim, setDataFim] = React.useState<Date>();
  const [fornecedorId, setFornecedorId] = React.useState('');
  const [tipoServico, setTipoServico] = React.useState('');
  const [valorMinimo, setValorMinimo] = React.useState('');
  const [valorMaximo, setValorMaximo] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  // Busca fornecedores
  const { data: fornecedores } = useQuery({
    queryKey: ['fornecedores', clienteId],
    queryFn: async () => {
      if (!clienteId) return [];
      const service = AuditoriaService.getInstance();
      return await service.buscarFornecedores(clienteId);
    },
    enabled: !!clienteId
  });

  // Busca tipos de serviço
  const { data: tiposServico } = useQuery({
    queryKey: ['tiposServico', clienteId],
    queryFn: async () => {
      if (!clienteId) return [];
      const service = AuditoriaService.getInstance();
      return await service.buscarTiposServico(clienteId);
    },
    enabled: !!clienteId
  });

  // Busca auditoria
  const { data: resultadoAuditoria, refetch } = useQuery({
    queryKey: ['auditorias', clienteId, dataInicio, dataFim, fornecedorId, tipoServico, valorMinimo, valorMaximo],
    queryFn: async () => {
      if (!clienteId) return null;
      setIsProcessing(true);
      try {
        const service = AuditoriaService.getInstance();
        const result = await service.processarPagamentosCliente(clienteId, {
          dataInicio: dataInicio ? format(dataInicio, 'yyyy-MM-dd') : undefined,
          dataFim: dataFim ? format(dataFim, 'yyyy-MM-dd') : undefined,
          fornecedorId: fornecedorId || undefined,
          tipoServico: tipoServico || undefined,
          valorMinimo: valorMinimo ? parseFloat(valorMinimo) : undefined,
          valorMaximo: valorMaximo ? parseFloat(valorMaximo) : undefined,
        });
        toast.success('Auditoria processada com sucesso!');
        return result;
      } catch (error) {
        toast.error(`Erro ao processar auditoria: ${error.message}`);
        return null;
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

  const handleLimparFiltros = () => {
    setDataInicio(undefined);
    setDataFim(undefined);
    setFornecedorId('');
    setTipoServico('');
    setValorMinimo('');
    setValorMaximo('');
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Auditoria de Retenções</h1>
      
      <div className="grid gap-6 mb-8">
        <div className="flex gap-4">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label>Data Início</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dataInicio && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dataInicio ? format(dataInicio, 'dd/MM/yyyy') : 'Selecione uma data'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dataInicio}
                  onSelect={setDataInicio}
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>Data Fim</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dataFim && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dataFim ? format(dataFim, 'dd/MM/yyyy') : 'Selecione uma data'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dataFim}
                  onSelect={setDataFim}
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>Fornecedor</Label>
            <Select value={fornecedorId} onValueChange={setFornecedorId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um fornecedor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                {fornecedores?.map((fornecedor) => (
                  <SelectItem key={fornecedor.id} value={fornecedor.id}>
                    {fornecedor.razao_social}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Tipo de Serviço</Label>
            <Select value={tipoServico} onValueChange={setTipoServico}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                {tiposServico?.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>
                    {tipo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="valorMinimo">Valor Mínimo</Label>
            <Input
              id="valorMinimo"
              type="number"
              value={valorMinimo}
              onChange={(e) => setValorMinimo(e.target.value)}
              placeholder="Digite o valor mínimo"
            />
          </div>

          <div>
            <Label htmlFor="valorMaximo">Valor Máximo</Label>
            <Input
              id="valorMaximo"
              type="number"
              value={valorMaximo}
              onChange={(e) => setValorMaximo(e.target.value)}
              placeholder="Digite o valor máximo"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={handleLimparFiltros}
            className="mr-2"
          >
            Limpar Filtros
          </Button>
          <Button
            onClick={handleProcessar}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processando...' : 'Atualizar'}
          </Button>
        </div>
      </div>

      {resultadoAuditoria?.auditorias.length > 0 && (
        <AuditoriaTable
          auditorias={resultadoAuditoria.auditorias}
          fornecedores={resultadoAuditoria.fornecedores}
          pagamentos={resultadoAuditoria.pagamentos}
        />
      )}

      {(!resultadoAuditoria?.auditorias.length && !isProcessing) && (
        <div className="text-center text-gray-500">
          Nenhum resultado encontrado
        </div>
      )}
    </div>
  );
} 