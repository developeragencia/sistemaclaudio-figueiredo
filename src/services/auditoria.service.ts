import { supabase } from '../lib/supabaseClient';
import { CNPJWSService } from './cnpjws.service';
import type { Fornecedor, Pagamento, AliquotaRetencao, Auditoria } from '../types/database.types';

export class AuditoriaService {
  private static instance: AuditoriaService;
  private cnpjService: CNPJWSService;

  private constructor() {
    this.cnpjService = CNPJWSService.getInstance();
  }

  static getInstance(): AuditoriaService {
    if (!AuditoriaService.instance) {
      AuditoriaService.instance = new AuditoriaService();
    }
    return AuditoriaService.instance;
  }

  async processarPagamentosCliente(clienteId: string): Promise<Auditoria[]> {
    try {
      // Busca todos os pagamentos do cliente
      const { data: pagamentos, error: pagamentosError } = await supabase
        .from('pagamentos')
        .select('*')
        .eq('cliente_id', clienteId);

      if (pagamentosError) throw pagamentosError;
      if (!pagamentos?.length) return [];

      // Coleta todos os CNPJs dos fornecedores únicos
      const fornecedoresIds = [...new Set(pagamentos.map(p => p.fornecedor_id))];

      // Verifica fornecedores existentes
      const { data: fornecedoresExistentes, error: fornecedoresError } = await supabase
        .from('fornecedores')
        .select('*')
        .in('id', fornecedoresIds);

      if (fornecedoresError) throw fornecedoresError;

      // Identifica fornecedores que precisam ser consultados
      const fornecedoresNovos = fornecedoresIds.filter(
        id => !fornecedoresExistentes?.find(f => f.id === id)
      );

      // Consulta novos fornecedores na API do CNPJ.ws
      if (fornecedoresNovos.length) {
        const cnpjsResponse = await this.cnpjService.consultarCNPJEmLote(fornecedoresNovos);
        
        // Insere novos fornecedores no banco
        const novosFornecedores = cnpjsResponse.map(resp => ({
          cnpj: resp.cnpj,
          razao_social: resp.razao_social,
          nome_fantasia: resp.nome_fantasia,
          atividade_principal: resp.atividade_principal.descricao,
          atividade_secundaria: resp.atividades_secundarias.map(a => a.descricao),
          natureza_juridica: resp.natureza_juridica,
          logradouro: resp.logradouro,
          numero: resp.numero,
          complemento: resp.complemento,
          cep: resp.cep,
          bairro: resp.bairro,
          municipio: resp.municipio,
          uf: resp.uf,
          email: resp.email,
          telefone: resp.telefone,
          data_situacao: resp.data_situacao,
          status: 'ativo'
        }));

        const { error: insertError } = await supabase
          .from('fornecedores')
          .insert(novosFornecedores);

        if (insertError) throw insertError;
      }

      // Processa cada pagamento
      const auditorias = await Promise.all(
        pagamentos.map(pagamento => this.processarPagamento(pagamento))
      );

      return auditorias;
    } catch (error) {
      throw new Error(`Erro ao processar pagamentos: ${error.message}`);
    }
  }

  private async processarPagamento(pagamento: Pagamento): Promise<Auditoria> {
    try {
      // Busca fornecedor
      const { data: fornecedor, error: fornecedorError } = await supabase
        .from('fornecedores')
        .select('*')
        .eq('id', pagamento.fornecedor_id)
        .single();

      if (fornecedorError) throw fornecedorError;

      // Busca alíquotas baseadas na atividade principal do fornecedor
      const { data: aliquota, error: aliquotaError } = await supabase
        .from('aliquotas_retencao')
        .select('*')
        .eq('atividade', fornecedor.atividade_principal)
        .single();

      if (aliquotaError) throw aliquotaError;

      // Calcula retenções
      const auditoria = this.calcularRetencoes(pagamento, aliquota);

      // Salva auditoria
      const { data: auditoriaInserida, error: auditoriaError } = await supabase
        .from('auditorias')
        .insert(auditoria)
        .select()
        .single();

      if (auditoriaError) throw auditoriaError;

      return auditoriaInserida;
    } catch (error) {
      throw new Error(`Erro ao processar pagamento: ${error.message}`);
    }
  }

  private calcularRetencoes(pagamento: Pagamento, aliquota: AliquotaRetencao): Omit<Auditoria, 'id' | 'created_at'> {
    const valor = pagamento.valor;
    
    // Só aplica retenções se o valor for maior que o mínimo
    if (valor <= aliquota.valor_minimo_retencao) {
      return {
        pagamento_id: pagamento.id,
        valor_original: valor,
        valor_ir: 0,
        valor_pis: 0,
        valor_cofins: 0,
        valor_csll: 0,
        valor_iss: 0,
        valor_liquido: valor
      };
    }

    const valor_ir = valor * (aliquota.aliquota_ir / 100);
    const valor_pis = valor * (aliquota.aliquota_pis / 100);
    const valor_cofins = valor * (aliquota.aliquota_cofins / 100);
    const valor_csll = valor * (aliquota.aliquota_csll / 100);
    const valor_iss = valor * (aliquota.aliquota_iss / 100);

    const valor_liquido = valor - (valor_ir + valor_pis + valor_cofins + valor_csll + valor_iss);

    return {
      pagamento_id: pagamento.id,
      valor_original: valor,
      valor_ir,
      valor_pis,
      valor_cofins,
      valor_csll,
      valor_iss,
      valor_liquido
    };
  }
} 