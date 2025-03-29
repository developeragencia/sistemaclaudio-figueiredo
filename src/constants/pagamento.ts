export const PAGAMENTO_STATUS = {
  PENDENTE: 'pendente',
  PAGO: 'pago',
  ATRASADO: 'atrasado',
  CANCELADO: 'cancelado'
} as const;

export const PAGAMENTO_STATUS_LABELS = {
  [PAGAMENTO_STATUS.PENDENTE]: 'Pendente',
  [PAGAMENTO_STATUS.PAGO]: 'Pago',
  [PAGAMENTO_STATUS.ATRASADO]: 'Atrasado',
  [PAGAMENTO_STATUS.CANCELADO]: 'Cancelado'
} as const;

export const PAGAMENTO_STATUS_COLORS = {
  [PAGAMENTO_STATUS.PENDENTE]: 'warning',
  [PAGAMENTO_STATUS.PAGO]: 'success',
  [PAGAMENTO_STATUS.ATRASADO]: 'error',
  [PAGAMENTO_STATUS.CANCELADO]: 'default'
} as const;

export const TIPOS_RETENCAO = {
  IRRF: 'IRRF',
  PIS: 'PIS',
  COFINS: 'COFINS',
  CSLL: 'CSLL',
  INSS: 'INSS',
  ISS: 'ISS'
} as const;

export const TIPOS_RETENCAO_LABELS = {
  [TIPOS_RETENCAO.IRRF]: 'Imposto de Renda Retido na Fonte',
  [TIPOS_RETENCAO.PIS]: 'Programa de Integração Social',
  [TIPOS_RETENCAO.COFINS]: 'Contribuição para o Financiamento da Seguridade Social',
  [TIPOS_RETENCAO.CSLL]: 'Contribuição Social sobre o Lucro Líquido',
  [TIPOS_RETENCAO.INSS]: 'Instituto Nacional do Seguro Social',
  [TIPOS_RETENCAO.ISS]: 'Imposto Sobre Serviços'
} as const;

export const ALIQUOTAS_PADRAO = {
  [TIPOS_RETENCAO.IRRF]: 1.5,
  [TIPOS_RETENCAO.PIS]: 0.65,
  [TIPOS_RETENCAO.COFINS]: 3,
  [TIPOS_RETENCAO.CSLL]: 1,
  [TIPOS_RETENCAO.INSS]: 11,
  [TIPOS_RETENCAO.ISS]: 5
} as const;

export const VALORES_MINIMOS = {
  [TIPOS_RETENCAO.IRRF]: 500,
  [TIPOS_RETENCAO.INSS]: 1000
} as const;

export const DIAS_UTEIS_MES = 21;
export const DIAS_CORRIDOS_MES = 30;

export const PAGAMENTO_CONFIG = {
  // Prazo padrão para pagamento (em dias)
  prazoPadrao: 30,
  // Juros de mora (ao mês)
  jurosMora: 0.33,
  // Multa por atraso
  multaAtraso: 2,
  // Limite de dias para considerar atrasado
  diasAtraso: 5,
  // Taxa de serviço (se aplicável)
  taxaServico: 0
} as const; 