import axios from 'axios';

interface SelicResponse {
  data: string;
  valor: string;
}

export class BancoCentralService {
  private readonly API_URL = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados';

  async getTaxaSelicAtual(): Promise<number> {
    try {
      const response = await axios.get(this.API_URL, {
        params: {
          formato: 'json',
          ultimos: 1
        }
      });

      if (!response.data || response.data.length === 0) {
        throw new Error('Dados da taxa Selic não encontrados');
      }

      const ultimaTaxa = response.data[0];
      return parseFloat(ultimaTaxa.valor);
    } catch (error) {
      console.error('Erro ao buscar taxa Selic:', error);
      throw error;
    }
  }

  async getHistoricoSelic(dataInicio: Date, dataFim: Date): Promise<SelicResponse[]> {
    try {
      const response = await axios.get(this.API_URL, {
        params: {
          formato: 'json',
          dataInicial: this.formatarData(dataInicio),
          dataFinal: this.formatarData(dataFim)
        }
      });

      if (!response.data) {
        throw new Error('Dados do histórico da taxa Selic não encontrados');
      }

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar histórico da taxa Selic:', error);
      throw error;
    }
  }

  private formatarData(data: Date): string {
    return data.toISOString().split('T')[0].split('-').reverse().join('/');
  }
} 