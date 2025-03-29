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
  tipo: 'csv' | 'json';
  totalRegistros: number;
  campos: string[];
  amostra: any[];
}

const steps = ['Selecionar Arquivo', 'Validar Dados', 'Processar Importação'];

export const ImportacaoForm: React.FC = () => {
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      const selectedFile = event.target.files?.[0];
      if (!selectedFile) return;

      setFile(selectedFile);
      setLoading(true);

      // Verificar extensão do arquivo
      const fileType = selectedFile.name.split('.').pop()?.toLowerCase();
      if (!['csv', 'json'].includes(fileType || '')) {
        throw new Error('Formato de arquivo não suportado. Use CSV ou JSON.');
      }

      // Analisar arquivo
      const preview = await analisarArquivo(selectedFile);
      setPreviewData(preview);
      setActiveStep(1);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao processar arquivo');
    } finally {
      setLoading(false);
    }
  };

  const analisarArquivo = (file: File): Promise<PreviewData> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
          const content = e.target?.result as string;
          const tipo = file.name.endsWith('.csv') ? 'csv' : 'json';
          let dados;

          if (tipo === 'csv') {
            dados = await processarCSV(content);
          } else {
            dados = JSON.parse(content);
          }

          const preview: PreviewData = {
            tipo,
            totalRegistros: Array.isArray(dados) ? dados.length : 0,
            campos: Array.isArray(dados) && dados.length > 0 ? Object.keys(dados[0]) : [],
            amostra: Array.isArray(dados) ? dados.slice(0, 5) : []
          };

          resolve(preview);
        } catch (error) {
          reject(new Error('Erro ao analisar arquivo'));
        }
      };

      reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
      reader.readAsText(file);
    });
  };

  const processarCSV = (content: string): Promise<any[]> => {
    return new Promise((resolve) => {
      const linhas = content.split('\n');
      const headers = linhas[0].split(',').map(h => h.trim());
      const dados = [];

      for (let i = 1; i < linhas.length; i++) {
        if (!linhas[i].trim()) continue;
        
        const valores = linhas[i].split(',').map(v => v.trim());
        const registro = {};
        
        headers.forEach((header, index) => {
          registro[header] = valores[index];
        });

        dados.push(registro);
      }

      resolve(dados);
    });
  };

  const iniciarProcessamento = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!file || !previewData) {
        throw new Error('Nenhum arquivo selecionado');
      }

      // Criar job de importação
      const { data: job, error: jobError } = await supabase
        .from('importacao_jobs')
        .insert({
          nome_arquivo: file.name,
          status: 'processando',
          total_registros: previewData.totalRegistros,
          registros_processados: 0
        })
        .select()
        .single();

      if (jobError) throw jobError;

      // Processar em lotes
      const tamanhoBatch = 100;
      const totalBatches = Math.ceil(previewData.totalRegistros / tamanhoBatch);

      for (let i = 0; i < totalBatches; i++) {
        const inicio = i * tamanhoBatch;
        const fim = Math.min((i + 1) * tamanhoBatch, previewData.totalRegistros);
        
        // Simular processamento do lote
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Atualizar progresso
        const progressoAtual = Math.round(((i + 1) / totalBatches) * 100);
        setProgress(progressoAtual);

        // Atualizar job
        await supabase
          .from('importacao_jobs')
          .update({
            registros_processados: fim,
            progresso: progressoAtual
          })
          .eq('id', job.id);
      }

      // Finalizar job
      await supabase
        .from('importacao_jobs')
        .update({
          status: 'concluido',
          data_conclusao: new Date().toISOString()
        })
        .eq('id', job.id);

      setActiveStep(2);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao processar importação');
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
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

      <Paper sx={{ p: 3 }}>
        {activeStep === 0 && (
          <Box>
            <input
              type="file"
              accept=".csv,.json"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="arquivo-input"
            />
            <label htmlFor="arquivo-input">
              <Button
                variant="contained"
                component="span"
                disabled={loading}
              >
                Selecionar Arquivo
              </Button>
            </label>
          </Box>
        )}

        {activeStep === 1 && previewData && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Preview dos Dados
            </Typography>
            
            <Typography>
              Tipo: {previewData.tipo.toUpperCase()}
            </Typography>
            
            <Typography>
              Total de Registros: {previewData.totalRegistros}
            </Typography>
            
            <Typography>
              Campos Identificados: {previewData.campos.join(', ')}
            </Typography>

            <Button
              variant="contained"
              onClick={iniciarProcessamento}
              disabled={loading}
              sx={{ mt: 2 }}
            >
              Iniciar Processamento
            </Button>
          </Box>
        )}

        {activeStep === 2 && (
          <Typography variant="h6" color="primary">
            Importação concluída com sucesso!
          </Typography>
        )}

        {loading && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <CircularProgress size={24} sx={{ mr: 1 }} />
            <Typography>
              {progress > 0 ? `Processando... ${progress}%` : 'Carregando...'}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}; 