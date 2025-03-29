import { PagamentoService } from '../services/PagamentoService';

async function atualizarStatusAtrasados() {
  try {
    const pagamentoService = new PagamentoService();
    await pagamentoService.atualizarStatusAtrasados();
    console.log('Status dos pagamentos atrasados atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar status dos pagamentos atrasados:', error);
  }
}

// Executar imediatamente
atualizarStatusAtrasados();

// Agendar para rodar diariamente às 00:00
const agora = new Date();
const proximaExecucao = new Date(
  agora.getFullYear(),
  agora.getMonth(),
  agora.getDate() + 1,
  0, 0, 0
);

const tempoAteProximaExecucao = proximaExecucao.getTime() - agora.getTime();

setTimeout(() => {
  // Executar diariamente
  setInterval(atualizarStatusAtrasados, 24 * 60 * 60 * 1000);
}, tempoAteProximaExecucao); 