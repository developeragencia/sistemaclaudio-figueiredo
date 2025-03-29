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
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import { ClienteService } from '../../services/ClienteService';
import { formatarCPFCNPJ, formatarTelefone } from '../../utils/formatters';

export const ClienteList: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const clienteService = new ClienteService();
  
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalClientes, setTotalClientes] = useState(0);
  
  const [filtros, setFiltros] = useState({
    status: '',
    busca: ''
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState<any>(null);
  const [novoStatus, setNovoStatus] = useState<'ativo' | 'inativo'>('ativo');

  useEffect(() => {
    carregarClientes();
  }, [page, rowsPerPage, filtros]);

  const carregarClientes = async () => {
    try {
      setLoading(true);
      const filtrosAPI = {
        ...filtros,
        representante_id: user?.perfil === 'representante' ? user.id : undefined
      };

      const data = await clienteService.listarClientes(filtrosAPI);
      setClientes(data);
      setTotalClientes(data.length);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
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

  const handleFiltroChange = (campo: string, valor: any) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
    setPage(0);
  };

  const handleAlterarStatus = (cliente: any, status: 'ativo' | 'inativo') => {
    setClienteSelecionado(cliente);
    setNovoStatus(status);
    setDialogOpen(true);
  };

  const confirmarAlteracaoStatus = async () => {
    try {
      await clienteService.alterarStatus(clienteSelecionado.id, novoStatus);
      setDialogOpen(false);
      await carregarClientes();
    } catch (error) {
      console.error('Erro ao alterar status:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Clientes
      </Typography>

      {/* Filtros */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Buscar"
              value={filtros.busca}
              onChange={(e) => handleFiltroChange('busca', e.target.value)}
              placeholder="Razão Social, Nome Fantasia ou CNPJ"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={filtros.status}
                label="Status"
                onChange={(e) => handleFiltroChange('status', e.target.value)}
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="ativo">Ativo</MenuItem>
                <MenuItem value="inativo">Inativo</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabela */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Razão Social</TableCell>
              <TableCell>CNPJ</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Contato</TableCell>
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
            ) : clientes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Nenhum cliente encontrado
                </TableCell>
              </TableRow>
            ) : (
              clientes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((cliente) => (
                  <TableRow key={cliente.id}>
                    <TableCell>
                      <Box>
                        <Typography variant="body1">{cliente.razao_social}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          {cliente.nome_fantasia}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{formatarCPFCNPJ(cliente.cnpj)}</TableCell>
                    <TableCell>{formatarTelefone(cliente.telefone)}</TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">{cliente.contato_nome}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          {formatarTelefone(cliente.contato_telefone)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={cliente.status === 'ativo' ? 'Ativo' : 'Inativo'}
                        color={cliente.status === 'ativo' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => router.push(`/clientes/${cliente.id}`)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      {user?.perfil === 'representante' && (
                        <>
                          <IconButton
                            size="small"
                            onClick={() => router.push(`/clientes/editar/${cliente.id}`)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleAlterarStatus(
                              cliente,
                              cliente.status === 'ativo' ? 'inativo' : 'ativo'
                            )}
                          >
                            {cliente.status === 'ativo' ? <BlockIcon /> : <CheckCircleIcon />}
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
          count={totalClientes}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Itens por página"
        />
      </TableContainer>

      {/* Dialog de confirmação */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
          Confirmar Alteração de Status
        </DialogTitle>
        <DialogContent>
          Deseja realmente {novoStatus === 'ativo' ? 'ativar' : 'inativar'} o cliente{' '}
          <strong>{clienteSelecionado?.razao_social}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color={novoStatus === 'ativo' ? 'success' : 'error'}
            onClick={confirmarAlteracaoStatus}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}; 