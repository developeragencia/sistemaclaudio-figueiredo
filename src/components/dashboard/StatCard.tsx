
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

  // Get color based on the color prop
  const getBgGradient = () => {
    switch (color) {
      case 'blue':
        return 'hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50';
      case 'purple':
        return 'hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50';
      case 'emerald':
        return 'hover:bg-gradient-to-br hover:from-emerald-50 hover:to-green-50';
      case 'amber':
        return 'hover:bg-gradient-to-br hover:from-amber-50 hover:to-yellow-50';
      default:
        return 'hover:bg-gradient-to-br hover:from-slate-50 hover:to-blue-50';
    }
  };

  const getTextColor = () => {
    switch (color) {
      case 'blue':
        return 'text-blue-800';
      case 'purple':
        return 'text-purple-800';
      case 'emerald':
        return 'text-emerald-800';
      case 'amber':
        return 'text-amber-800';
      default:
        return 'text-slate-800';
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }} 
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Card className={`overflow-hidden border transition-all duration-300 hover:shadow-lg ${getBgGradient()} ${className}`}>
        <CardContent className="p-6">
          <div className="flex justify-between">
            <div className={`p-2.5 rounded-lg shadow-sm ${iconClassName}`}>
              {icon}
            </div>
            
            {trend && (
              <div className={`flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
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
          
          <div className="mt-4">
            <h3 className="text-sm font-medium text-slate-600">{title}</h3>
            <p className={`text-2xl font-bold mt-1 ${getTextColor()}`}>{formattedValue}</p>
            {trendLabel && <p className="text-xs text-slate-500 mt-1">{trendLabel}</p>}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
