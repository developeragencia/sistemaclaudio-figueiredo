import React from 'react';
import { Box, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { ClienteList } from '../../components/Clientes/ClienteList';
import { useAuth } from '../../contexts/AuthContext';

const ClientesPage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <Box sx={{ p: 3 }}>
      {user?.perfil === 'representante' && (
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => router.push('/clientes/novo')}
          >
            Novo Cliente
          </Button>
        </Box>
      )}
      <ClienteList />
    </Box>
  );
};

export default ClientesPage; 