import { Pagamento } from '../../domain/entities/Pagamento';
import { Fornecedor } from '../../domain/entities/Fornecedor';
import { CNPJService } from '../../infrastructure/services/CNPJService';
import { PagamentoRepository } from '../../domain/repositories/PagamentoRepository';
import { FornecedorRepository } from '../../domain/repositories/FornecedorRepository';

export class AuditoriaService {
  private fornecedoresCache: Map<string, Fornecedor> = new Map();
  private retencoesCache: Map<string, number> = new Map();

  constructor(
    private readonly cnpjService: CNPJService,
    private readonly pagamentoRepository: PagamentoRepository,
    private readonly fornecedorRepository: FornecedorRepository
  ) {}

  public async processarPagamento(pagamento: Pagamento): Promise<Pagamento> {
    let fornecedor = await this.getFornecedor(pagamento.fornecedorId);

    // Aplicar retenções baseadas na atividade principal
    const aliquotaRetencao = fornecedor.atividadePrincipal.aliquotaRetencao;
    pagamento.aplicarRetencao('ISS', aliquotaRetencao);

    // Marcar pagamento como processado
    pagamento.marcarComoProcessado();
    await this.pagamentoRepository.save(pagamento);

    return pagamento;
  }

  private async getFornecedor(fornecedorId: string): Promise<Fornecedor> {
    // Verificar cache primeiro
    if (this.fornecedoresCache.has(fornecedorId)) {
      return this.fornecedoresCache.get(fornecedorId)!;
    }

    let fornecedor = await this.fornecedorRepository.findById(fornecedorId);

    if (!fornecedor) {
      fornecedor = await this.cnpjService.buscarCNPJ(fornecedorId);
      await this.fornecedorRepository.save(fornecedor);
    }

    // Adicionar ao cache
    this.fornecedoresCache.set(fornecedorId, fornecedor);
    return fornecedor;
  }

  public async auditarPagamento(pagamentoId: string): Promise<Pagamento> {
    const pagamento = await this.pagamentoRepository.findById(pagamentoId);
    if (!pagamento) {
      throw new Error('Pagamento não encontrado');
    }

    const fornecedor = await this.getFornecedor(pagamento.fornecedorId);

    // Verificar e aplicar retenções adicionais se necessário
    await this.aplicarRetencoesAdicionais(pagamento, fornecedor);

    // Marcar pagamento como auditado
    pagamento.marcarComoAuditado();
    await this.pagamentoRepository.save(pagamento);

    return pagamento;
  }

  private async aplicarRetencoesAdicionais(pagamento: Pagamento, fornecedor: Fornecedor): Promise<void> {
    const cacheKey = `${pagamento.valor}-${fornecedor.id}`;
    
    // Verificar cache de retenções
    if (this.retencoesCache.has(cacheKey)) {
      const aliquota = this.retencoesCache.get(cacheKey)!;
      pagamento.aplicarRetencao('ISS', aliquota);
      return;
    }

    // Verificar valor mínimo para retenções
    if (pagamento.valor <= 1000) {
      return;
    }

    // Aplicar retenções baseadas nas atividades secundárias
    const aliquotasSecundarias = fornecedor.atividadesSecundarias
      .filter(atividade => atividade.aliquotaRetencao > 0)
      .map(atividade => ({
        codigo: atividade.codigo,
        aliquota: atividade.aliquotaRetencao
      }));

    // Aplicar todas as retenções de uma vez
    aliquotasSecundarias.forEach(({ codigo, aliquota }) => {
      pagamento.aplicarRetencao(`ISS-${codigo}`, aliquota);
    });

    // Aplicar retenções adicionais baseadas no valor
    if (pagamento.valor > 5000) {
      const retencoesPadrao = [
        { tipo: 'IR', aliquota: 1.5 },
        { tipo: 'CSLL', aliquota: 1.0 },
        { tipo: 'COFINS', aliquota: 3.0 },
        { tipo: 'PIS', aliquota: 0.65 }
      ];

      retencoesPadrao.forEach(({ tipo, aliquota }) => {
        pagamento.aplicarRetencao(tipo, aliquota);
      });
    }

    // Armazenar no cache
    const totalAliquota = pagamento.retencoes.reduce((total, ret) => total + ret.aliquota, 0);
    this.retencoesCache.set(cacheKey, totalAliquota);
  }

  public async gerarRelatorioAuditoria(clienteId: string, periodo: { inicio: Date; fim: Date }): Promise<{
    totalPagamentos: number;
    totalRetencoes: number;
    pagamentos: Pagamento[];
  }> {
    const pagamentos = await this.pagamentoRepository.findByClienteAndPeriodo(
      clienteId,
      periodo.inicio,
      periodo.fim
    );

    // Calcular totais em uma única iteração
    const { totalPagamentos, totalRetencoes } = pagamentos.reduce(
      (acc, pag) => ({
        totalPagamentos: acc.totalPagamentos + pag.valor,
        totalRetencoes: acc.totalRetencoes + (pag.valor - pag.getValorLiquido())
      }),
      { totalPagamentos: 0, totalRetencoes: 0 }
    );

    return {
      totalPagamentos,
      totalRetencoes,
      pagamentos
    };
  }
} 