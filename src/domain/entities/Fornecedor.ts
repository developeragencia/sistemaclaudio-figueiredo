import { AtividadeEconomica } from './AtividadeEconomica';

export class Fornecedor {
  constructor(
    public readonly id: string,
    public readonly cnpj: string,
    public razaoSocial: string,
    public nomeFantasia: string,
    public email: string,
    public telefone: string,
    public endereco: {
      logradouro: string;
      numero: string;
      complemento?: string;
      bairro: string;
      cidade: string;
      estado: string;
      cep: string;
    },
    public atividadePrincipal: AtividadeEconomica,
    public atividadesSecundarias: AtividadeEconomica[],
    public situacaoCadastral: string,
    public dataSituacaoCadastral: Date,
    public dataAbertura: Date,
    public naturezaJuridica: string,
    public capitalSocial: number,
    public porte: string,
    public status: 'ATIVO' | 'INATIVO' = 'ATIVO',
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}

  public ativar(): void {
    this.status = 'ATIVO';
    this.updatedAt = new Date();
  }

  public inativar(): void {
    this.status = 'INATIVO';
    this.updatedAt = new Date();
  }

  public isAtivo(): boolean {
    return this.status === 'ATIVO';
  }
} 