export interface Fornecedor {
  id: string
  cnpj: string
  razao_social: string
  nome_fantasia: string
  atividade_principal: string
  atividade_secundaria: string[]
  natureza_juridica: string
  logradouro: string
  numero: string
  complemento: string
  cep: string
  bairro: string
  municipio: string
  uf: string
  email: string
  telefone: string
  data_situacao: string
  ultima_atualizacao: string
  status: 'ativo' | 'inativo'
  created_at: string
}

export interface Cliente {
  id: string
  cnpj: string
  razao_social: string
  nome_fantasia: string
  email: string
  telefone: string
  status: 'ativo' | 'inativo'
  created_at: string
}

export interface Pagamento {
  id: string
  cliente_id: string
  fornecedor_id: string
  valor: number
  data_pagamento: string
  descricao: string
  numero_nota: string
  tipo_servico: string
  created_at: string
}

export interface AliquotaRetencao {
  id: string
  atividade: string
  aliquota_ir: number
  aliquota_pis: number
  aliquota_cofins: number
  aliquota_csll: number
  aliquota_iss: number
  valor_minimo_retencao: number
  created_at: string
}

export interface Auditoria {
  id: string
  pagamento_id: string
  valor_original: number
  valor_ir: number
  valor_pis: number
  valor_cofins: number
  valor_csll: number
  valor_iss: number
  valor_liquido: number
  created_at: string
} 