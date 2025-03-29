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
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Send as SendIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { PropostaService } from '../../services/PropostaService';
import { formatarMoeda } from '../../utils/formatters';

interface Filtros {
  status?: string;
  dataInicio?: Date | null;
  dataFim?: Date | null;
}

const statusColors = {
  rascunho: 'default',
  enviada: 'primary',
  aprovada: 'success',
  rejeitada: 'error'
};

export const PropostaList: React.FC = () => {
  const { user } = useAuth();
  const propostaService = new PropostaService();
  const [propostas, setPropostas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filtros, setFiltros] = useState<Filtros>({});
  const [totalPropostas, setTotalPropostas] = useState(0);

  useEffect(() => {
    carregarPropostas();
  }, [page, rowsPerPage, filtros]);

  const carregarPropostas = async () => {
    try {
      setLoading(true);
      const filtrosAPI = {
        status: filtros.status,
        data_inicio: filtros.dataInicio,
        data_fim: filtros.dataFim
      };

      // Adicionar filtro por cliente ou representante baseado no perfil
      if (user?.perfil === 'cliente' && user?.clienteAtivo) {
        filtrosAPI['cliente_id'] = user.clienteAtivo.id;
      } else if (user?.perfil === 'representante') {
        filtrosAPI['representante_id'] = user.id;
      }

      const data = await propostaService.listarPropostas(filtrosAPI);
      setPropostas(data);
      setTotalPropostas(data.length);
    } catch (error) {
      console.error('Erro ao carregar propostas:', error);
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

  const handleEnviarProposta = async (id: string) => {
    try {
      await propostaService.enviarProposta(id, user!.id);
      await carregarPropostas();
    } catch (error) {
      console.error('Erro ao enviar proposta:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Propostas Comerciais
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
                <MenuItem value="rascunho">Rascunho</MenuItem>
                <MenuItem value="enviada">Enviada</MenuItem>
                <MenuItem value="aprovada">Aprovada</MenuItem>
                <MenuItem value="rejeitada">Rejeitada</MenuItem>
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
              <TableCell>Número</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Valor Total</TableCell>
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
            ) : propostas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Nenhuma proposta encontrada
                </TableCell>
              </TableRow>
            ) : (
              propostas
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((proposta) => (
                  <TableRow key={proposta.id}>
                    <TableCell>{proposta.id}</TableCell>
                    <TableCell>
                      {new Date(proposta.data_criacao).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{proposta.cliente?.razao_social}</TableCell>
                    <TableCell>{formatarMoeda(proposta.valor_total)}</TableCell>
                    <TableCell>
                      <Chip
                        label={proposta.status}
                        color={statusColors[proposta.status]}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => {}}>
                        <VisibilityIcon />
                      </IconButton>
                      {proposta.status === 'rascunho' && (
                        <>
                          <IconButton size="small" onClick={() => {}}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleEnviarProposta(proposta.id)}
                          >
                            <SendIcon />
                          </IconButton>
                        </>
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
          count={totalPropostas}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Itens por página"
        />
      </TableContainer>
    </Box>
  );
}; 