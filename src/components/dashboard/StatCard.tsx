
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend: {
    value: number;
    isPositive: boolean;
  };
  trendLabel?: string;
  className?: string;
  color?: string;
  iconClassName?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendLabel,
  className = "",
  color = "blue",
  iconClassName = "bg-muted"
}) => {
  const formattedValue = typeof value === 'number' && title.includes('R$')
    ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
    : value;

  // Format trend percentage
  const formattedTrend = trend
    ? `${trend.isPositive ? '+' : '-'}${trend.value}%`
    : null;

  return (
    <motion.div 
      whileHover={{ y: -5 }} 
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Card className={`overflow-hidden border transition-all duration-300 hover:shadow-lg ${className}`}>
        <CardContent className="p-6">
          <div className="flex justify-between">
            <div className={`p-2 rounded-lg ${iconClassName}`}>
              {icon}
            </div>
            
            {trend && (
              <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                trend.isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {trend.isPositive ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {formattedTrend}
              </div>
            )}
          </div>
          
          <div className="mt-3">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <p className="text-2xl font-bold mt-1">{formattedValue}</p>
            {trendLabel && <p className="text-xs text-muted-foreground mt-1">{trendLabel}</p>}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
