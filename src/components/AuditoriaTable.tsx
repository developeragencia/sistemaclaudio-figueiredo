import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { formatCurrency } from '@/lib/utils';
import type { Auditoria } from '@/types/database.types';
import * as XLSX from 'xlsx';

interface AuditoriaTableProps {
  auditorias: Auditoria[];
  fornecedores: Record<string, {
    razao_social: string;
    cnpj: string;
    atividade_principal: string;
  }>;
  pagamentos: Record<string, {
    data_pagamento: string;
    numero_nota: string;
    tipo_servico: string;
  }>;
}

export function AuditoriaTable({ auditorias, fornecedores, pagamentos }: AuditoriaTableProps) {
  const totais = auditorias.reduce((acc, auditoria) => ({
    valor_original: acc.valor_original + auditoria.valor_original,
    valor_ir: acc.valor_ir + auditoria.valor_ir,
    valor_pis: acc.valor_pis + auditoria.valor_pis,
    valor_cofins: acc.valor_cofins + auditoria.valor_cofins,
    valor_csll: acc.valor_csll + auditoria.valor_csll,
    valor_iss: acc.valor_iss + auditoria.valor_iss,
    valor_liquido: acc.valor_liquido + auditoria.valor_liquido,
  }), {
    valor_original: 0,
    valor_ir: 0,
    valor_pis: 0,
    valor_cofins: 0,
    valor_csll: 0,
    valor_iss: 0,
    valor_liquido: 0,
  });

  const handleExportExcel = () => {
    const data = auditorias.map(auditoria => {
      const fornecedor = fornecedores[auditoria.pagamento_id];
      const pagamento = pagamentos[auditoria.pagamento_id];
      return {
        'Data Pagamento': pagamento?.data_pagamento || '',
        'Nota Fiscal': pagamento?.numero_nota || '',
        'Fornecedor': fornecedor?.razao_social || '',
        'CNPJ': fornecedor?.cnpj || '',
        'Atividade': fornecedor?.atividade_principal || '',
        'Tipo Serviço': pagamento?.tipo_servico || '',
        'Valor Original': auditoria.valor_original,
        'IR': auditoria.valor_ir,
        'PIS': auditoria.valor_pis,
        'COFINS': auditoria.valor_cofins,
        'CSLL': auditoria.valor_csll,
        'ISS': auditoria.valor_iss,
        'Valor Líquido': auditoria.valor_liquido,
      };
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Auditoria');
    XLSX.writeFile(wb, 'auditoria_retencoes.xlsx');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleExportExcel} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar Excel
        </Button>
      </div>

      <Table>
        <TableCaption>Relatório de Auditoria de Retenções</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>NF</TableHead>
            <TableHead>Fornecedor</TableHead>
            <TableHead>CNPJ</TableHead>
            <TableHead>Atividade</TableHead>
            <TableHead>Valor Original</TableHead>
            <TableHead>IR</TableHead>
            <TableHead>PIS</TableHead>
            <TableHead>COFINS</TableHead>
            <TableHead>CSLL</TableHead>
            <TableHead>ISS</TableHead>
            <TableHead>Valor Líquido</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {auditorias.map((auditoria) => {
            const fornecedor = fornecedores[auditoria.pagamento_id];
            const pagamento = pagamentos[auditoria.pagamento_id];
            return (
              <TableRow key={auditoria.id}>
                <TableCell>{pagamento?.data_pagamento}</TableCell>
                <TableCell>{pagamento?.numero_nota}</TableCell>
                <TableCell>{fornecedor?.razao_social}</TableCell>
                <TableCell>{fornecedor?.cnpj}</TableCell>
                <TableCell>{fornecedor?.atividade_principal}</TableCell>
                <TableCell>{formatCurrency(auditoria.valor_original)}</TableCell>
                <TableCell>{formatCurrency(auditoria.valor_ir)}</TableCell>
                <TableCell>{formatCurrency(auditoria.valor_pis)}</TableCell>
                <TableCell>{formatCurrency(auditoria.valor_cofins)}</TableCell>
                <TableCell>{formatCurrency(auditoria.valor_csll)}</TableCell>
                <TableCell>{formatCurrency(auditoria.valor_iss)}</TableCell>
                <TableCell>{formatCurrency(auditoria.valor_liquido)}</TableCell>
              </TableRow>
            );
          })}
          <TableRow className="font-bold">
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell>{formatCurrency(totais.valor_original)}</TableCell>
            <TableCell>{formatCurrency(totais.valor_ir)}</TableCell>
            <TableCell>{formatCurrency(totais.valor_pis)}</TableCell>
            <TableCell>{formatCurrency(totais.valor_cofins)}</TableCell>
            <TableCell>{formatCurrency(totais.valor_csll)}</TableCell>
            <TableCell>{formatCurrency(totais.valor_iss)}</TableCell>
            <TableCell>{formatCurrency(totais.valor_liquido)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
} 