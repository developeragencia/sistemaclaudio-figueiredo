import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Divider
} from '@mui/material';
import { useRouter } from 'next/router';
import { Edit as EditIcon } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { ClienteService } from '../../services/ClienteService';
import { formatarCPFCNPJ, formatarTelefone, formatarData } from '../../utils/formatters';

const ClienteDetalhes: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const clienteService = new ClienteService();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cliente, setCliente] = useState<any>(null);

  useEffect(() => {
    if (id) {
      carregarCliente();
    }
  }, [id]);

  const carregarCliente = async () => {
    try {
      setLoading(true);
      const data = await clienteService.getCliente(id as string);
      setCliente(data);
    } catch (error) {
      console.error('Erro ao carregar cliente:', error);
      setError('Erro ao carregar dados do cliente');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!cliente) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">Cliente não encontrado</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Detalhes do Cliente</Typography>
        {user?.perfil === 'representante' && (
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => router.push(`/clientes/editar/${cliente.id}`)}
          >
            Editar
          </Button>
        )}
      </Box>

      <Paper sx={{ p: 3 }}>
        {/* Dados Principais */}
        <Typography variant="h6" gutterBottom>
          Dados Principais
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Razão Social
            </Typography>
            <Typography variant="body1">{cliente.razao_social}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Nome Fantasia
            </Typography>
            <Typography variant="body1">{cliente.nome_fantasia || '-'}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="textSecondary">
              CNPJ
            </Typography>
            <Typography variant="body1">{formatarCPFCNPJ(cliente.cnpj)}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="textSecondary">
              Inscrição Estadual
            </Typography>
            <Typography variant="body1">{cliente.inscricao_estadual || '-'}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="textSecondary">
              Inscrição Municipal
            </Typography>
            <Typography variant="body1">{cliente.inscricao_municipal || '-'}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Endereço */}
        <Typography variant="h6" gutterBottom>
          Endereço
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={2}>
            <Typography variant="subtitle2" color="textSecondary">
              CEP
            </Typography>
            <Typography variant="body1">{cliente.cep}</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="subtitle2" color="textSecondary">
              Endereço
            </Typography>
            <Typography variant="body1">{cliente.endereco}</Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="subtitle2" color="textSecondary">
              Número
            </Typography>
            <Typography variant="body1">{cliente.numero}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="textSecondary">
              Complemento
            </Typography>
            <Typography variant="body1">{cliente.complemento || '-'}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="textSecondary">
              Bairro
            </Typography>
            <Typography variant="body1">{cliente.bairro}</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle2" color="textSecondary">
              Cidade
            </Typography>
            <Typography variant="body1">{cliente.cidade}</Typography>
          </Grid>
          <Grid item xs={12} md={1}>
            <Typography variant="subtitle2" color="textSecondary">
              UF
            </Typography>
            <Typography variant="body1">{cliente.estado}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Contato */}
        <Typography variant="h6" gutterBottom>
          Contato
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="textSecondary">
              Telefone
            </Typography>
            <Typography variant="body1">{formatarTelefone(cliente.telefone)}</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="subtitle2" color="textSecondary">
              E-mail
            </Typography>
            <Typography variant="body1">{cliente.email}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="textSecondary">
              Nome do Contato
            </Typography>
            <Typography variant="body1">{cliente.contato_nome}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="textSecondary">
              Telefone do Contato
            </Typography>
            <Typography variant="body1">{formatarTelefone(cliente.contato_telefone)}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="textSecondary">
              E-mail do Contato
            </Typography>
            <Typography variant="body1">{cliente.contato_email}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Informações do Sistema */}
        <Typography variant="h6" gutterBottom>
          Informações do Sistema
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="textSecondary">
              Status
            </Typography>
            <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
              {cliente.status}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="textSecondary">
              Data de Cadastro
            </Typography>
            <Typography variant="body1">{formatarData(cliente.data_cadastro)}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="textSecondary">
              Última Atualização
            </Typography>
            <Typography variant="body1">{formatarData(cliente.ultima_atualizacao)}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ClienteDetalhes; 