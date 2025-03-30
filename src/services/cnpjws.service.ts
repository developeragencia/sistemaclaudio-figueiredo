import axios from 'axios';

const API_KEY = 'l7voA9Wjb7XLFe0nUVjCmrwEXV5wK076D7XFVx4M3Z27';
const BASE_URL = 'https://www.cnpj.ws/api/v1';

interface CNPJResponse {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  atividade_principal: {
    codigo: string;
    descricao: string;
  };
  atividades_secundarias: Array<{
    codigo: string;
    descricao: string;
  }>;
  natureza_juridica: string;
  logradouro: string;
  numero: string;
  complemento: string;
  cep: string;
  bairro: string;
  municipio: string;
  uf: string;
  email: string;
  telefone: string;
  data_situacao: string;
}

export class CNPJWSService {
  private static instance: CNPJWSService;
  private constructor() {}

  static getInstance(): CNPJWSService {
    if (!CNPJWSService.instance) {
      CNPJWSService.instance = new CNPJWSService();
    }
    return CNPJWSService.instance;
  }

  async consultarCNPJ(cnpj: string): Promise<CNPJResponse> {
    try {
      const response = await axios.get(`${BASE_URL}/cnpj/${cnpj}`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Accept': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Erro ao consultar CNPJ: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  async consultarCNPJEmLote(cnpjs: string[]): Promise<CNPJResponse[]> {
    try {
      const promises = cnpjs.map(cnpj => this.consultarCNPJ(cnpj));
      return await Promise.all(promises);
    } catch (error) {
      throw new Error(`Erro ao consultar CNPJs em lote: ${error.message}`);
    }
  }
} 