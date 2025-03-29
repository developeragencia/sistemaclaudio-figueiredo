import React from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { PropostaForm } from '../../components/Propostas/PropostaForm';
import { useAuth } from '../../contexts/AuthContext';

const PropostaPage: React.FC = () => {
  const router = useRouter();
  const { action, id } = router.query;
  const { user } = useAuth();

  // Redireciona se não for representante
  React.useEffect(() => {
    if (user && user.perfil !== 'representante') {
      router.push('/propostas');
    }
  }, [user]);

  if (!user || user.perfil !== 'representante') {
    return null;
  }

  return (
    <Box sx={{ p: 3 }}>
      <PropostaForm id={action === 'editar' ? id as string : undefined} />
    </Box>
  );
};

export default PropostaPage; 