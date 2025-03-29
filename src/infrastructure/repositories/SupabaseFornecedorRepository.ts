import { SupabaseClient } from '@supabase/supabase-js';
import { Fornecedor } from '../../domain/entities/Fornecedor';
import { FornecedorRepository } from '../../domain/repositories/FornecedorRepository';
import { AtividadeEconomica } from '../../domain/entities/AtividadeEconomica';

export class SupabaseFornecedorRepository implements FornecedorRepository {
  private readonly tableName = 'fornecedores';

  constructor(private readonly supabase: SupabaseClient) {}

  async save(fornecedor: Fornecedor): Promise<void> {
    const { error } = await this.supabase
      .from(this.tableName)
      .upsert({
        id: fornecedor.id,
        cnpj: fornecedor.cnpj,
        razao_social: fornecedor.razaoSocial,
        nome_fantasia: fornecedor.nomeFantasia,
        email: fornecedor.email,
        telefone: fornecedor.telefone,
        endereco: fornecedor.endereco,
        atividade_principal: {
          codigo: fornecedor.atividadePrincipal.codigo,
          descricao: fornecedor.atividadePrincipal.descricao,
          aliquota_retencao: fornecedor.atividadePrincipal.aliquotaRetencao
        },
        atividades_secundarias: fornecedor.atividadesSecundarias.map(atividade => ({
          codigo: atividade.codigo,
          descricao: atividade.descricao,
          aliquota_retencao: atividade.aliquotaRetencao
        })),
        situacao_cadastral: fornecedor.situacaoCadastral,
        data_situacao_cadastral: fornecedor.dataSituacaoCadastral.toISOString(),
        data_abertura: fornecedor.dataAbertura.toISOString(),
        natureza_juridica: fornecedor.naturezaJuridica,
        capital_social: fornecedor.capitalSocial,
        porte: fornecedor.porte,
        status: fornecedor.status,
        created_at: fornecedor.createdAt.toISOString(),
        updated_at: fornecedor.updatedAt.toISOString()
      });

    if (error) throw error;
  }

  async findById(id: string): Promise<Fornecedor | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return null;

    return this.mapToDomain(data);
  }

  async findByCNPJ(cnpj: string): Promise<Fornecedor | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('cnpj', cnpj)
      .single();

    if (error) throw error;
    if (!data) return null;

    return this.mapToDomain(data);
  }

  async findAll(): Promise<Fornecedor[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*');

    if (error) throw error;
    return data.map(this.mapToDomain);
  }

  async update(fornecedor: Fornecedor): Promise<void> {
    await this.save(fornecedor);
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  private mapToDomain(data: any): Fornecedor {
    return new Fornecedor(
      data.id,
      data.cnpj,
      data.razao_social,
      data.nome_fantasia,
      data.email,
      data.telefone,
      data.endereco,
      new AtividadeEconomica(
        data.atividade_principal.codigo,
        data.atividade_principal.descricao,
        data.atividade_principal.aliquota_retencao
      ),
      data.atividades_secundarias.map((atividade: any) => 
        new AtividadeEconomica(
          atividade.codigo,
          atividade.descricao,
          atividade.aliquota_retencao
        )
      ),
      data.situacao_cadastral,
      new Date(data.data_situacao_cadastral),
      new Date(data.data_abertura),
      data.natureza_juridica,
      data.capital_social,
      data.porte,
      data.status,
      new Date(data.created_at),
      new Date(data.updated_at)
    );
  }
} 