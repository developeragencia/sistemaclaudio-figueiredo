import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../config/supabase';

interface Proposta {
  id: string;
  clienteId: string;
  descricao: string;
  valor: number;
  status: 'SOLICITADA' | 'EM_ANALISE' | 'APROVADA' | 'REJEITADA' | 'CONVERTIDA';
  dataCriacao: string;
  representanteId: string;
}

export const PropostaList = () => {
  const { user } = useAuth();
  const [propostas, setPropostas] = useState<Proposta[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [novaProposta, setNovaProposta] = useState({
    descricao: '',
    valor: '',
    clienteId: ''
  });

  useEffect(() => {
    carregarPropostas();
  }, [user]);

  async function carregarPropostas() {
    try {
      let query = supabase.from('propostas').select('*');

      if (user?.perfil === 'representante') {
        query = query.eq('representante_id', user.id);
      } else if (user?.perfil === 'cliente') {
        query = query.eq('cliente_id', user.clienteAtivo?.id);
      }

      const { data } = await query.order('data_criacao', { ascending: false });
      if (data) {
        setPropostas(data);
      }
    } catch (error) {
      console.error('Erro ao carregar propostas:', error);
    }
  }

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase.from('propostas').insert([
        {
          descricao: novaProposta.descricao,
          valor: parseFloat(novaProposta.valor),
          cliente_id: user?.clienteAtivo?.id,
          representante_id: user?.id,
          status: 'SOLICITADA'
        }
      ]);

      if (error) throw error;

      setOpenDialog(false);
      carregarPropostas();
      setNovaProposta({ descricao: '', valor: '', clienteId: '' });
    } catch (error) {
      console.error('Erro ao criar proposta:', error);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      SOLICITADA: 'info',
      EM_ANALISE: 'warning',
      APROVADA: 'success',
      REJEITADA: 'error',
      CONVERTIDA: 'secondary'
    };
    return colors[status as keyof typeof colors];
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Propostas Comerciais</Typography>
        {user?.perfil === 'representante' && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Nova Proposta
          </Button>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell align="right">Valor</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {propostas.map((proposta) => (
              <TableRow key={proposta.id}>
                <TableCell>{new Date(proposta.dataCriacao).toLocaleDateString()}</TableCell>
                <TableCell>{proposta.descricao}</TableCell>
                <TableCell align="right">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(proposta.valor)}
                </TableCell>
                <TableCell>
                  <Chip
                    label={proposta.status.replace('_', ' ')}
                    color={getStatusColor(proposta.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button size="small" onClick={() => {}}>
                    Detalhes
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Nova Proposta Comercial</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Descrição"
            type="text"
            fullWidth
            value={novaProposta.descricao}
            onChange={(e) => setNovaProposta({ ...novaProposta, descricao: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Valor"
            type="number"
            fullWidth
            value={novaProposta.valor}
            onChange={(e) => setNovaProposta({ ...novaProposta, valor: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}; 