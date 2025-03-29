import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import { ClienteService } from '../../services/ClienteService';
import { formatarCPFCNPJ, formatarTelefone } from '../../utils/formatters';
import { consultarCNPJ } from '../../services/CNPJService';

interface ClienteFormProps {
  id?: string;
}

export const ClienteForm: React.FC<ClienteFormProps> = ({ id }) => {
  const router = useRouter();
  const { user } = useAuth();
  const clienteService = new ClienteService();

  const [loading, setLoading] = useState(false);
  const [loadingCNPJ, setLoadingCNPJ] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [cliente, setCliente] = useState({
    razao_social: '',
    nome_fantasia: '',
    cnpj: '',
    inscricao_estadual: '',
    inscricao_municipal: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    telefone: '',
    email: '',
    contato_nome: '',
    contato_telefone: '',
    contato_email: '',
    status: 'ativo' as 'ativo' | 'inativo'
  });

  useEffect(() => {
    if (id) {
      carregarCliente();
    }
  }, [id]);

  const carregarCliente = async () => {
    try {
      setLoading(true);
      const data = await clienteService.getCliente(id!);
      if (data) {
        setCliente(data);
      }
    } catch (error) {
      console.error('Erro ao carregar cliente:', error);
      setError('Erro ao carregar dados do cliente');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (campo: string, valor: any) => {
    let valorFormatado = valor;

    // Aplicar máscaras
    if (campo === 'cnpj') {
      valorFormatado = formatarCPFCNPJ(valor.replace(/\D/g, ''));
    } else if (campo === 'telefone' || campo === 'contato_telefone') {
      valorFormatado = formatarTelefone(valor.replace(/\D/g, ''));
    } else if (campo === 'cep') {
      valorFormatado = valor.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2');
    }

    setCliente(prev => ({ ...prev, [campo]: valorFormatado }));
  };

  const buscarCNPJ = async () => {
    try {
      setLoadingCNPJ(true);
      setError(null);

      const cnpjLimpo = cliente.cnpj.replace(/\D/g, '');
      if (cnpjLimpo.length !== 14) {
        setError('CNPJ inválido');
        return;
      }

      // Verificar se CNPJ já existe
      if (!id) {
        const duplicado = await clienteService.verificarCNPJDuplicado(cnpjLimpo);
        if (duplicado) {
          setError('CNPJ já cadastrado no sistema');
          return;
        }
      }

      const dadosCNPJ = await consultarCNPJ(cnpjLimpo);
      if (dadosCNPJ) {
        setCliente(prev => ({
          ...prev,
          razao_social: dadosCNPJ.razao_social,
          nome_fantasia: dadosCNPJ.nome_fantasia || '',
          endereco: dadosCNPJ.logradouro,
          numero: dadosCNPJ.numero,
          complemento: dadosCNPJ.complemento || '',
          bairro: dadosCNPJ.bairro,
          cidade: dadosCNPJ.municipio,
          estado: dadosCNPJ.uf,
          cep: dadosCNPJ.cep.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2')
        }));
      }
    } catch (error) {
      console.error('Erro ao consultar CNPJ:', error);
      setError('Erro ao consultar CNPJ. Tente novamente.');
    } finally {
      setLoadingCNPJ(false);
    }
  };

  const validarFormulario = () => {
    if (!cliente.razao_social) return 'Razão Social é obrigatória';
    if (!cliente.cnpj) return 'CNPJ é obrigatório';
    if (!cliente.endereco) return 'Endereço é obrigatório';
    if (!cliente.numero) return 'Número é obrigatório';
    if (!cliente.bairro) return 'Bairro é obrigatório';
    if (!cliente.cidade) return 'Cidade é obrigatória';
    if (!cliente.estado) return 'Estado é obrigatório';
    if (!cliente.cep) return 'CEP é obrigatório';
    if (!cliente.telefone) return 'Telefone é obrigatório';
    if (!cliente.email) return 'E-mail é obrigatório';
    if (!cliente.contato_nome) return 'Nome do contato é obrigatório';
    if (!cliente.contato_telefone) return 'Telefone do contato é obrigatório';
    if (!cliente.contato_email) return 'E-mail do contato é obrigatório';
    return null;
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const erro = validarFormulario();
      if (erro) {
        setError(erro);
        return;
      }

      const dadosCliente = {
        ...cliente,
        representante_id: user?.id
      };

      if (id) {
        await clienteService.atualizarCliente(id, dadosCliente);
        setSuccess('Cliente atualizado com sucesso!');
      } else {
        await clienteService.criarCliente(dadosCliente);
        setSuccess('Cliente cadastrado com sucesso!');
        setTimeout(() => {
          router.push('/clientes');
        }, 2000);
      }
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      setError('Erro ao salvar cliente. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !cliente.razao_social) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {id ? 'Editar Cliente' : 'Novo Cliente'}
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

      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {/* Dados Principais */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Dados Principais
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="CNPJ"
              value={cliente.cnpj}
              onChange={(e) => handleChange('cnpj', e.target.value)}
              disabled={loading || Boolean(id)}
              InputProps={{
                endAdornment: !id && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={buscarCNPJ}
                      disabled={loading || loadingCNPJ || cliente.cnpj.replace(/\D/g, '').length !== 14}
                    >
                      {loadingCNPJ ? <CircularProgress size={20} /> : <SearchIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Inscrição Estadual"
              value={cliente.inscricao_estadual}
              onChange={(e) => handleChange('inscricao_estadual', e.target.value)}
              disabled={loading}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Inscrição Municipal"
              value={cliente.inscricao_municipal}
              onChange={(e) => handleChange('inscricao_municipal', e.target.value)}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Razão Social"
              value={cliente.razao_social}
              onChange={(e) => handleChange('razao_social', e.target.value)}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nome Fantasia"
              value={cliente.nome_fantasia}
              onChange={(e) => handleChange('nome_fantasia', e.target.value)}
              disabled={loading}
            />
          </Grid>

          {/* Endereço */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Endereço
            </Typography>
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              required
              label="CEP"
              value={cliente.cep}
              onChange={(e) => handleChange('cep', e.target.value)}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              required
              label="Endereço"
              value={cliente.endereco}
              onChange={(e) => handleChange('endereco', e.target.value)}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              required
              label="Número"
              value={cliente.numero}
              onChange={(e) => handleChange('numero', e.target.value)}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Complemento"
              value={cliente.complemento}
              onChange={(e) => handleChange('complemento', e.target.value)}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              required
              label="Bairro"
              value={cliente.bairro}
              onChange={(e) => handleChange('bairro', e.target.value)}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              required
              label="Cidade"
              value={cliente.cidade}
              onChange={(e) => handleChange('cidade', e.target.value)}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} md={1}>
            <TextField
              fullWidth
              required
              label="UF"
              value={cliente.estado}
              onChange={(e) => handleChange('estado', e.target.value)}
              disabled={loading}
              inputProps={{ maxLength: 2 }}
            />
          </Grid>

          {/* Contato */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Contato
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              required
              label="Telefone"
              value={cliente.telefone}
              onChange={(e) => handleChange('telefone', e.target.value)}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              required
              label="E-mail"
              type="email"
              value={cliente.email}
              onChange={(e) => handleChange('email', e.target.value)}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              required
              label="Nome do Contato"
              value={cliente.contato_nome}
              onChange={(e) => handleChange('contato_nome', e.target.value)}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              required
              label="Telefone do Contato"
              value={cliente.contato_telefone}
              onChange={(e) => handleChange('contato_telefone', e.target.value)}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              required
              label="E-mail do Contato"
              type="email"
              value={cliente.contato_email}
              onChange={(e) => handleChange('contato_email', e.target.value)}
              disabled={loading}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button
            onClick={() => router.push('/clientes')}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </Box>
 