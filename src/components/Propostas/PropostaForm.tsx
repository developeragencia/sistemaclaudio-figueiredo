import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { PropostaService } from '../../services/PropostaService';
import { formatarMoeda } from '../../utils/formatters';
import { useRouter } from 'next/router';

interface PropostaFormProps {
  id?: string;
}

interface ItemProposta {
  id?: string;
  descricao: string;
  quantidade: number;
  valor_unitario: number;
  valor_total: number;
}

export const PropostaForm: React.FC<PropostaFormProps> = ({ id }) => {
  const router = useRouter();
  const { user } = useAuth();
  const propostaService = new PropostaService();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [proposta, setProposta] = useState({
    cliente_id: '',
    observacoes: '',
    condicoes_pagamento: '',
    prazo_entrega: '',
    validade_proposta: 30, // Padrão de 30 dias
  });
  
  const [itens, setItens] = useState<ItemProposta[]>([]);
  const [openItemDialog, setOpenItemDialog] = useState(false);
  const [itemAtual, setItemAtual] = useState<ItemProposta>({
    descricao: '',
    quantidade: 1,
    valor_unitario: 0,
    valor_total: 0
  });
  
  const [clientes, setClientes] = useState<any[]>([]);

  useEffect(() => {
    carregarClientes();
    if (id) {
      carregarProposta();
    }
  }, [id]);

  const carregarClientes = async () => {
    try {
      // Implementar busca de clientes no Supabase
      const { data: clientesData } = await supabase
        .from('clientes')
        .select('id, razao_social')
        .order('razao_social');
      
      if (clientesData) {
        setClientes(clientesData);
      }
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
      setError('Erro ao carregar lista de clientes');
    }
  };

  const carregarProposta = async () => {
    try {
      setLoading(true);
      const propostaData = await propostaService.getProposta(id!);
      setProposta({
        cliente_id: propostaData.cliente_id,
        observacoes: propostaData.observacoes || '',
        condicoes_pagamento: propostaData.condicoes_pagamento || '',
        prazo_entrega: propostaData.prazo_entrega || '',
        validade_proposta: propostaData.validade_proposta || 30,
      });
      setItens(propostaData.itens || []);
    } catch (error) {
      console.error('Erro ao carregar proposta:', error);
      setError('Erro ao carregar dados da proposta');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (campo: string, valor: any) => {
    setProposta(prev => ({ ...prev, [campo]: valor }));
  };

  const handleItemChange = (campo: string, valor: any) => {
    const novoItem = { ...itemAtual, [campo]: valor };
    if (campo === 'quantidade' || campo === 'valor_unitario') {
      novoItem.valor_total = novoItem.quantidade * novoItem.valor_unitario;
    }
    setItemAtual(novoItem);
  };

  const adicionarItem = () => {
    if (itemAtual.id) {
      setItens(prev => prev.map(item => 
        item.id === itemAtual.id ? itemAtual : item
      ));
    } else {
      setItens(prev => [...prev, { ...itemAtual, id: Date.now().toString() }]);
    }
    setOpenItemDialog(false);
    setItemAtual({
      descricao: '',
      quantidade: 1,
      valor_unitario: 0,
      valor_total: 0
    });
  };

  const editarItem = (item: ItemProposta) => {
    setItemAtual(item);
    setOpenItemDialog(true);
  };

  const removerItem = (id: string) => {
    setItens(prev => prev.filter(item => item.id !== id));
  };

  const calcularTotalProposta = () => {
    return itens.reduce((total, item) => total + item.valor_total, 0);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      if (!proposta.cliente_id) {
        setError('Selecione um cliente');
        return;
      }

      if (itens.length === 0) {
        setError('Adicione pelo menos um item à proposta');
        return;
      }

      const dadosProposta = {
        ...proposta,
        itens,
        valor_total: calcularTotalProposta(),
        representante_id: user?.id
      };

      if (id) {
        await propostaService.atualizarProposta(id, dadosProposta);
        setSuccess('Proposta atualizada com sucesso!');
      } else {
        await propostaService.criarProposta(dadosProposta);
        setSuccess('Proposta criada com sucesso!');
        setTimeout(() => {
          router.push('/propostas');
        }, 2000);
      }
    } catch (error) {
      console.error('Erro ao salvar proposta:', error);
      setError('Erro ao salvar proposta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {id ? 'Editar Proposta' : 'Nova Proposta'}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Cliente</InputLabel>
              <Select
                value={proposta.cliente_id}
                label="Cliente"
                onChange={(e) => handleChange('cliente_id', e.target.value)}
                disabled={loading}
              >
                {clientes.map((cliente) => (
                  <MenuItem key={cliente.id} value={cliente.id}>
                    {cliente.razao_social}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Validade da Proposta (dias)"
              type="number"
              value={proposta.validade_proposta}
              onChange={(e) => handleChange('validade_proposta', e.target.value)}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Condições de Pagamento"
              value={proposta.condicoes_pagamento}
              onChange={(e) => handleChange('condicoes_pagamento', e.target.value)}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Prazo de Entrega"
              value={proposta.prazo_entrega}
              onChange={(e) => handleChange('prazo_entrega', e.target.value)}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Observações"
              value={proposta.observacoes}
              onChange={(e) => handleChange('observacoes', e.target.value)}
              disabled={loading}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Itens da Proposta</Typography>
          <Button
            startIcon={<AddIcon />}
            onClick={() => setOpenItemDialog(true)}
            disabled={loading}
          >
            Adicionar Item
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Descrição</TableCell>
                <TableCell align="right">Quantidade</TableCell>
                <TableCell align="right">Valor Unitário</TableCell>
                <TableCell align="right">Valor Total</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itens.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.descricao}</TableCell>
                  <TableCell align="right">{item.quantidade}</TableCell>
                  <TableCell align="right">{formatarMoeda(item.valor_unitario)}</TableCell>
                  <TableCell align="right">{formatarMoeda(item.valor_total)}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => editarItem(item)}
                      disabled={loading}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => removerItem(item.id!)}
                      disabled={loading}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {itens.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Nenhum item adicionado
                  </TableCell>
                </TableRow>
              )}
              {itens.length > 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="right">
                    <strong>Total da Proposta:</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>{formatarMoeda(calcularTotalProposta())}</strong>
                  </TableCell>
                  <TableCell />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button
          onClick={() => router.push('/propostas')}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Salvando...' : 'Salvar Proposta'}
        </Button>
      </Box>

      {/* Dialog para adicionar/editar item */}
      <Dialog
        open={openItemDialog}
        onClose={() => setOpenItemDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {itemAtual.id ? 'Editar Item' : 'Novo Item'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descrição"
                value={itemAtual.descricao}
                onChange={(e) => handleItemChange('descricao', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Quantidade"
                type="number"
                value={itemAtual.quantidade}
                onChange={(e) => handleItemChange('quantidade', Number(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Valor Unitário"
                type="number"
                value={itemAtual.valor_unitario}
                onChange={(e) => handleItemChange('valor_unitario', Number(e.target.value))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Valor Total"
                type="number"
                value={itemAtual.valor_total}
                disabled
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenItemDialog(false)}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={adicionarItem}
            disabled={!itemAtual.descricao || itemAtual.quantidade <= 0 || itemAtual.valor_unitario <= 0}
          >
            {itemAtual.id ? 'Atualizar' : 'Adicionar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}; 