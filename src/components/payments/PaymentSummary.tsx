
import React from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DollarSign, Calendar, Receipt, Calculator } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PaymentSummaryProps {
  totalAmount: number;
  totalTaxWithheld: number;
  paymentsCount: number;
  dateRange: {
    from: Date;
    to: Date;
  };
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  totalAmount,
  totalTaxWithheld,
  paymentsCount,
  dateRange
}) => {
  // Format currency for display
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-[20px_1fr] gap-2 items-center">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <div className="text-sm">
          <span className="font-medium">Período: </span>
          {format(dateRange.from, 'dd/MM/yyyy', { locale: ptBR })} até {' '}
          {format(dateRange.to, 'dd/MM/yyyy', { locale: ptBR })}
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-3">
        <div className="grid grid-cols-[20px_1fr] gap-2 items-center">
          <Receipt className="h-4 w-4 text-muted-foreground" />
          <div className="text-sm">
            <span className="font-medium">Total de pagamentos: </span>
            {paymentsCount}
          </div>
        </div>
        
        <div className="grid grid-cols-[20px_1fr] gap-2 items-center">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <div className="text-sm">
            <span className="font-medium">Valor total: </span>
            {formatCurrency(totalAmount)}
          </div>
        </div>
        
        <div className="grid grid-cols-[20px_1fr] gap-2 items-center">
          <Calculator className="h-4 w-4 text-muted-foreground" />
          <div className="text-sm">
            <span className="font-medium">Total retido: </span>
            {formatCurrency(totalTaxWithheld)}
            <span className="text-xs text-muted-foreground ml-1">
              ({(totalTaxWithheld / totalAmount * 100).toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-sm font-medium mb-2">Resumo de Retenções</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>IRRF (1.5%)</span>
            <span>{formatCurrency(totalAmount * 0.015)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>PIS (0.65%)</span>
            <span>{formatCurrency(totalAmount * 0.0065)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>COFINS (3%)</span>
            <span>{formatCurrency(totalAmount * 0.03)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>CSLL (1%)</span>
            <span>{formatCurrency(totalAmount * 0.01)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-sm font-medium">
            <span>Total (6.15%)</span>
            <span>{formatCurrency(totalAmount * 0.0615)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
