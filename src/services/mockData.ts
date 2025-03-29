
import { Client, User, Proposal, Activity, DashboardStats } from '../types';

// Mock Clients
export const clients: Client[] = [
  {
    id: '1',
    name: 'Prefeitura de São Paulo',
    cnpj: '45.741.079/0001-50',
    status: 'active',
    email: 'contato@prefeiturasp.gov.br',
    phone: '(11) 3333-4444',
    address: 'Viaduto do Chá, 15, Centro, São Paulo - SP',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-10-10')
  },
  {
    id: '2',
    name: 'Governo do Estado de Minas Gerais',
    cnpj: '18.715.581/0001-03',
    status: 'active',
    email: 'contato@mg.gov.br',
    phone: '(31) 3915-9000',
    address: 'Cidade Administrativa, Belo Horizonte - MG',
    createdAt: new Date('2023-02-20'),
    updatedAt: new Date('2023-09-25')
  },
  {
    id: '3',
    name: 'Universidade Federal do Rio de Janeiro',
    cnpj: '33.663.683/0001-16',
    status: 'pending',
    email: 'contato@ufrj.br',
    phone: '(21) 3938-9600',
    address: 'Av. Pedro Calmon, 550, Cidade Universitária, Rio de Janeiro - RJ',
    createdAt: new Date('2023-05-10'),
    updatedAt: new Date('2023-05-10')
  },
  {
    id: '4',
    name: 'Tribunal Regional Federal da 3ª Região',
    cnpj: '59.949.362/0001-76',
    status: 'inactive',
    email: 'contato@trf3.jus.br',
    phone: '(11) 3848-1100',
    address: 'Av. Paulista, 1842, Torre Sul, São Paulo - SP',
    createdAt: new Date('2022-11-05'),
    updatedAt: new Date('2023-04-15')
  }
];

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@taxcredit.com',
    role: 'admin',
    isActive: true,
    createdAt: new Date('2022-10-01')
  },
  {
    id: '2',
    name: 'Office Staff',
    email: 'staff@taxcredit.com',
    role: 'office_staff',
    isActive: true,
    createdAt: new Date('2023-01-05')
  },
  {
    id: '3',
    name: 'Client User',
    email: 'cliente@prefeiturasp.gov.br',
    role: 'client',
    clientId: '1',
    isActive: true,
    createdAt: new Date('2023-02-10')
  },
  {
    id: '4',
    name: 'Sales Rep',
    email: 'vendas@taxcredit.com',
    role: 'sales_rep',
    isActive: true,
    createdAt: new Date('2023-03-15')
  }
];

// Mock Proposals
export const proposals: Proposal[] = [
  {
    id: '1',
    clientId: '1',
    representativeId: '4',
    title: 'Recuperação de créditos tributários 2019-2023',
    description: 'Proposta para recuperação de créditos do período de 2019 a 2023, estimativa de R$ 2.5 milhões.',
    status: 'approved',
    createdAt: new Date('2023-06-10'),
    updatedAt: new Date('2023-06-25')
  },
  {
    id: '2',
    clientId: '2',
    representativeId: '4',
    title: 'Auditoria fiscal e recuperação 2020-2022',
    description: 'Auditoria completa e recuperação de créditos do período de 2020 a 2022.',
    status: 'analyzing',
    createdAt: new Date('2023-07-20'),
    updatedAt: new Date('2023-07-20')
  },
  {
    id: '3',
    clientId: '3',
    representativeId: '4',
    title: 'Análise preliminar de potencial de recuperação',
    description: 'Análise preliminar para identificação de oportunidades de recuperação de créditos.',
    status: 'requested',
    createdAt: new Date('2023-08-15'),
    updatedAt: new Date('2023-08-15')
  }
];

// Mock Activities
export const activities: Activity[] = [
  {
    id: '1',
    userId: '1',
    type: 'create_client',
    description: 'Cliente Prefeitura de São Paulo criado',
    createdAt: new Date('2023-01-15'),
    clientId: '1'
  },
  {
    id: '2',
    userId: '4',
    clientId: '1',
    type: 'create_proposal',
    description: 'Proposta de recuperação criada para Prefeitura de São Paulo',
    createdAt: new Date('2023-06-10')
  },
  {
    id: '3',
    userId: '1',
    clientId: '1',
    type: 'update_proposal',
    description: 'Proposta aprovada para Prefeitura de São Paulo',
    createdAt: new Date('2023-06-25')
  },
  {
    id: '4',
    userId: '2',
    clientId: '2',
    type: 'create_client',
    description: 'Cliente Governo de Minas Gerais criado',
    createdAt: new Date('2023-02-20')
  },
  {
    id: '5',
    userId: '3',
    clientId: '1',
    type: 'login',
    description: 'Usuário Cliente User fez login',
    createdAt: new Date('2023-10-05')
  }
];

// Dashboard Statistics
export const dashboardStats: DashboardStats = {
  totalClients: clients.length,
  activeClients: clients.filter(client => client.status === 'active').length,
  pendingProposals: proposals.filter(proposal => proposal.status === 'requested' || proposal.status === 'analyzing').length,
  totalCredits: 3750000, // R$ 3,75 milhões
  recentActivities: activities.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5)
};

// Service functions
export const getClients = (): Promise<Client[]> => {
  return Promise.resolve(clients);
};

export const getActiveClient = (): Promise<Client | null> => {
  return Promise.resolve(clients.find(client => client.status === 'active') || null);
};

export const getUsers = (): Promise<User[]> => {
  return Promise.resolve(users);
};

export const getProposals = (): Promise<Proposal[]> => {
  return Promise.resolve(proposals);
};

export const getActivities = (clientId?: string): Promise<Activity[]> => {
  let filteredActivities = activities;
  if (clientId) {
    filteredActivities = activities.filter(activity => activity.clientId === clientId);
  }
  return Promise.resolve(filteredActivities.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
};

export const getDashboardStats = (): Promise<DashboardStats> => {
  return Promise.resolve(dashboardStats);
};
