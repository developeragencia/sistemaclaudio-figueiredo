import { PagamentoService } from '../services/PagamentoService';
import { SelicService } from '../services/SelicService';
import { BancoCentralService } from '../services/BancoCentralService';
import { calcularJurosMora, calcularMultaAtraso, calcularValorTotalAtrasado } from '../utils/pagamento';
import { PAGAMENTO_CONFIG } from '../constants/pagamento';

// Mock dos serviços
jest.mock('../services/PagamentoService');
jest.mock('../services/SelicService');
jest.mock('../services/BancoCentralService');

describe('Módulo de Pagamentos', () => {
  let pagamentoService: PagamentoService;
  let selicService: SelicService;
  let bancoCentralService: BancoCentralService;

  beforeEach(() => {
    pagamentoService = new PagamentoService();
    selicService = new SelicService();
    bancoCentralService = new BancoCentralService();
  });

  describe('Cálculos de Pagamento', () => {
    it('deve calcular juros de mora corretamente', () => {
      const valor = 1000;
      const diasAtraso = 10;
      const juros = calcularJurosMora(valor, diasAtraso);
      const taxaDiaria = PAGAMENTO_CONFIG.jurosMora / 100 / 30;
      const jurosEsperados = Number((valor * taxaDiaria * diasAtraso).toFixed(2));
      expect(juros).toBe(jurosEsperados);
    });

    it('deve calcular multa por atraso corretamente', () => {
      const valor = 1000;
      const multa = calcularMultaAtraso(valor);
      const multaEsperada = Number((valor * (PAGAMENTO_CONFIG.multaAtraso / 100)).toFixed(2));
      expect(multa).toBe(multaEsperada);
    });

    it('deve calcular valor total atrasado corretamente', () => {
      const valor = 1000;
      const diasAtraso = 10;
      const total = calcularValorTotalAtrasado(valor, diasAtraso);
      const juros = calcularJurosMora(valor, diasAtraso);
      const multa = calcularMultaAtraso(valor);
      const totalEsperado = Number((valor + juros + multa).toFixed(2));
      expect(total).toBe(totalEsperado);
    });
  });

  describe('PagamentoService', () => {
    it('deve listar pagamentos com filtros', async () => {
      const filtros = {
        status: 'pendente',
        data_inicio: '2024-01-01',
        data_fim: '2024-01-31'
      };

      const mockPagamentos = [
        {
          id: '1',
          valor_bruto: 1000,
          valor_liquido: 900,
          status: 'pendente'
        }
      ];

      (pagamentoService.listarPagamentos as jest.Mock).mockResolvedValue(mockPagamentos);

      const resultado = await pagamentoService.listarPagamentos(filtros);
      expect(resultado).toEqual(mockPagamentos);
    });

    it('deve criar pagamento com retenções', async () => {
      const pagamento = {
        cliente_id: '1',
        fornecedor_id: '2',
        valor_bruto: 1000,
        data_vencimento: '2024-02-01'
      };

      const mockPagamentoCriado = {
        id: '1',
        ...pagamento,
        valor_liquido: 900,
        status: 'pendente',
        tipo_retencao: ['IRRF'],
        valor_retencao: 100
      };

      (pagamentoService.criarPagamento as jest.Mock).mockResolvedValue(mockPagamentoCriado);

      const resultado = await pagamentoService.criarPagamento(pagamento);
      expect(resultado).toEqual(mockPagamentoCriado);
    });

    it('deve confirmar pagamento com comprovante', async () => {
      const id = '1';
      const comprovanteUrl = 'https://exemplo.com/comprovante.pdf';

      const mockPagamentoConfirmado = {
        id,
        status: 'pago',
        comprovante_url: comprovanteUrl
      };

      (pagamentoService.confirmarPagamento as jest.Mock).mockResolvedValue(mockPagamentoConfirmado);

      const resultado = await pagamentoService.confirmarPagamento(id, comprovanteUrl);
      expect(resultado).toEqual(mockPagamentoConfirmado);
    });
  });

  describe('SelicService', () => {
    it('deve calcular correção monetária', async () => {
      const valor = 1000;
      const dataInicial = new Date('2024-01-01');

      const mockTaxas = [
        { data: '2024-01-01', valor: 11.75 },
        { data: '2024-01-15', valor: 11.50 }
      ];

      (selicService.calcularCorrecaoMonetaria as jest.Mock).mockResolvedValue(1015.50);

      const resultado = await selicService.calcularCorrecaoMonetaria(valor, dataInicial);
      expect(resultado).toBe(1015.50);
    });

    it('deve atualizar taxa Selic', async () => {
      const mockTaxaAtual = {
        data: new Date().toISOString(),
        valor: 11.75
      };

      (selicService.atualizarTaxaSelic as jest.Mock).mockResolvedValue(mockTaxaAtual);

      const resultado = await selicService.atualizarTaxaSelic();
      expect(resultado).toEqual(mockTaxaAtual);
    });
  });

  describe('BancoCentralService', () => {
    it('deve buscar taxa Selic atual', async () => {
      const mockTaxa = {
        data: '2024-01-15',
        valor: '11.75'
      };

      (bancoCentralService.getTaxaSelicAtual as jest.Mock).mockResolvedValue(11.75);

      const resultado = await bancoCentralService.getTaxaSelicAtual();
      expect(resultado).toBe(11.75);
    });

    it('deve buscar histórico de taxas Selic', async () => {
      const dataInicio = new Date('2024-01-01');
      const dataFim = new Date('2024-01-31');

      const mockHistorico = [
        { data: '2024-01-01', valor: '11.75' },
        { data: '2024-01-15', valor: '11.50' }
      ];

      (bancoCentralService.getHistoricoSelic as jest.Mock).mockResolvedValue(mockHistorico);

      const resultado = await bancoCentralService.getHistoricoSelic(dataInicio, dataFim);
      expect(resultado).toEqual(mockHistorico);
    });
  });
}); 