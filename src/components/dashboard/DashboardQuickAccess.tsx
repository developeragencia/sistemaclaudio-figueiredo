
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Shield, FileText } from 'lucide-react';

const DashboardQuickAccess = () => {
  return (
    <Card className="w-full overflow-hidden bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-none shadow-lg">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4">Acesso Rápido</h3>
        <ul className="space-y-3">
          <motion.li 
            className="flex items-center p-3 bg-indigo-600/50 rounded-lg"
            whileHover={{ x: 5 }}
          >
            <Users className="h-5 w-5 mr-3" />
            <span>Gestão de usuários</span>
          </motion.li>
          <motion.li 
            className="flex items-center p-3 bg-indigo-600/50 rounded-lg"
            whileHover={{ x: 5 }}
          >
            <Shield className="h-5 w-5 mr-3" />
            <span>Permissões de acesso</span>
          </motion.li>
          <motion.li 
            className="flex items-center p-3 bg-indigo-600/50 rounded-lg"
            whileHover={{ x: 5 }}
          >
            <FileText className="h-5 w-5 mr-3" />
            <span>Documentação</span>
          </motion.li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default DashboardQuickAccess;
