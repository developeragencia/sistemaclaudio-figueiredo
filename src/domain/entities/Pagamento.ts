export class Pagamento {
  constructor(
    public readonly id: string,
    public readonly fornecedorId: string,
    public readonly clienteId: string,
    public valor: number,
    public dataPagamento: Date,
    public descricao: string,
    public comprovante?: string,
    public retencoes: {
      tipo: string;
      aliquota: number;
      valor: number;
    }[] = [],
    public status: 'PENDENTE' | 'PROCESSADO' | 'AUDITADO' = 'PENDENTE',
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}

  public aplicarRetencao(tipo: string, aliquota: number): void {
    const valorRetencao = this.valor * (aliquota / 100);
    this.retencoes.push({
      tipo,
      aliquota,
      valor: valorRetencao
    });
    this.updatedAt = new Date();
  }

  public getValorLiquido(): number {
    const totalRetencoes = this.retencoes.reduce((total, retencao) => total + retencao.valor, 0);
    return this.valor - totalRetencoes;
  }

  public marcarComoProcessado(): void {
    this.status = 'PROCESSADO';
    this.updatedAt = new Date();
  }

  public marcarComoAuditado(): void {
    this.status = 'AUDITADO';
    this.updatedAt = new Date();
  }
} 