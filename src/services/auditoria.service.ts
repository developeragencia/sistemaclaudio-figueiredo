import { supabase } from '../lib/supabaseClient';
import { CNPJWSService } from './cnpjws.service';
import type { Fornecedor, Pagamento, AliquotaRetencao, Auditoria } from '../types/database.types';

interface FiltrosAuditoria {
  dataInicio?: string;
  dataFim?: string;
  fornecedorId?: string;
  tipoServico?: string;
  valorMinimo?: number;
  valorMaximo?: number;
}

interface ResultadoAuditoria {
  auditorias: Auditoria[];
  fornecedores: Record<string, {
    razao_social: string;
    cnpj: string;
    atividade_principal: string;
  }>;
  pagamentos: Record<string, {
    data_pagamento: string;
    numero_nota: string;
    tipo_servico: string;
  }>;
}

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

  async processarPagamentosCliente(clienteId: string, filtros?: FiltrosAuditoria): Promise<ResultadoAuditoria> {
    try {
      // Construir query base
      let query = supabase
        .from('pagamentos')
        .select('*')
        .eq('cliente_id', clienteId);

      // Aplicar filtros
      if (filtros?.dataInicio) {
        query = query.gte('data_pagamento', filtros.dataInicio);
      }
      if (filtros?.dataFim) {
        query = query.lte('data_pagamento', filtros.dataFim);
      }
      if (filtros?.fornecedorId) {
        query = query.eq('fornecedor_id', filtros.fornecedorId);
      }
      if (filtros?.tipoServico) {
        query = query.eq('tipo_servico', filtros.tipoServico);
      }
      if (filtros?.valorMinimo) {
        query = query.gte('valor', filtros.valorMinimo);
      }
      if (filtros?.valorMaximo) {
        query = query.lte('valor', filtros.valorMaximo);
      }

      // Executar query
      const { data: pagamentos, error: pagamentosError } = await query;

      if (pagamentosError) throw pagamentosError;
      if (!pagamentos?.length) return { auditorias: [], fornecedores: {}, pagamentos: {} };

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

      let todosFornecedores = fornecedoresExistentes || [];

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

        const { data: fornecedoresInseridos, error: insertError } = await supabase
          .from('fornecedores')
          .insert(novosFornecedores)
          .select();

        if (insertError) throw insertError;
        if (fornecedoresInseridos) {
          todosFornecedores = [...todosFornecedores, ...fornecedoresInseridos];
        }
      }

      // Processa cada pagamento
      const auditorias = await Promise.all(
        pagamentos.map(pagamento => this.processarPagamento(pagamento))
      );

      // Prepara os dados para retorno
      const fornecedoresMap = todosFornecedores.reduce((acc, f) => ({
        ...acc,
        [f.id]: {
          razao_social: f.razao_social,
          cnpj: f.cnpj,
          atividade_principal: f.atividade_principal
        }
      }), {});

      const pagamentosMap = pagamentos.reduce((acc, p) => ({
        ...acc,
        [p.id]: {
          data_pagamento: p.data_pagamento,
          numero_nota: p.numero_nota,
          tipo_servico: p.tipo_servico
        }
      }), {});

      return {
        auditorias,
        fornecedores: fornecedoresMap,
        pagamentos: pagamentosMap
      };
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

  async buscarFornecedores(clienteId: string): Promise<Fornecedor[]> {
    const { data, error } = await supabase
      .from('pagamentos')
      .select('fornecedor_id')
      .eq('cliente_id', clienteId)
      .then(async ({ data: pagamentos, error }) => {
        if (error) throw error;
        if (!pagamentos?.length) return { data: [] };

        const fornecedoresIds = [...new Set(pagamentos.map(p => p.fornecedor_id))];
        return await supabase
          .from('fornecedores')
          .select('*')
          .in('id', fornecedoresIds);
      });

    if (error) throw error;
    return data || [];
  }

  async buscarTiposServico(clienteId: string): Promise<string[]> {
    const { data, error } = await supabase
      .from('pagamentos')
      .select('tipo_servico')
      .eq('cliente_id', clienteId);

    if (error) throw error;
    return [...new Set(data?.map(p => p.tipo_servico).filter(Boolean) || [])];
  }
} 