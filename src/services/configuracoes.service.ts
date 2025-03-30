import { supabase } from '@/lib/supabaseClient';

export interface ConfiguracaoSistema {
  api_key_cnpjws: string;
  notificacoes_email: boolean;
  email_notificacoes: string;
  limite_consultas_diarias: number;
  dias_retencao_cache: number;
  valor_minimo_retencao: number;
}

export class ConfiguracoesService {
  private static readonly TABLE_NAME = 'configuracoes';

  static async buscarConfiguracoes(): Promise<ConfiguracaoSistema> {
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select('*')
      .single();

    if (error) {
      throw new Error(`Erro ao buscar configurações: ${error.message}`);
    }

    return data as ConfiguracaoSistema;
  }

  static async salvarConfiguracoes(configuracoes: ConfiguracaoSistema): Promise<ConfiguracaoSistema> {
    // Primeiro verifica se já existe alguma configuração
    const { data: existingConfig } = await supabase
      .from(this.TABLE_NAME)
      .select('*')
      .single();

    let result;
    
    if (existingConfig) {
      // Atualiza a configuração existente
      result = await supabase
        .from(this.TABLE_NAME)
        .update(configuracoes)
        .eq('id', existingConfig.id)
        .select()
        .single();
    } else {
      // Insere uma nova configuração
      result = await supabase
        .from(this.TABLE_NAME)
        .insert(configuracoes)
        .select()
        .single();
    }

    if (result.error) {
      throw new Error(`Erro ao salvar configurações: ${result.error.message}`);
    }

    return result.data as ConfiguracaoSistema;
  }

  static async validarApiKeyCnpjWs(apiKey: string): Promise<boolean> {
    try {
      const response = await fetch('https://publica.cnpj.ws/cnpj/00000000000191', {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });

      return response.ok;
    } catch (error) {
      console.error('Erro ao validar API Key CNPJ.ws:', error);
      return false;
    }
  }

  static async verificarLimiteConsultas(): Promise<{
    consultas_hoje: number;
    limite_diario: number;
    disponivel: boolean;
  }> {
    const hoje = new Date().toISOString().split('T')[0];
    
    // Busca o número de consultas realizadas hoje
    const { data: consultasHoje, error: consultasError } = await supabase
      .from('consultas_cnpj')
      .select('count', { count: 'exact' })
      .gte('data_consulta', hoje);

    if (consultasError) {
      throw new Error(`Erro ao verificar consultas: ${consultasError.message}`);
    }

    // Busca o limite diário nas configurações
    const { data: config, error: configError } = await supabase
      .from(this.TABLE_NAME)
      .select('limite_consultas_diarias')
      .single();

    if (configError) {
      throw new Error(`Erro ao buscar limite de consultas: ${configError.message}`);
    }

    const consultasRealizadas = consultasHoje?.count || 0;
    const limiteDiario = config?.limite_consultas_diarias || 100;

    return {
      consultas_hoje: consultasRealizadas,
      limite_diario: limiteDiario,
      disponivel: consultasRealizadas < limiteDiario
    };
  }

  static async registrarConsulta(cnpj: string): Promise<void> {
    const { error } = await supabase
      .from('consultas_cnpj')
      .insert({
        cnpj,
        data_consulta: new Date().toISOString()
      });

    if (error) {
      throw new Error(`Erro ao registrar consulta: ${error.message}`);
    }
  }
} 