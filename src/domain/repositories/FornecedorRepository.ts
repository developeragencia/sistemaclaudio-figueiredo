import { Fornecedor } from '../entities/Fornecedor';

export interface FornecedorRepository {
  save(fornecedor: Fornecedor): Promise<void>;
  findById(id: string): Promise<Fornecedor | null>;
  findByCNPJ(cnpj: string): Promise<Fornecedor | null>;
  findAll(): Promise<Fornecedor[]>;
  update(fornecedor: Fornecedor): Promise<void>;
  delete(id: string): Promise<void>;
} 