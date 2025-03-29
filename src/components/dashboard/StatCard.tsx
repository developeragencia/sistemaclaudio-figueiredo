
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, value, icon, trend, className 
}) => {
  const formattedValue = typeof value === 'number' && title.includes('R$') 
    ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
    : value;
    
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h4 className="text-2xl font-bold mt-2">{formattedValue}</h4>
            
            {trend && (
              <div className="flex items-center mt-2">
                <span
                  className={cn(
                    "text-xs font-medium",
                    trend.isPositive ? "text-green-600" : "text-red-600"
                  )}
                >
                  {trend.isPositive ? "+" : "-"}{trend.value}%
                </span>
                <span className="text-xs text-gray-500 ml-1">em relação ao mês passado</span>
              </div>
            )}
          </div>
          
          <div className="p-3 bg-taxBlue-100 rounded-lg">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
