import { PagamentoService } from '../services/PagamentoService';
import { formatarMoeda } from '../utils/formatters';

async function gerarRelatorioRetencoes() {
  try {
    const pagamentoService = new PagamentoService();
    const relatorio = await pagamentoService.gerarRelatorioRetencoes();

    console.log('=== Relatório de Retenções ===');
    console.log(`Total de Pagamentos: ${relatorio.total_pagamentos}`);
    console.log(`Valor Total Bruto: ${formatarMoeda(relatorio.valor_total_bruto)}`);
    console.log(`Valor Total Líquido: ${formatarMoeda(relatorio.valor_total_liquido)}`);
    console.log(`Valor Total Retenções: ${formatarMoeda(relatorio.valor_total_retencoes)}`);
    
    console.log('\nRetenções por Tipo:');
    Object.entries(relatorio.retencoes_por_tipo).forEach(([tipo, quantidade]) => {
      console.log(`${tipo}: ${quantidade}`);
    });

    console.log('\nPagamentos por Status:');
    Object.entries(relatorio.pagamentos_por_status).forEach(([status, quantidade]) => {
      console.log(`${status}: ${quantidade}`);
    });

    // TODO: Enviar relatório por e-mail ou salvar em arquivo
  } catch (error) {
    console.error('Erro ao gerar relatório de retenções:', error);
  }
}

// Executar imediatamente
gerarRelatorioRetencoes();

// Agendar para rodar mensalmente no primeiro dia do mês às 00:00
const agora = new Date();
const proximoMes = new Date(agora.getFullYear(), agora.getMonth() + 1, 1, 0, 0, 0);
const tempoAteProximaExecucao = proximoMes.getTime() - agora.getTime();

setTimeout(() => {
  // Executar mensalmente
  setInterval(gerarRelatorioRetencoes, 30 * 24 * 60 * 60 * 1000);
}, tempoAteProximaExecucao); 