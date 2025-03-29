import { supabase } from '../config/supabase';
import { SelicService } from './SelicService';

export interface Pagamento {
  id: string;
  cliente_id: string;
  fornecedor_id: string;
  valor_bruto: number;
  valor_liquido: number;
  data_pagamento: string;
  data_vencimento: string;
  status: 'pendente' | 'pago' | 'atrasado' | 'cancelado';
  tipo_retencao: string[];
  valor_retencao: number;
  comprovante_url?: string;
  observacoes?: string;
  data_criacao: string;
  ultima_atualizacao: string;
}

export interface PagamentoFiltros {
  cliente_id?: string;
  fornecedor_id?: string;
  status?: string;
  data_inicio?: string;
  data_fim?: string;
}

export class PagamentoService {
  private readonly table = 'pagamentos';
  private readonly selicService = new SelicService();

  async listarPagamentos(filtros: PagamentoFiltros = {}) {
    try {
      let query = supabase
        .from(this.table)
        .select(`
          *,
          cliente:clientes(razao_social),
          fornecedor:fornecedores(razao_social)
        `)
        .order('data_vencimento', { ascending: false });

      if (filtros.cliente_id) {
        query = query.eq('cliente_id', filtros.cliente_id);
      }

      if (filtros.fornecedor_id) {
        query = query.eq('fornecedor_id', filtros.fornecedor_id);
      }

      if (filtros.status) {
        query = query.eq('status', filtros.status);
      }

      if (filtros.data_inicio) {
        query = query.gte('data_vencimento', filtros.data_inicio);
      }

      if (filtros.data_fim) {
        query = query.lte('data_vencimento', filtros.data_fim);
      }

      const { data, error } = await query;

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Erro ao listar pagamentos:', error);
      throw error;
    }
  }

  async getPagamento(id: string) {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .select(`
          *,
          cliente:clientes(razao_social),
          fornecedor:fornecedores(razao_social)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Erro ao buscar pagamento:', error);
      throw error;
    }
  }

  async criarPagamento(pagamento: Omit<Pagamento, 'id' | 'data_criacao' | 'ultima_atualizacao'>) {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .insert([{
          ...pagamento,
          data_criacao: new Date().toISOString(),
          ultima_atualizacao: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Erro ao criar pagamento:', error);
      throw error;
    }
  }

  async atualizarPagamento(id: string, pagamento: Partial<Pagamento>) {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .update({
          ...pagamento,
          ultima_atualizacao: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Erro ao atualizar pagamento:', error);
      throw error;
    }
  }

  async confirmarPagamento(id: string, comprovante_url?: string) {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .update({
          status: 'pago',
          data_pagamento: new Date().toISOString(),
          comprovante_url,
          ultima_atualizacao: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Erro ao confirmar pagamento:', error);
      throw error;
    }
  }

  async cancelarPagamento(id: string) {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .update({
          status: 'cancelado',
          ultima_atualizacao: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Erro ao cancelar pagamento:', error);
      throw error;
    }
  }

  async calcularRetencoes(valor: number, cnae: string) {
    try {
      // Buscar regras de retenção baseadas no CNAE
      const { data: regras, error } = await supabase
        .from('regras_retencao')
        .select('*')
        .eq('cnae', cnae)
        .single();

      if (error) throw error;

      if (!regras) {
        return {
          tipos: [],
          valor: 0
        };
      }

      const tipos: string[] = [];
      let valorTotal = 0;

      // Calcular retenções conforme regras
      if (regras.irrf && valor >= regras.irrf_valor_minimo) {
        tipos.push('IRRF');
        valorTotal += valor * (regras.irrf_aliquota / 100);
      }

      if (regras.pis) {
        tipos.push('PIS');
        valorTotal += valor * (regras.pis_aliquota / 100);
      }

      if (regras.cofins) {
        tipos.push('COFINS');
        valorTotal += valor * (regras.cofins_aliquota / 100);
      }

      if (regras.csll) {
        tipos.push('CSLL');
        valorTotal += valor * (regras.csll_aliquota / 100);
      }

      if (regras.inss && valor >= regras.inss_valor_minimo) {
        tipos.push('INSS');
        valorTotal += valor * (regras.inss_aliquota / 100);
      }

      if (regras.iss) {
        tipos.push('ISS');
        valorTotal += valor * (regras.iss_aliquota / 100);
      }

      return {
        tipos,
        valor: Number(valorTotal.toFixed(2))
      };
    } catch (error) {
      console.error('Erro ao calcular retenções:', error);
      throw error;
    }
  }

  async atualizarStatusAtrasados() {
    try {
      const hoje = new Date().toISOString().split('T')[0];

      const { data, error } = await supabase
        .from(this.table)
        .update({ status: 'atrasado' })
        .eq('status', 'pendente')
        .lt('data_vencimento', hoje);

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Erro ao atualizar status de pagamentos atrasados:', error);
      throw error;
    }
  }

  async calcularCorrecaoMonetaria(id: string) {
    try {
      const pagamento = await this.getPagamento(id);
      if (!pagamento || pagamento.status !== 'atrasado') {
        throw new Error('Pagamento não encontrado ou não está atrasado');
      }

      const dataVencimento = new Date(pagamento.data_vencimento);
      const valorCorrigido = await this.selicService.calcularCorrecaoMonetaria(
        pagamento.valor_liquido,
        dataVencimento
      );

      return {
        valor_original: pagamento.valor_liquido,
        valor_corrigido: valorCorrigido,
        diferenca: valorCorrigido - pagamento.valor_liquido
      };
    } catch (error) {
      console.error('Erro ao calcular correção monetária:', error);
      throw error;
    }
  }

  async gerarRelatorioRetencoes(filtros: PagamentoFiltros = {}) {
    try {
      const pagamentos = await this.listarPagamentos(filtros);
      
      const relatorio = {
        total_pagamentos: pagamentos.length,
        valor_total_bruto: 0,
        valor_total_liquido: 0,
        valor_total_retencoes: 0,
        retencoes_por_tipo: {} as Record<string, number>,
        pagamentos_por_status: {} as Record<string, number>
      };

      pagamentos.forEach(pagamento => {
        relatorio.valor_total_bruto += pagamento.valor_bruto;
        relatorio.valor_total_liquido += pagamento.valor_liquido;
        relatorio.valor_total_retencoes += pagamento.valor_retencao;

        // Contabilizar retenções por tipo
        pagamento.tipo_retencao.forEach(tipo => {
          relatorio.retencoes_por_tipo[tipo] = (relatorio.retencoes_por_tipo[tipo] || 0) + 1;
        });

        // Contabilizar pagamentos por status
        relatorio.pagamentos_por_status[pagamento.status] = 
          (relatorio.pagamentos_por_status[pagamento.status] || 0) + 1;
      });

      return relatorio;
    } catch (error) {
      console.error('Erro ao gerar relatório de retenções:', error);
      throw error;
    }
  }
}