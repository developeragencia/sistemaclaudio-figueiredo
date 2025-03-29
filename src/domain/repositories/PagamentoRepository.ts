import { Pagamento } from '../entities/Pagamento';

export interface PagamentoRepository {
  save(pagamento: Pagamento): Promise<void>;
  findById(id: string): Promise<Pagamento | null>;
  findByClienteAndPeriodo(clienteId: string, inicio: Date, fim: Date): Promise<Pagamento[]>;
  findByFornecedor(fornecedorId: string): Promise<Pagamento[]>;
  update(pagamento: Pagamento): Promise<void>;
  delete(id: string): Promise<void>;
} 