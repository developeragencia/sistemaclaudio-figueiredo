import axios from 'axios';
import { supabase } from '../config/supabase';
import { BancoCentralService } from './BancoCentralService';

interface SelicResponse {
  data: string;
  valor: string;
}

interface SelicData {
  data: string;
  valor: number;
}

export class SelicService {
  private readonly API_URL = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados';
  private cacheKey = 'selic_cache';
  private cacheDuration = 24 * 60 * 60 * 1000; // 24 horas em milissegundos
  private readonly table = 'taxa_selic';
  private readonly bancoCentralService = new BancoCentralService();

  async getTaxaSelic(): Promise<number> {
    try {
      // Verificar cache
      const cachedData = this.getCache();
      if (cachedData) {
        return cachedData.valor;
      }

      // Buscar taxa atual
      const response = await axios.get<SelicResponse[]>(`${this.API_URL}/ultimos/1`);
      const taxa = parseFloat(response.data[0].valor);

      // Atualizar cache
      this.setCache({ valor: taxa, timestamp: Date.now() });

      return taxa;
    } catch (error) {
      console.error('Erro ao buscar taxa SELIC:', error);
      throw error;
    }
  }

  async getHistoricoSelic(dataInicio: Date, dataFim: Date): Promise<SelicResponse[]> {
    try {
      const inicio = this.formatarData(dataInicio);
      const fim = this.formatarData(dataFim);

      const response = await axios.get<SelicResponse[]>(
        `${this.API_URL}?dataInicial=${inicio}&dataFinal=${fim}`
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar histórico SELIC:', error);
      throw error;
    }
  }

  async calcularCorrecaoMonetaria(valor: number, dataInicial: Date): Promise<number> {
    try {
      // Buscar taxas Selic do período
      const { data: taxas, error } = await supabase
        .from(this.table)
        .select('*')
        .gte('data', dataInicial.toISOString())
        .lte('data', new Date().toISOString())
        .order('data');

      if (error) throw error;

      if (!taxas || taxas.length === 0) {
        return valor;
      }

      // Calcular correção
      let valorCorrigido = valor;
      let dataAnterior = dataInicial;

      taxas.forEach((taxa: SelicData) => {
        const dias = Math.ceil(
          (new Date(taxa.data).getTime() - dataAnterior.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (dias > 0) {
          const taxaDiaria = taxa.valor / 100 / 252; // Taxa anual convertida para diária
          valorCorrigido *= Math.pow(1 + taxaDiaria, dias);
        }

        dataAnterior = new Date(taxa.data);
      });

      return Number(valorCorrigido.toFixed(2));
    } catch (error) {
      console.error('Erro ao calcular correção monetária:', error);
      throw error;
    }
  }

  async atualizarTaxaSelic() {
    try {
      // Buscar última taxa registrada
      const { data: ultimaTaxa, error: errorUltima } = await supabase
        .from(this.table)
        .select('*')
        .order('data', { ascending: false })
        .limit(1)
        .single();

      if (errorUltima && errorUltima.code !== 'PGRST116') {
        throw errorUltima;
      }

      // Buscar taxa atual da API do Banco Central
      const taxaAtual = await this.buscarTaxaSelicAtual();

      // Se não houver taxa registrada ou se a taxa atual for diferente
      if (!ultimaTaxa || ultimaTaxa.valor !== taxaAtual.valor) {
        const { error: errorInsert } = await supabase
          .from(this.table)
          .insert([{
            data: taxaAtual.data,
            valor: taxaAtual.valor
          }]);

        if (errorInsert) throw errorInsert;
      }
    } catch (error) {
      console.error('Erro ao atualizar taxa Selic:', error);
      throw error;
    }
  }

  private async buscarTaxaSelicAtual(): Promise<SelicData> {
    try {
      const taxa = await this.bancoCentralService.getTaxaSelicAtual();
      return {
        data: new Date().toISOString(),
        valor: taxa
      };
    } catch (error) {
      console.error('Erro ao buscar taxa Selic atual:', error);
      throw error;
    }
  }

  limparCache(): void {
    localStorage.removeItem(this.cacheKey);
  }

  private getCache(): { valor: number; timestamp: number } | null {
    const cached = localStorage.getItem(this.cacheKey);
    if (!cached) return null;

    const data = JSON.parse(cached);
    const agora = Date.now();

    if (agora - data.timestamp > this.cacheDuration) {
      this.limparCache();
      return null;
    }

    return data;
  }

  private setCache(data: { valor: number; timestamp: number }): void {
    localStorage.setItem(this.cacheKey, JSON.stringify(data));
  }

  private formatarData(data: Date): string {
    return data.toLocaleDateString('pt-BR').split('/').reverse().join('');
  }
} 