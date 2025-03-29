import axios from 'axios';
import { Fornecedor } from '../../domain/entities/Fornecedor';
import { AtividadeEconomica } from '../../domain/entities/AtividadeEconomica';

export class CNPJService {
  private readonly apiKey = 'l7voA9Wjb7XLFe0nUVjCmrwEXV5wK076D7XFVx4M3Z27';
  private readonly baseUrl = 'https://www.cnpj.ws/api/v1';

  constructor() {
    this.setupAxios();
  }

  private setupAxios(): void {
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.apiKey}`;
  }

  public async buscarCNPJ(cnpj: string): Promise<Fornecedor> {
    try {
      const response = await axios.get(`${this.baseUrl}/cnpj/${cnpj}`);
      const data = response.data;

      const atividadePrincipal = new AtividadeEconomica(
        data.atividade_principal.codigo,
        data.atividade_principal.descricao,
        await this.buscarAliquotaRetencao(data.atividade_principal.codigo)
      );

      const atividadesSecundarias = await Promise.all(
        data.atividades_secundarias.map(async (atividade) => {
          return new AtividadeEconomica(
            atividade.codigo,
            atividade.descricao,
            await this.buscarAliquotaRetencao(atividade.codigo)
          );
        })
      );

      return new Fornecedor(
        data.cnpj,
        data.cnpj,
        data.razao_social,
        data.nome_fantasia,
        data.email,
        data.telefone,
        {
          logradouro: data.logradouro,
          numero: data.numero,
          complemento: data.complemento,
          bairro: data.bairro,
          cidade: data.municipio,
          estado: data.uf,
          cep: data.cep
        },
        atividadePrincipal,
        atividadesSecundarias,
        data.situacao,
        new Date(data.data_situacao),
        new Date(data.abertura),
        data.natureza_juridica,
        parseFloat(data.capital_social),
        data.porte
      );
    } catch (error) {
      throw new Error(`Erro ao buscar CNPJ: ${error.message}`);
    }
  }

  private async buscarAliquotaRetencao(codigoAtividade: string): Promise<number> {
    // TODO: Implementar lógica de busca de alíquota baseada no código da atividade
    // Por enquanto retorna um valor padrão
    return 5.0;
  }
} 