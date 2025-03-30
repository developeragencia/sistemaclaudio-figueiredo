
import React from 'react';
import { Client } from '../../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface ClientsTableProps {
  clients: Client[];
  limit?: number;
}

const ClientsTable: React.FC<ClientsTableProps> = ({ clients }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'inactive':
        return 'bg-slate-100 text-slate-800 hover:bg-slate-200';
      case 'pending':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      default:
        return 'bg-slate-100 text-slate-800 hover:bg-slate-200';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  // Animation variants
  const tableVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="rounded-md border overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="font-medium">Nome do Cliente</TableHead>
            <TableHead className="font-medium">CNPJ</TableHead>
            <TableHead className="font-medium">Status</TableHead>
            <TableHead className="font-medium">Data de Cadastro</TableHead>
            <TableHead className="font-medium">Última Atualização</TableHead>
          </TableRow>
        </TableHeader>
        <motion.tbody
          variants={tableVariants}
          initial="hidden"
          animate="show"
        >
          {clients.map((client, index) => (
            <motion.tr 
              key={client.id} 
              className="hover:bg-slate-50 cursor-pointer border-b last:border-0 transition-colors"
              variants={rowVariants}
              custom={index}
              whileHover={{ backgroundColor: "rgba(241, 245, 249, 0.9)" }}
            >
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell>{client.cnpj}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(client.status)} variant="outline">
                  {client.status === 'active' ? 'Ativo' : 
                   client.status === 'inactive' ? 'Inativo' : 'Pendente'}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(client.createdAt)}</TableCell>
              <TableCell>{formatDate(client.updatedAt)}</TableCell>
            </motion.tr>
          ))}
        </motion.tbody>
      </Table>
    </motion.div>
  );
};

export default ClientsTable;
