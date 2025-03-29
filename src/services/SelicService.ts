import axios from 'axios';

interface SelicResponse {
  data: Array<{
    data: string;
    valor: number;
  }>;
}

export class SelicService {
  private readonly API_URL = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados';
  private cache: Map<string, number> = new Map();

  async getTaxaSelic(): Promise<number> {
    try {
      const hoje = new Date().toISOString().split('T')[0];
      
      // Verificar cache
      if (this.cache.has(hoje)) {
        return this.cache.get(hoje)!;
      }

      // Buscar últimos 30 dias de taxa Selic
      const response = await axios.get<SelicResponse>(
        `${this.API_URL}/ultimos/30?formato=json`
      );

      // Pegar a taxa mais recente
      const ultimaTaxa = response.data[response.data.length - 1].valor;
      
      // Armazenar no cache
      this.cache.set(hoje, ultimaTaxa);

      return ultimaTaxa;
    } catch (error) {
      console.error('Erro ao buscar taxa Selic:', error);
      throw new Error('Não foi possível obter a taxa Selic atual');
    }
  }

  async getHistoricoSelic(dataInicio: Date, dataFim: Date): Promise<Array<{ data: string; valor: number }>> {
    try {
      const inicio = dataInicio.toISOString().split('T')[0];
      const fim = dataFim.toISOString().split('T')[0];

      const response = await axios.get<SelicResponse>(
        `${this.API_URL}/periodo/${inicio}/${fim}?formato=json`
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar histórico Selic:', error);
      throw new Error('Não foi possível obter o histórico da taxa Selic');
    }
  }

  async calcularCorrecaoMonetaria(valor: number, dataInicial: Date): Promise<{
    valorCorrigido: number;
    taxaAcumulada: number;
    diasContados: number;
  }> {
    try {
      const hoje = new Date();
      const historico = await this.getHistoricoSelic(dataInicial, hoje);
      
      // Calcular taxa acumulada
      const taxaAcumulada = historico.reduce((acc, curr) => acc + curr.valor, 0);
      
      // Calcular dias entre as datas
      const diasContados = Math.floor((hoje.getTime() - dataInicial.getTime()) / (1000 * 60 * 60 * 24));
      
      // Calcular valor corrigido
      const valorCorrigido = valor * (1 + (taxaAcumulada * diasContados) / 365);

      return {
        valorCorrigido,
        taxaAcumulada,
        diasContados
      };
    } catch (error) {
      console.error('Erro ao calcular correção monetária:', error);
      throw new Error('Não foi possível calcular a correção monetária');
    }
  }

  limparCache(): void {
    this.cache.clear();
  }
} 