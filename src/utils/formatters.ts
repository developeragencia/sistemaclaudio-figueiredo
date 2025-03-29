export const formatarMoeda = (valor: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
};

export const formatarData = (data: Date | string): string => {
  if (!data) return '';
  const dataObj = typeof data === 'string' ? new Date(data) : data;
  return dataObj.toLocaleDateString('pt-BR');
};

export const formatarCPFCNPJ = (valor: string): string => {
  if (!valor) return '';
  
  // Remove caracteres não numéricos
  const numeros = valor.replace(/\D/g, '');
  
  if (numeros.length === 11) {
    // CPF: 000.000.000-00
    return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
  } else if (numeros.length === 14) {
    // CNPJ: 00.000.000/0000-00
    return numeros.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5');
  }
  
  return valor;
};

export const formatarTelefone = (valor: string): string => {
  if (!valor) return '';
  
  // Remove caracteres não numéricos
  const numeros = valor.replace(/\D/g, '');
  
  if (numeros.length === 11) {
    // Celular: (00) 00000-0000
    return numeros.replace(/(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3');
  } else if (numeros.length === 10) {
    // Fixo: (00) 0000-0000
    return numeros.replace(/(\d{2})(\d{4})(\d{4})/g, '($1) $2-$3');
  }
  
  return valor;
}; 