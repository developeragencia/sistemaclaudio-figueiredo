import React from 'react';
import { Box } from '@mui/material';
import { PagamentoList } from '../../components/Pagamentos/PagamentoList';

const PagamentosPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <PagamentoList />
    </Box>
  );
};

export default PagamentosPage; 