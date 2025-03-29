import { Router } from 'express';
import { AuditoriaController } from '../controllers/AuditoriaController';
import { ProcessarAuditoriaUseCase } from '../../application/use-cases/ProcessarAuditoriaUseCase';
import { AuditoriaService } from '../../application/services/AuditoriaService';
import { SupabasePagamentoRepository } from '../../infrastructure/repositories/SupabasePagamentoRepository';
import { SupabaseFornecedorRepository } from '../../infrastructure/repositories/SupabaseFornecedorRepository';
import { CNPJService } from '../../infrastructure/services/CNPJService';
import { supabase } from '../../infrastructure/config/supabase';

const router = Router();

// Instanciar dependências
const pagamentoRepository = new SupabasePagamentoRepository(supabase);
const fornecedorRepository = new SupabaseFornecedorRepository(supabase);
const cnpjService = new CNPJService();
const auditoriaService = new AuditoriaService(
  cnpjService,
  pagamentoRepository,
  fornecedorRepository
);
const processarAuditoriaUseCase = new ProcessarAuditoriaUseCase(
  auditoriaService,
  pagamentoRepository,
  fornecedorRepository
);
const auditoriaController = new AuditoriaController(processarAuditoriaUseCase);

// Definir rotas
router.post('/auditoria/processar', (req, res) => auditoriaController.processarAuditoria(req, res));
router.get('/auditoria/relatorio/:clienteId', (req, res) => auditoriaController.gerarRelatorio(req, res));

export { router as auditoriaRoutes }; 