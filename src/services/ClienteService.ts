import { supabase } from '../config/supabase';

export interface Cliente {
  id: string;
  razao_social: string;
  nome_fantasia: string;
  cnpj: string;
  inscricao_estadual?: string;
  inscricao_municipal?: string;
  endereco: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  telefone: string;
  email: string;
  contato_nome: string;
  contato_telefone: string;
  contato_email: string;
  status: 'ativo' | 'inativo';
  representante_id: string;
  data_cadastro: string;
  ultima_atualizacao: string;
}

export interface ClienteFiltros {
  status?: string;
  representante_id?: string;
  busca?: string;
}

export class ClienteService {
  private readonly table = 'clientes';

  async listarClientes(filtros: ClienteFiltros = {}) {
    try {
      let query = supabase
        .from(this.table)
        .select('*')
        .order('razao_social');

      if (filtros.status) {
        query = query.eq('status', filtros.status);
      }

      if (filtros.representante_id) {
        query = query.eq('representante_id', filtros.representante_id);
      }

      if (filtros.busca) {
        query = query.or(
          `razao_social.ilike.%${filtros.busca}%,nome_fantasia.ilike.%${filtros.busca}%,cnpj.ilike.%${filtros.busca}%`
        );
      }

      const { data, error } = await query;

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Erro ao listar clientes:', error);
      throw error;
    }
  }

  async getCliente(id: string) {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
      throw error;
    }
  }

  async criarCliente(cliente: Omit<Cliente, 'id' | 'data_cadastro' | 'ultima_atualizacao'>) {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .insert([{
          ...cliente,
          data_cadastro: new Date().toISOString(),
          ultima_atualizacao: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      throw error;
    }
  }

  async atualizarCliente(id: string, cliente: Partial<Cliente>) {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .update({
          ...cliente,
          ultima_atualizacao: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      throw error;
    }
  }

  async alterarStatus(id: string, status: 'ativo' | 'inativo') {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .update({
          status,
          ultima_atualizacao: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Erro ao alterar status do cliente:', error);
      throw error;
    }
  }

  async verificarCNPJDuplicado(cnpj: string, excluirId?: string) {
    try {
      let query = supabase
        .from(this.table)
        .select('id')
        .eq('cnpj', cnpj);

      if (excluirId) {
        query = query.neq('id', excluirId);
      }

      const { data, error } = await query;

      if (error) throw error;

      return data.length > 0;
    } catch (error) {
      console.error('Erro ao verificar CNPJ duplicado:', error);
      throw error;
    }
  }

  async buscarPorCNPJ(cnpj: string) {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .select('*')
        .eq('cnpj', cnpj)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      return data;
    } catch (error) {
      console.error('Erro ao buscar cliente por CNPJ:', error);
      throw error;
    }
  }
} 