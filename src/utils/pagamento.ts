import { formatarMoeda } from './formatters';
import { PAGAMENTO_CONFIG } from '../constants/pagamento';

/**
 * Calcula os juros de mora de um pagamento atrasado
 * @param valor Valor do pagamento
 * @param diasAtraso Quantidade de dias atrasados
 * @returns Valor dos juros de mora
 */
export function calcularJurosMora(valor: number, diasAtraso: number): number {
  const taxaDiaria = PAGAMENTO_CONFIG.jurosMora / 100 / 30;
  return Number((valor * taxaDiaria * diasAtraso).toFixed(2));
}

/**
 * Calcula a multa por atraso de um pagamento
 * @param valor Valor do pagamento
 * @returns Valor da multa
 */
export function calcularMultaAtraso(valor: number): number {
  return Number((valor * (PAGAMENTO_CONFIG.multaAtraso / 100)).toFixed(2));
}

/**
 * Calcula o valor total de um pagamento atrasado (valor + juros + multa)
 * @param valor Valor do pagamento
 * @param diasAtraso Quantidade de dias atrasados
 * @returns Valor total com juros e multa
 */
export function calcularValorTotalAtrasado(valor: number, diasAtraso: number): number {
  const juros = calcularJurosMora(valor, diasAtraso);
  const multa = calcularMultaAtraso(valor);
  return Number((valor + juros + multa).toFixed(2));
}

/**
 * Formata o valor total de um pagamento atrasado para exibição
 * @param valor Valor do pagamento
 * @param diasAtraso Quantidade de dias atrasados
 * @returns Objeto com os valores formatados
 */
export function formatarValorAtrasado(valor: number, diasAtraso: number) {
  const juros = calcularJurosMora(valor, diasAtraso);
  const multa = calcularMultaAtraso(valor);
  const total = calcularValorTotalAtrasado(valor, diasAtraso);

  return {
    valor: formatarMoeda(valor),
    juros: formatarMoeda(juros),
    multa: formatarMoeda(multa),
    total: formatarMoeda(total)
  };
}

/**
 * Verifica se um pagamento está atrasado
 * @param dataVencimento Data de vencimento do pagamento
 * @returns true se estiver atrasado, false caso contrário
 */
export function verificarAtraso(dataVencimento: Date): boolean {
  const hoje = new Date();
  const diasAtraso = Math.ceil(
    (hoje.getTime() - dataVencimento.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diasAtraso > PAGAMENTO_CONFIG.diasAtraso;
}

/**
 * Calcula a data de vencimento baseada na data de emissão
 * @param dataEmissao Data de emissão do pagamento
 * @param prazo Prazo em dias para pagamento
 * @returns Data de vencimento
 */
export function calcularDataVencimento(dataEmissao: Date, prazo: number = PAGAMENTO_CONFIG.prazoPadrao): Date {
  const vencimento = new Date(dataEmissao);
  vencimento.setDate(vencimento.getDate() + prazo);
  return vencimento;
}

/**
 * Calcula o valor líquido de um pagamento considerando as retenções
 * @param valorBruto Valor bruto do pagamento
 * @param retencoes Array de retenções aplicadas
 * @returns Valor líquido do pagamento
 */
export function calcularValorLiquido(valorBruto: number, retencoes: Array<{ tipo: string; valor: number }>): number {
  const valorTotalRetencoes = retencoes.reduce((total, retencao) => total + retencao.valor, 0);
  return Number((valorBruto - valorTotalRetencoes).toFixed(2));
}

/**
 * Formata os valores de um pagamento para exibição
 * @param valorBruto Valor bruto do pagamento
 * @param retencoes Array de retenções aplicadas
 * @returns Objeto com os valores formatados
 */
export function formatarValoresPagamento(valorBruto: number, retencoes: Array<{ tipo: string; valor: number }>) {
  const valorLiquido = calcularValorLiquido(valorBruto, retencoes);
  const valorTotalRetencoes = retencoes.reduce((total, retencao) => total + retencao.valor, 0);

  return {
    valorBruto: formatarMoeda(valorBruto),
    valorLiquido: formatarMoeda(valorLiquido),
    valorRetencoes: formatarMoeda(valorTotalRetencoes),
    retencoes: retencoes.map(retencao => ({
      tipo: retencao.tipo,
      valor: formatarMoeda(retencao.valor)
    }))
  };
} 