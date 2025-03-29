import React, { useState, useEffect } from 'react';
import { Box, Autocomplete, TextField, Typography } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../config/supabase';

interface Cliente {
  id: string;
  cnpj: string;
  razaoSocial: string;
}

export const ClienteSelector = () => {
  const { user, setClienteAtivo } = useAuth();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClientes();
  }, []);

  async function loadClientes() {
    try {
      let query = supabase.from('clientes').select('*');
      
      // Filtrar clientes baseado no perfil do usuário
      if (user?.perfil === 'representante') {
        query = query.eq('representante_id', user.id);
      } else if (user?.perfil === 'escritorio') {
        query = query.eq('escritorio_id', user.id);
      }

      const { data } = await query;
      if (data) {
        setClientes(data);
      }
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleClienteChange = (_: any, cliente: Cliente | null) => {
    if (cliente) {
      setClienteAtivo(cliente);
    }
  };

  if (loading) {
    return <Typography>Carregando clientes...</Typography>;
  }

  return (
    <Box sx={{ minWidth: 300, p: 2 }}>
      <Autocomplete
        options={clientes}
        getOptionLabel={(option) => `${option.razaoSocial} (${option.cnpj})`}
        value={user?.clienteAtivo || null}
        onChange={handleClienteChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Cliente Ativo"
            variant="outlined"
            size="small"
          />
        )}
        isOptionEqualToValue={(option, value) => option.id === value.id}
      />
    </Box>
  );
}; 