import { supabase } from '../config/supabase';

interface Retencao {
  tipo: string;
  aliquota: number;
  valor: number;
}

interface Pagamento {
  id: string;
  fornecedorId: string;
  valor: number;
  dataPagamento: Date;
  retencoes: Retencao[];
  status: 'PENDENTE' | 'PROCESSADO' | 'AUDITADO';
}

export class PagamentoService {
  async processarPagamento(pagamento: Pagamento): Promise<Pagamento> {
    try {
      // Buscar informações do fornecedor
      const { data: fornecedor } = await supabase
        .from('fornecedores')
        .select('*')
        .eq('id', pagamento.fornecedorId)
        .single();

      if (!fornecedor) {
        throw new Error('Fornecedor não encontrado');
      }

      // Aplicar retenções baseadas no CNAE
      const retencoes = await this.calcularRetencoes(pagamento.valor, fornecedor.cnae);
      
      // Atualizar pagamento com retenções
      const { data: pagamentoAtualizado, error } = await supabase
        .from('pagamentos')
        .update({
          retencoes,
          status: 'PROCESSADO',
          valor_liquido: pagamento.valor - retencoes.reduce((total, ret) => total + ret.valor, 0)
        })
        .eq('id', pagamento.id)
        .select()
        .single();

      if (error) throw error;

      return pagamentoAtualizado;
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      throw error;
    }
  }

  private async calcularRetencoes(valor: number, cnae: string): Promise<Retencao[]> {
    const retencoes: Retencao[] = [];

    // Buscar regras de retenção baseadas no CNAE
    const { data: regras } = await supabase
      .from('regras_retencao')
      .select('*')
      .eq('cnae', cnae);

    if (!regras?.length) {
      return retencoes;
    }

    // Aplicar cada regra de retenção
    regras.forEach(regra => {
      if (valor >= regra.valor_minimo) {
        retencoes.push({
          tipo: regra.tipo,
          aliquota: regra.aliquota,
          valor: (valor * regra.aliquota) / 100
        });
      }
    });

    return retencoes;
  }

  async auditarPagamento(pagamentoId: string): Promise<void> {
    try {
      const { data: pagamento } = await supabase
        .from('pagamentos')
        .select('*')
        .eq('id', pagamentoId)
        .single();

      if (!pagamento) {
        throw new Error('Pagamento não encontrado');
      }

      // Recalcular retenções para auditoria
      const retencoesAuditoria = await this.calcularRetencoes(pagamento.valor, pagamento.fornecedor_cnae);
      
      // Comparar retenções aplicadas com calculadas
      const diferencas = this.compararRetencoes(pagamento.retencoes, retencoesAuditoria);

      // Registrar resultado da auditoria
      await supabase.from('auditorias').insert([{
        pagamento_id: pagamentoId,
        diferencas,
        data_auditoria: new Date(),
        status: diferencas.length > 0 ? 'DIVERGENTE' : 'OK'
      }]);

      // Atualizar status do pagamento
      await supabase
        .from('pagamentos')
        .update({ status: 'AUDITADO' })
        .eq('id', pagamentoId);

    } catch (error) {
      console.error('Erro ao auditar pagamento:', error);
      throw error;
    }
  }

  private compararRetencoes(aplicadas: Retencao[], calculadas: Retencao[]): any[] {
    const diferencas = [];

    calculadas.forEach(retCalc => {
      const retAplicada = aplicadas.find(ret => ret.tipo === retCalc.tipo);
      
      if (!retAplicada) {
        diferencas.push({
          tipo: retCalc.tipo,
          status: 'NAO_APLICADA',
          valor_esperado: retCalc.valor
        });
      } else if (retAplicada.valor !== retCalc.valor) {
        diferencas.push({
          tipo: retCalc.tipo,
          status: 'VALOR_DIVERGENTE',
          valor_aplicado: retAplicada.valor,
          valor_esperado: retCalc.valor
        });
      }
    });

    return diferencas;
  }

  async atualizarSelic(pagamentoId: string): Promise<void> {
    try {
      const { data: pagamento } = await supabase
        .from('pagamentos')
        .select('*')
        .eq('id', pagamentoId)
        .single();

      if (!pagamento) {
        throw new Error('Pagamento não encontrado');
      }

      // Buscar taxa Selic atual
      const taxaSelic = await this.obterTaxaSelic();

      // Calcular correção
      const diasAtraso = this.calcularDiasAtraso(new Date(pagamento.data_pagamento));
      const correcao = (pagamento.valor * taxaSelic * diasAtraso) / 365;

      // Atualizar pagamento com correção
      await supabase
        .from('pagamentos')
        .update({
          correcao_selic: correcao,
          taxa_selic_aplicada: taxaSelic
        })
        .eq('id', pagamentoId);

    } catch (error) {
      console.error('Erro ao atualizar Selic:', error);
      throw error;
    }
  }

  private async obterTaxaSelic(): Promise<number> {
    // Implementar chamada à API do Banco Central
    return 13.75; // Taxa exemplo
  }

  private calcularDiasAtraso(dataPagamento: Date): number {
    const hoje = new Date();
    const diffTime = Math.abs(hoje.getTime() - dataPagamento.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
} 