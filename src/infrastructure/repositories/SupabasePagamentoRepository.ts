import { SupabaseClient } from '@supabase/supabase-js';
import { Pagamento } from '../../domain/entities/Pagamento';
import { PagamentoRepository } from '../../domain/repositories/PagamentoRepository';

export class SupabasePagamentoRepository implements PagamentoRepository {
  private readonly tableName = 'pagamentos';

  constructor(private readonly supabase: SupabaseClient) {}

  async save(pagamento: Pagamento): Promise<void> {
    const { error } = await this.supabase
      .from(this.tableName)
      .upsert({
        id: pagamento.id,
        fornecedor_id: pagamento.fornecedorId,
        cliente_id: pagamento.clienteId,
        valor: pagamento.valor,
        data_pagamento: pagamento.dataPagamento.toISOString(),
        descricao: pagamento.descricao,
        comprovante: pagamento.comprovante,
        retencoes: pagamento.retencoes,
        status: pagamento.status,
        created_at: pagamento.createdAt.toISOString(),
        updated_at: pagamento.updatedAt.toISOString()
      });

    if (error) throw error;
  }

  async findById(id: string): Promise<Pagamento | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return null;

    return this.mapToDomain(data);
  }

  async findByClienteAndPeriodo(clienteId: string, inicio: Date, fim: Date): Promise<Pagamento[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('cliente_id', clienteId)
      .gte('data_pagamento', inicio.toISOString())
      .lte('data_pagamento', fim.toISOString());

    if (error) throw error;
    return data.map(this.mapToDomain);
  }

  async findByFornecedor(fornecedorId: string): Promise<Pagamento[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('fornecedor_id', fornecedorId);

    if (error) throw error;
    return data.map(this.mapToDomain);
  }

  async update(pagamento: Pagamento): Promise<void> {
    await this.save(pagamento);
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  private mapToDomain(data: any): Pagamento {
    return new Pagamento(
      data.id,
      data.fornecedor_id,
      data.cliente_id,
      data.valor,
      new Date(data.data_pagamento),
      data.descricao,
      data.comprovante,
      data.retencoes,
      data.status,
      new Date(data.created_at),
      new Date(data.updated_at)
    );
  }
} 