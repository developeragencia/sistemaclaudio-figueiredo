import { AuditoriaService } from '../services/AuditoriaService';
import { PagamentoRepository } from '../../domain/repositories/PagamentoRepository';
import { FornecedorRepository } from '../../domain/repositories/FornecedorRepository';

interface ProcessarAuditoriaInput {
  clienteId: string;
  periodo: {
    inicio: Date;
    fim: Date;
  };
}

interface ProcessarAuditoriaOutput {
  totalPagamentos: number;
  totalRetencoes: number;
  pagamentos: {
    id: string;
    fornecedor: {
      cnpj: string;
      razaoSocial: string;
    };
    valor: number;
    valorLiquido: number;
    retencoes: {
      tipo: string;
      aliquota: number;
      valor: number;
    }[];
    dataPagamento: Date;
    status: string;
  }[];
}

export class ProcessarAuditoriaUseCase {
  private fornecedoresCache: Map<string, { cnpj: string; razaoSocial: string }> = new Map();

  constructor(
    private readonly auditoriaService: AuditoriaService,
    private readonly pagamentoRepository: PagamentoRepository,
    private readonly fornecedorRepository: FornecedorRepository
  ) {}

  public async execute(input: ProcessarAuditoriaInput): Promise<ProcessarAuditoriaOutput> {
    // Buscar todos os pagamentos do período
    const relatorio = await this.auditoriaService.gerarRelatorioAuditoria(
      input.clienteId,
      input.periodo
    );

    // Processar pagamentos em paralelo
    const pagamentosNaoAuditados = relatorio.pagamentos.filter(p => p.status !== 'AUDITADO');
    const batchSize = 5; // Processa 5 pagamentos por vez
    
    for (let i = 0; i < pagamentosNaoAuditados.length; i += batchSize) {
      const batch = pagamentosNaoAuditados.slice(i, i + batchSize);
      await Promise.all(
        batch.map(pagamento => this.auditoriaService.auditarPagamento(pagamento.id))
      );
    }

    // Gerar relatório final com os pagamentos atualizados
    const relatorioFinal = await this.auditoriaService.gerarRelatorioAuditoria(
      input.clienteId,
      input.periodo
    );

    // Buscar informações dos fornecedores em paralelo
    const fornecedoresIds = [...new Set(relatorioFinal.pagamentos.map(p => p.fornecedorId))];
    await Promise.all(
      fornecedoresIds.map(async (id) => {
        if (!this.fornecedoresCache.has(id)) {
          const fornecedor = await this.fornecedorRepository.findById(id);
          if (fornecedor) {
            this.fornecedoresCache.set(id, {
              cnpj: fornecedor.cnpj,
              razaoSocial: fornecedor.razaoSocial
            });
          }
        }
      })
    );

    // Mapear para o formato de saída usando o cache
    return {
      totalPagamentos: relatorioFinal.totalPagamentos,
      totalRetencoes: relatorioFinal.totalRetencoes,
      pagamentos: relatorioFinal.pagamentos.map(pagamento => ({
        id: pagamento.id,
        fornecedor: this.fornecedoresCache.get(pagamento.fornecedorId) || {
          cnpj: pagamento.fornecedorId,
          razaoSocial: 'Fornecedor não encontrado'
        },
        valor: pagamento.valor,
        valorLiquido: pagamento.getValorLiquido(),
        retencoes: pagamento.retencoes,
        dataPagamento: pagamento.dataPagamento,
        status: pagamento.status
      }))
    };
  }
} 