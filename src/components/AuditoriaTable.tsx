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
import { formatCurrency } from '@/lib/utils';
import type { Auditoria } from '@/types/database.types';

interface AuditoriaTableProps {
  auditorias: Auditoria[];
}

export function AuditoriaTable({ auditorias }: AuditoriaTableProps) {
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

  return (
    <Table>
      <TableCaption>Relatório de Auditoria de Retenções</TableCaption>
      <TableHeader>
        <TableRow>
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
        {auditorias.map((auditoria) => (
          <TableRow key={auditoria.id}>
            <TableCell>{formatCurrency(auditoria.valor_original)}</TableCell>
            <TableCell>{formatCurrency(auditoria.valor_ir)}</TableCell>
            <TableCell>{formatCurrency(auditoria.valor_pis)}</TableCell>
            <TableCell>{formatCurrency(auditoria.valor_cofins)}</TableCell>
            <TableCell>{formatCurrency(auditoria.valor_csll)}</TableCell>
            <TableCell>{formatCurrency(auditoria.valor_iss)}</TableCell>
            <TableCell>{formatCurrency(auditoria.valor_liquido)}</TableCell>
          </TableRow>
        ))}
        <TableRow className="font-bold">
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
  );
} 