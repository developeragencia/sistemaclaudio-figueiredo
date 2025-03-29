import { SelicService } from '../services/SelicService';

async function atualizarTaxaSelic() {
  try {
    const selicService = new SelicService();
    await selicService.atualizarTaxaSelic();
    console.log('Taxa Selic atualizada com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar taxa Selic:', error);
  }
}

// Executar imediatamente
atualizarTaxaSelic();

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
  setInterval(atualizarTaxaSelic, 24 * 60 * 60 * 1000);
}, tempoAteProximaExecucao); 