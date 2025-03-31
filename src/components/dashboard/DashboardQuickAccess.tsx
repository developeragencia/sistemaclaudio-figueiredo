
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Shield, FileText, ArrowRight } from 'lucide-react';

const DashboardQuickAccess = () => {
  return (
    <Card className="w-full rounded-xl overflow-hidden border-none shadow-lg bg-gradient-to-r from-indigo-600 to-blue-700 text-white">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-4">Acesso Rápido</h3>
        <div className="space-y-3">
          {[
            { icon: Users, text: 'Gestão de usuários' },
            { icon: Shield, text: 'Permissões de acesso' },
            { icon: FileText, text: 'Documentação' },
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-indigo-700/50 hover:bg-indigo-700/70 cursor-pointer group"
              whileHover={{ x: 5 }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              <div className="flex items-center">
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.text}</span>
              </div>
              <motion.div
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ x: 2 }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardQuickAccess;
