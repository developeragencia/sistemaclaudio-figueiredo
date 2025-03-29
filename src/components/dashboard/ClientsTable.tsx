
import React from 'react';
import { Client } from '../../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface ClientsTableProps {
  clients: Client[];
}

const ClientsTable: React.FC<ClientsTableProps> = ({ clients }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome do Cliente</TableHead>
            <TableHead>CNPJ</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data de Cadastro</TableHead>
            <TableHead>Última Atualização</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id} className="hover:bg-gray-50 cursor-pointer">
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientsTable;
