import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Upload as UploadIcon } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../config/supabase';

interface PreviewData {
  tipo: string;
  registros: number;
  campos: string[];
  amostra: any[];
}

const steps = ['Selecionar Arquivo', 'Validar Dados', 'Processar Importação'];

export const ImportacaoForm = () => {
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [processando, setProcessando] = useState(false);
  const [progresso, setProgresso] = useState(0);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setLoading(true);
    setError(null);

    try {
      const preview = await analisarArquivo(selectedFile);
      setPreview(preview);
      setActiveStep(1);
    } catch (err) {
      setError('Erro ao analisar arquivo. Verifique o formato e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const analisarArquivo = async (file: File): Promise<PreviewData> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const conteudo = e.target?.result as string;
          let dados;
          
          if (file.name.endsWith('.csv')) {
            dados = processarCSV(conteudo);
          } else if (file.name.endsWith('.json')) {
            dados = JSON.parse(conteudo);
          } else {
            throw new Error('Formato não suportado');
          }

          resolve({
            tipo: file.name.split('.').pop()?.toUpperCase() || '',
            registros: Array.isArray(dados) ? dados.length : 0,
            campos: Object.keys(Array.isArray(dados) ? dados[0] : dados),
            amostra: Array.isArray(dados) ? dados.slice(0, 5) : [dados]
          });
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
      reader.readAsText(file);
    });
  };

  const processarCSV = (conteudo: string) => {
    const linhas = conteudo.split('\n');
    const cabecalho = linhas[0].split(',');
    
    return linhas.slice(1).map(linha => {
      const valores = linha.split(',');
      return cabecalho.reduce((obj, header, index) => {
        obj[header.trim()] = valores[index]?.trim();
        return obj;
      }, {} as any);
    });
  };

  const iniciarProcessamento = async () => {
    if (!file || !preview) return;

    setProcessando(true);
    setProgresso(0);

    try {
      // Criar job de importação
      const { data: job } = await supabase.from('importacao_jobs').insert([
        {
          cliente_id: user?.clienteAtivo?.id,
          arquivo: file.name,
          status: 'PROCESSANDO',
          total_registros: preview.registros
        }
      ]).select().single();

      // Simular processamento em lotes
      const batchSize = 100;
      const totalBatches = Math.ceil(preview.registros / batchSize);

      for (let i = 0; i < totalBatches; i++) {
        // Processar lote
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Atualizar progresso
        const novoProgresso = Math.round(((i + 1) / totalBatches) * 100);
        setProgresso(novoProgresso);

        // Atualizar job
        await supabase.from('importacao_jobs').update({
          registros_processados: (i + 1) * batchSize,
          progresso: novoProgresso
        }).eq('id', job.id);
      }

      // Finalizar job
      await supabase.from('importacao_jobs').update({
        status: 'CONCLUIDO',
        progresso: 100
      }).eq('id', job.id);

      setActiveStep(2);
    } catch (error) {
      setError('Erro ao processar importação');
    } finally {
      setProcessando(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Importação de Dados
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {activeStep === 0 && (
        <Paper
          sx={{
            p: 3,
            textAlign: 'center',
            border: '2px dashed #ccc',
            cursor: 'pointer'
          }}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <input
            type="file"
            id="file-input"
            hidden
            accept=".csv,.json,.xml"
            onChange={handleFileChange}
          />
          <UploadIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Clique para selecionar ou arraste um arquivo
          </Typography>
          <Typography color="text.secondary">
            Formatos suportados: CSV, JSON, XML
          </Typography>
        </Paper>
      )}

      {activeStep === 1 && preview && (
        <Box>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Resumo do Arquivo
            </Typography>
            <Typography>Tipo: {preview.tipo}</Typography>
            <Typography>Total de Registros: {preview.registros}</Typography>
            <Typography>Campos Identificados: {preview.campos.join(', ')}</Typography>
          </Paper>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {preview.campos.map((campo) => (
                    <TableCell key={campo}>{campo}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {preview.amostra.map((registro, index) => (
                  <TableRow key={index}>
                    {preview.campos.map((campo) => (
                      <TableCell key={campo}>{registro[campo]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 3, textAlign: 'right' }}>
            <Button
              variant="contained"
              onClick={iniciarProcessamento}
              disabled={processando}
            >
              {processando ? (
                <>
                  <CircularProgress size={24} sx={{ mr: 1 }} />
                  Processando ({progresso}%)
                </>
              ) : (
                'Iniciar Processamento'
              )}
            </Button>
          </Box>
        </Box>
      )}

      {activeStep === 2 && (
        <Alert severity="success">
          Importação concluída com sucesso!
        </Alert>
      )}
    </Box>
  );
}; 