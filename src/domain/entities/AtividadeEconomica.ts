export class AtividadeEconomica {
  constructor(
    public readonly codigo: string,
    public readonly descricao: string,
    public readonly aliquotaRetencao: number
  ) {}

  public calcularRetencao(valorBase: number): number {
    return valorBase * (this.aliquotaRetencao / 100);
  }
} 