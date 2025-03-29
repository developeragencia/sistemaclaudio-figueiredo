import { Request, Response } from 'express';
import { ProcessarAuditoriaUseCase } from '../../application/use-cases/ProcessarAuditoriaUseCase';
import { z } from 'zod';

const processarAuditoriaSchema = z.object({
  clienteId: z.string().uuid(),
  periodo: z.object({
    inicio: z.string().datetime(),
    fim: z.string().datetime()
  })
});

export class AuditoriaController {
  constructor(
    private readonly processarAuditoriaUseCase: ProcessarAuditoriaUseCase
  ) {}

  public async processarAuditoria(req: Request, res: Response): Promise<void> {
    try {
      const input = processarAuditoriaSchema.parse(req.body);

      const resultado = await this.processarAuditoriaUseCase.execute({
        clienteId: input.clienteId,
        periodo: {
          inicio: new Date(input.periodo.inicio),
          fim: new Date(input.periodo.fim)
        }
      });

      res.status(200).json({
        success: true,
        data: resultado
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          error: 'Dados inválidos',
          details: error.errors
        });
        return;
      }

      console.error('Erro ao processar auditoria:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno ao processar auditoria'
      });
    }
  }

  public async gerarRelatorio(req: Request, res: Response): Promise<void> {
    try {
      const { clienteId } = req.params;
      const { inicio, fim } = req.query;

      if (!clienteId || !inicio || !fim) {
        res.status(400).json({
          success: false,
          error: 'Parâmetros inválidos'
        });
        return;
      }

      const resultado = await this.processarAuditoriaUseCase.execute({
        clienteId,
        periodo: {
          inicio: new Date(inicio as string),
          fim: new Date(fim as string)
        }
      });

      res.status(200).json({
        success: true,
        data: resultado
      });
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno ao gerar relatório'
      });
    }
  }
} 