
import React from 'react';
import { Supplier } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FileText, Mail, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface SuppliersTableProps {
  suppliers: Supplier[];
  searchTerm: string;
  onShowDetails: (supplier: Supplier) => void;
}

const SuppliersTable: React.FC<SuppliersTableProps> = ({ 
  suppliers, 
  searchTerm,
  onShowDetails 
}) => {
  // Filter suppliers based on search term
  const filteredSuppliers = suppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.cnpj.includes(searchTerm) ||
    supplier.tradeName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format CNPJ for display
  const formatCnpj = (cnpj: string) => {
    return cnpj; // Already formatted in the mock data
  };
  
  // Get tax regime badge color
  const getTaxRegimeColor = (regime: string | undefined) => {
    if (!regime) return "bg-gray-100 text-gray-700";
    
    switch (regime.toLowerCase()) {
      case 'simples nacional':
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case 'lucro presumido':
        return "bg-amber-100 text-amber-800 border-amber-200";
      case 'lucro real':
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
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
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="relative">
      {filteredSuppliers.length === 0 ? (
        <motion.div 
          className="text-center py-8 bg-gray-50/50 rounded-xl border border-dashed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-muted-foreground">Nenhum fornecedor encontrado.</p>
        </motion.div>
      ) : (
        <motion.div
          variants={tableVariants}
          initial="hidden"
          animate="show"
          className="rounded-md overflow-hidden"
        >
          <Table>
            <TableHeader className="bg-gradient-to-r from-gray-50 to-sky-50/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-medium text-sky-900/70">CNPJ</TableHead>
                <TableHead className="font-medium text-sky-900/70">Fornecedor</TableHead>
                <TableHead className="hidden md:table-cell font-medium text-sky-900/70">Regime</TableHead>
                <TableHead className="hidden md:table-cell font-medium text-sky-900/70">Contato</TableHead>
                <TableHead className="text-right font-medium text-sky-900/70">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.map((supplier, index) => (
                <motion.tr
                  key={supplier.id}
                  variants={rowVariants}
                  custom={index}
                  className={index % 2 === 0 ? "bg-white hover:bg-sky-50/50" : "bg-sky-50/30 hover:bg-sky-50/50"}
                  style={{
                    transition: "all 0.2s ease"
                  }}
                >
                  <TableCell className="font-mono text-sm">
                    {formatCnpj(supplier.cnpj)}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sky-900">{supplier.name}</p>
                      {supplier.tradeName && (
                        <p className="text-muted-foreground text-xs">{supplier.tradeName}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {supplier.taxRegime && (
                      <Badge variant="outline" className={getTaxRegimeColor(supplier.taxRegime)}>
                        {supplier.taxRegime}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-col text-sm">
                      {supplier.email && (
                        <div className="flex items-center gap-1 text-sky-700">
                          <Mail className="h-3 w-3" />
                          <span className="text-xs truncate max-w-[150px]">{supplier.email}</span>
                        </div>
                      )}
                      {supplier.phone && (
                        <div className="flex items-center gap-1 text-sky-700">
                          <Phone className="h-3 w-3" />
                          <span className="text-xs">{supplier.phone}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-sky-700 hover:text-sky-800 hover:bg-sky-50"
                      onClick={() => onShowDetails(supplier)}
                    >
                      <FileText className="h-4 w-4 mr-1" /> Detalhes
                    </Button>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      )}
    </div>
  );
};

export default SuppliersTable;
