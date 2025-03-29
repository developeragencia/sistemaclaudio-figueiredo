import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Receipt as ReceiptIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { PagamentoService } from '../../services/PagamentoService';
import { formatarMoeda, formatarData } from '../../utils/formatters';

interface Filtros {
  status?: string;
  dataInicio?: Date | null;
  dataFim?: Date | null;
}

const statusColors = {
  pendente: 'warning',
  pago: 'success',
  atrasado: 'error',
  cancelado: 'default'
};

export const PagamentoList: React.FC = () => {
  const { user } = useAuth();
  const pagamentoService = new PagamentoService();
  const [pagamentos, setPagamentos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filtros, setFiltros] = useState<Filtros>({});
  const [totalPagamentos, setTotalPagamentos] = useState(0);
  const [dialogConfirmacao, setDialogConfirmacao] = useState(false);
  const [pagamentoSelecionado, setPagamentoSelecionado] = useState<any>(null);
  const [acaoSelecionada, setAcaoSelecionada] = useState<'confirmar' | 'cancelar'>('confirmar');

  useEffect(() => {
    carregarPagamentos();
  }, [page, rowsPerPage, filtros]);

  const carregarPagamentos = async () => {
    try {
      setLoading(true);
      const filtrosAPI = {
        status: filtros.status,
        data_inicio: filtros.dataInicio?.toISOString(),
        data_fim: filtros.dataFim?.toISOString()
      };

      // Adicionar filtro por cliente ou fornecedor baseado no perfil
      if (user?.perfil === 'cliente' && user?.clienteAtivo) {
        filtrosAPI['cliente_id'] = user.clienteAtivo.id;
      } else if (user?.perfil === 'fornecedor') {
        filtrosAPI['fornecedor_id'] = user.id;
      }

      const data = await pagamentoService.listarPagamentos(filtrosAPI);
      setPagamentos(data);
      setTotalPagamentos(data.length);
    } catch (error) {
      console.error('Erro ao carregar pagamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFiltroChange = (campo: keyof Filtros, valor: any) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
    setPage(0);
  };

  const handleAcaoPagamento = (pagamento: any, acao: 'confirmar' | 'cancelar') => {
    setPagamentoSelecionado(pagamento);
    setAcaoSelecionada(acao);
    setDialogConfirmacao(true);
  };

  const confirmarAcao = async () => {
    try {
      if (acaoSelecionada === 'confirmar') {
        await pagamentoService.confirmarPagamento(pagamentoSelecionado.id);
      } else {
        await pagamentoService.cancelarPagamento(pagamentoSelecionado.id);
      }
      setDialogConfirmacao(false);
      await carregarPagamentos();
    } catch (error) {
      console.error('Erro ao executar ação:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Pagamentos
      </Typography>

      {/* Filtros */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={filtros.status || ''}
                label="Status"
                onChange={(e) => handleFiltroChange('status', e.target.value)}
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="pendente">Pendente</MenuItem>
                <MenuItem value="pago">Pago</MenuItem>
                <MenuItem value="atrasado">Atrasado</MenuItem>
                <MenuItem value="cancelado">Cancelado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <DatePicker
              label="Data Início"
              value={filtros.dataInicio}
              onChange={(date) => handleFiltroChange('dataInicio', date)}
              slotProps={{ textField: { size: 'small', fullWidth: true } }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <DatePicker
              label="Data Fim"
              value={filtros.dataFim}
              onChange={(date) => handleFiltroChange('dataFim', date)}
              slotProps={{ textField: { size: 'small', fullWidth: true } }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Tabela */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Data Vencimento</TableCell>
              <TableCell>Cliente/Fornecedor</TableCell>
              <TableCell>Valor Bruto</TableCell>
              <TableCell>Valor Líquido</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : pagamentos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Nenhum pagamento encontrado
                </TableCell>
              </TableRow>
            ) : (
              pagamentos
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((pagamento) => (
                  <TableRow key={pagamento.id}>
                    <TableCell>{formatarData(pagamento.data_vencimento)}</TableCell>
                    <TableCell>
                      {user?.perfil === 'cliente' 
                        ? pagamento.fornecedor?.razao_social 
                        : pagamento.cliente?.razao_social}
                    </TableCell>
                    <TableCell>{formatarMoeda(pagamento.valor_bruto)}</TableCell>
                    <TableCell>{formatarMoeda(pagamento.valor_liquido)}</TableCell>
                    <TableCell>
                      <Chip
                        label={pagamento.status}
                        color={statusColors[pagamento.status]}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => {}}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      {pagamento.status === 'pendente' && (
                        <>
                          <IconButton
                            size="small"
                            onClick={() => handleAcaoPagamento(pagamento, 'confirmar')}
                          >
                            <CheckCircleIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleAcaoPagamento(pagamento, 'cancelar')}
                          >
                            <CancelIcon />
                          </IconButton>
                        </>
                      )}
                      {pagamento.status === 'pago' && (
                        <IconButton
                          size="small"
                          onClick={() => {}}
                        >
                          <ReceiptIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalPagamentos}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Itens por página"
        />
      </TableContainer>

      {/* Dialog de confirmação */}
      <Dialog open={dialogConfirmacao} onClose={() => setDialogConfirmacao(false)}>
        <DialogTitle>
          Confirmar {acaoSelecionada === 'confirmar' ? 'Pagamento' : 'Cancelamento'}
        </DialogTitle>
        <DialogContent>
          Deseja realmente {acaoSelecionada === 'confirmar' ? 'confirmar' : 'cancelar'} o pagamento de{' '}
          <strong>{formatarMoeda(pagamentoSelecionado?.valor_liquido)}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogConfirmacao(false)}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color={acaoSelecionada === 'confirmar' ? 'success' : 'error'}
            onClick={confirmarAcao}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}; 