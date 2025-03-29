import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import { PagamentoService } from '../../services/PagamentoService';
import { formatarMoeda, formatarData } from '../../utils/formatters';

interface PagamentoDetalhesProps {
  id: string;
}

export const PagamentoDetalhes: React.FC<PagamentoDetalhesProps> = ({ id }) => {
  const router = useRouter();
  const { user } = useAuth();
  const pagamentoService = new PagamentoService();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagamento, setPagamento] = useState<any>(null);
  const [dialogConfirmacao, setDialogConfirmacao] = useState(false);
  const [acaoSelecionada, setAcaoSelecionada] = useState<'confirmar' | 'cancelar'>('confirmar');
  const [comprovanteUrl, setComprovanteUrl] = useState('');
  const [correcaoMonetaria, setCorrecaoMonetaria] = useState<any>(null);

  useEffect(() => {
    carregarPagamento();
  }, [id]);

  const carregarPagamento = async () => {
    try {
      setLoading(true);
      const data = await pagamentoService.getPagamento(id);
      setPagamento(data);
    } catch (error) {
      console.error('Erro ao carregar pagamento:', error);
      setError('Erro ao carregar dados do pagamento');
    } finally {
      setLoading(false);
    }
  };

  const handleAcaoPagamento = (acao: 'confirmar' | 'cancelar') => {
    setAcaoSelecionada(acao);
    setDialogConfirmacao(true);
  };

  const confirmarAcao = async () => {
    try {
      if (acaoSelecionada === 'confirmar') {
        await pagamentoService.confirmarPagamento(id, comprovanteUrl);
      } else {
        await pagamentoService.cancelarPagamento(id);
      }
      setDialogConfirmacao(false);
      await carregarPagamento();
    } catch (error) {
      console.error('Erro ao executar ação:', error);
      setError('Erro ao executar ação. Tente novamente.');
    }
  };

  const calcularCorrecaoMonetaria = async () => {
    try {
      const resultado = await pagamentoService.calcularCorrecaoMonetaria(id);
      setCorrecaoMonetaria(resultado);
    } catch (error) {
      console.error('Erro ao calcular correção monetária:', error);
      setError('Erro ao calcular correção monetária. Tente novamente.');
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

  if (!pagamento) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">Pagamento não encontrado</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Detalhes do Pagamento</Typography>
        <Box>
          {pagamento.status === 'pendente' && (
            <>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleAcaoPagamento('confirmar')}
                sx={{ mr: 1 }}
              >
                Confirmar Pagamento
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleAcaoPagamento('cancelar')}
              >
                Cancelar
              </Button>
            </>
          )}
          {pagamento.status === 'atrasado' && (
            <Button
              variant="contained"
              color="primary"
              onClick={calcularCorrecaoMonetaria}
            >
              Calcular Correção Monetária
            </Button>
          )}
        </Box>
      </Box>

      <Paper sx={{ p: 3 }}>
        {/* Informações Principais */}
        <Typography variant="h6" gutterBottom>
          Informações Principais
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="textSecondary">
              Status
            </Typography>
            <Chip
              label={pagamento.status}
              color={
                pagamento.status === 'pendente' ? 'warning' :
                pagamento.status === 'pago' ? 'success' :
                pagamento.status === 'atrasado' ? 'error' : 'default'
              }
              size="small"
              sx={{ mt: 0.5 }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="textSecondary">
              Data de Vencimento
            </Typography>
            <Typography variant="body1">
              {formatarData(pagamento.data_vencimento)}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="textSecondary">
              Data de Pagamento
            </Typography>
            <Typography variant="body1">
              {pagamento.data_pagamento ? formatarData(pagamento.data_pagamento) : '-'}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Valores */}
        <Typography variant="h6" gutterBottom>
          Valores
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="textSecondary">
              Valor Bruto
            </Typography>
            <Typography variant="body1">
              {formatarMoeda(pagamento.valor_bruto)}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="textSecondary">
              Valor Líquido
            </Typography>
            <Typography variant="body1">
              {formatarMoeda(pagamento.valor_liquido)}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="textSecondary">
              Valor Retenções
            </Typography>
            <Typography variant="body1">
              {formatarMoeda(pagamento.valor_retencao)}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Retenções */}
        <Typography variant="h6" gutterBottom>
          Retenções
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="textSecondary">
              Tipos de Retenção
            </Typography>
            <Box sx={{ mt: 0.5 }}>
              {pagamento.tipo_retencao.map((tipo: string) => (
                <Chip
                  key={tipo}
                  label={tipo}
                  size="small"
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Correção Monetária */}
        {correcaoMonetaria && (
          <>
            <Typography variant="h6" gutterBottom>
              Correção Monetária
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" color="textSecondary">
                  Valor Original
                </Typography>
                <Typography variant="body1">
                  {formatarMoeda(correcaoMonetaria.valor_original)}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" color="textSecondary">
                  Valor Corrigido
                </Typography>
                <Typography variant="body1">
                  {formatarMoeda(correcaoMonetaria.valor_corrigido)}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" color="textSecondary">
                  Diferença
                </Typography>
                <Typography variant="body1" color={correcaoMonetaria.diferenca > 0 ? 'error' : 'success'}>
                  {formatarMoeda(correcaoMonetaria.diferenca)}
                </Typography>
              </Grid>
            </Grid>
          </>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Observações */}
        <Typography variant="h6" gutterBottom>
          Observações
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          {pagamento.observacoes || 'Nenhuma observação registrada.'}
        </Typography>
      </Paper>

      {/* Dialog de confirmação */}
      <Dialog open={dialogConfirmacao} onClose={() => setDialogConfirmacao(false)}>
        <DialogTitle>
          Confirmar {acaoSelecionada === 'confirmar' ? 'Pagamento' : 'Cancelamento'}
        </DialogTitle>
        <DialogContent>
          {acaoSelecionada === 'confirmar' && (
            <TextField
              fullWidth
              label="URL do Comprovante"
              value={comprovanteUrl}
              onChange={(e) => setComprovanteUrl(e.target.value)}
              sx={{ mt: 2 }}
            />
          )}
          <Typography sx={{ mt: 2 }}>
            Deseja realmente {acaoSelecionada === 'confirmar' ? 'confirmar' : 'cancelar'} o pagamento de{' '}
            <strong>{formatarMoeda(pagamento.valor_liquido)}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogConfirmacao(false)}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color={acaoSelecionada === 'confirmar' ? 'success' : 'error'}
            onClick={confirmarAcao}
            disabled={acaoSelecionada === 'confirmar' && !comprovanteUrl}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}; 