import { supabase } from '../config/supabase';

interface Proposta {
  id: string;
  cliente_id: string;
  representante_id: string;
  valor_total: number;
  status: 'rascunho' | 'enviada' | 'aprovada' | 'rejeitada';
  data_criacao: Date;
  data_envio?: Date;
  data_resposta?: Date;
  itens: PropostaItem[];
  historico: PropostaHistorico[];
}

interface PropostaItem {
  id: string;
  proposta_id: string;
  servico_id: string;
  quantidade: number;
  valor_unitario: number;
  valor_total: number;
  descricao: string;
}

interface PropostaHistorico {
  id: string;
  proposta_id: string;
  status: string;
  data: Date;
  usuario_id: string;
  observacao?: string;
}

export class PropostaService {
  async criarProposta(dados: Omit<Proposta, 'id' | 'status' | 'data_criacao' | 'historico'>): Promise<Proposta> {
    try {
      const { data: proposta, error } = await supabase
        .from('propostas')
        .insert({
          ...dados,
          status: 'rascunho',
          data_criacao: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      // Criar histórico inicial
      await this.adicionarHistorico(proposta.id, {
        status: 'rascunho',
        observacao: 'Proposta criada'
      });

      return proposta;
    } catch (error) {
      console.error('Erro ao criar proposta:', error);
      throw error;
    }
  }

  async enviarProposta(id: string, usuarioId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('propostas')
        .update({
          status: 'enviada',
          data_envio: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      await this.adicionarHistorico(id, {
        status: 'enviada',
        observacao: 'Proposta enviada para aprovação'
      });

      // Notificar cliente (implementar depois)
      await this.notificarCliente(id);
    } catch (error) {
      console.error('Erro ao enviar proposta:', error);
      throw error;
    }
  }

  async responderProposta(id: string, aprovada: boolean, observacao: string): Promise<void> {
    try {
      const status = aprovada ? 'aprovada' : 'rejeitada';

      const { error } = await supabase
        .from('propostas')
        .update({
          status,
          data_resposta: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      await this.adicionarHistorico(id, {
        status,
        observacao
      });

      // Notificar representante (implementar depois)
      await this.notificarRepresentante(id, status);
    } catch (error) {
      console.error('Erro ao responder proposta:', error);
      throw error;
    }
  }

  async adicionarItem(propostaId: string, item: Omit<PropostaItem, 'id' | 'proposta_id'>): Promise<PropostaItem> {
    try {
      const { data: itemCriado, error } = await supabase
        .from('proposta_itens')
        .insert({
          ...item,
          proposta_id: propostaId,
          valor_total: item.quantidade * item.valor_unitario
        })
        .select()
        .single();

      if (error) throw error;

      // Atualizar valor total da proposta
      await this.atualizarValorTotal(propostaId);

      return itemCriado;
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      throw error;
    }
  }

  async buscarProposta(id: string): Promise<Proposta | null> {
    try {
      const { data: proposta, error } = await supabase
        .from('propostas')
        .select(`
          *,
          itens:proposta_itens(*),
          historico:proposta_historico(*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return proposta;
    } catch (error) {
      console.error('Erro ao buscar proposta:', error);
      throw error;
    }
  }

  async listarPropostas(filtros: {
    cliente_id?: string;
    representante_id?: string;
    status?: string;
    data_inicio?: Date;
    data_fim?: Date;
  }): Promise<Proposta[]> {
    try {
      let query = supabase
        .from('propostas')
        .select(`
          *,
          itens:proposta_itens(*),
          historico:proposta_historico(*)
        `);

      // Aplicar filtros
      if (filtros.cliente_id) {
        query = query.eq('cliente_id', filtros.cliente_id);
      }
      if (filtros.representante_id) {
        query = query.eq('representante_id', filtros.representante_id);
      }
      if (filtros.status) {
        query = query.eq('status', filtros.status);
      }
      if (filtros.data_inicio) {
        query = query.gte('data_criacao', filtros.data_inicio.toISOString());
      }
      if (filtros.data_fim) {
        query = query.lte('data_criacao', filtros.data_fim.toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erro ao listar propostas:', error);
      throw error;
    }
  }

  private async adicionarHistorico(propostaId: string, dados: {
    status: string;
    observacao?: string;
  }): Promise<void> {
    try {
      const { error } = await supabase
        .from('proposta_historico')
        .insert({
          proposta_id: propostaId,
          status: dados.status,
          data: new Date().toISOString(),
          observacao: dados.observacao
        });

      if (error) throw error;
    } catch (error) {
      console.error('Erro ao adicionar histórico:', error);
      throw error;
    }
  }

  private async atualizarValorTotal(propostaId: string): Promise<void> {
    try {
      // Buscar todos os itens da proposta
      const { data: itens } = await supabase
        .from('proposta_itens')
        .select('valor_total')
        .eq('proposta_id', propostaId);

      // Calcular valor total
      const valorTotal = itens?.reduce((total, item) => total + item.valor_total, 0) || 0;

      // Atualizar proposta
      const { error } = await supabase
        .from('propostas')
        .update({ valor_total: valorTotal })
        .eq('id', propostaId);

      if (error) throw error;
    } catch (error) {
      console.error('Erro ao atualizar valor total:', error);
      throw error;
    }
  }

  private async notificarCliente(propostaId: string): Promise<void> {
    // TODO: Implementar sistema de notificações
    console.log('Notificar cliente sobre proposta:', propostaId);
  }

  private async notificarRepresentante(propostaId: string, status: string): Promise<void> {
    // TODO: Implementar sistema de notificações
    console.log('Notificar representante sobre proposta:', propostaId, status);
  }
} 