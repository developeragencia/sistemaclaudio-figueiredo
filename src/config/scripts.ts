export const scriptsConfig = {
  // Configurações da taxa Selic
  selic: {
    // Horário para atualização diária (formato 24h)
    horaAtualizacao: 0,
    minutoAtualizacao: 0,
    // URL da API do Banco Central
    apiUrl: 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados'
  },

  // Configurações dos pagamentos atrasados
  pagamentosAtrasados: {
    // Horário para atualização diária (formato 24h)
    horaAtualizacao: 0,
    minutoAtualizacao: 0
  },

  // Configurações dos relatórios
  relatorios: {
    // Configurações do relatório de retenções
    retencoes: {
      // Dia do mês para geração (1-31)
      diaGeracao: 1,
      // Horário para geração (formato 24h)
      horaGeracao: 0,
      minutoGeracao: 0,
      // Destinatários do relatório (e-mail)
      destinatarios: [
        'financeiro@empresa.com',
        'contabilidade@empresa.com'
      ]
    }
  },

  // Configurações gerais
  geral: {
    // Timezone para os scripts
    timezone: 'America/Sao_Paulo',
    // Diretório para logs
    logDir: 'logs',
    // Nível de log (debug, info, warn, error)
    logLevel: 'info'
  }
}; 