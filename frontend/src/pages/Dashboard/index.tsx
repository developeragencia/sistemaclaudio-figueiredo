import React from 'react';
import {
  Box,
  Container,
  Grid,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import api from '../../services/api';

interface DashboardStats {
  totalBueiros: number;
  manutencoesPendentes: number;
  ocorrenciasAbertas: number;
  ultimaAtualizacao: string;
}

const Dashboard: React.FC = () => {
  const { data: stats, isLoading } = useQuery<DashboardStats>(
    'dashboardStats',
    async () => {
      const response = await api.get('/dashboard/stats');
      return response.data;
    }
  );

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={8}>
        <Heading size="lg">Dashboard</Heading>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        <Box p={6} bg="white" borderRadius="lg" boxShadow="sm">
          <Stat>
            <StatLabel>Total de Bueiros</StatLabel>
            <StatNumber>{isLoading ? '-' : stats?.totalBueiros}</StatNumber>
            <StatHelpText>Cadastrados no sistema</StatHelpText>
          </Stat>
        </Box>

        <Box p={6} bg="white" borderRadius="lg" boxShadow="sm">
          <Stat>
            <StatLabel>Manutenções Pendentes</StatLabel>
            <StatNumber>{isLoading ? '-' : stats?.manutencoesPendentes}</StatNumber>
            <StatHelpText>Aguardando atendimento</StatHelpText>
          </Stat>
        </Box>

        <Box p={6} bg="white" borderRadius="lg" boxShadow="sm">
          <Stat>
            <StatLabel>Ocorrências Abertas</StatLabel>
            <StatNumber>{isLoading ? '-' : stats?.ocorrenciasAbertas}</StatNumber>
            <StatHelpText>Necessitam atenção</StatHelpText>
          </Stat>
        </Box>

        <Box p={6} bg="white" borderRadius="lg" boxShadow="sm">
          <Stat>
            <StatLabel>Última Atualização</StatLabel>
            <StatNumber>
              {isLoading ? '-' : new Date(stats?.ultimaAtualizacao || '').toLocaleDateString()}
            </StatNumber>
            <StatHelpText>Dados do sistema</StatHelpText>
          </Stat>
        </Box>
      </SimpleGrid>

      {/* Aqui você pode adicionar mais componentes como gráficos, tabelas, etc. */}
    </Container>
  );
};

export default Dashboard; 