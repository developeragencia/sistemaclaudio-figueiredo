import React from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { PagamentoDetalhes } from '../../components/Pagamentos/PagamentoDetalhes';

const PagamentoDetalhesPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return null;
  }

  return (
    <Box sx={{ p: 3 }}>
      <PagamentoDetalhes id={id as string} />
    </Box>
  );
};

export default PagamentoDetalhesPage; 