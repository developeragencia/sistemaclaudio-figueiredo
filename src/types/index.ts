
// Client Types
export type ClientStatus = 'active' | 'inactive' | 'pending';

export interface Client {
  id: string;
  name: string;
  cnpj: string;
  status: ClientStatus;
  email: string;
  phone?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

// User Types
export type UserRole = 'admin' | 'office_staff' | 'client' | 'sales_rep';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  clientId?: string;
  isActive: boolean;
  createdAt: Date;
}

// Proposal Types
export type ProposalStatus = 'requested' | 'analyzing' | 'approved' | 'rejected' | 'converted';

export interface Proposal {
  id: string;
  clientId: string;
  representativeId: string;
  title: string;
  description: string;
  status: ProposalStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Activity Types
export type ActivityType = 'login' | 'create_client' | 'update_client' | 'create_proposal' | 'update_proposal' | 'import_data';

export interface Activity {
  id: string;
  userId: string;
  clientId?: string;
  type: ActivityType;
  description: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

// Dashboard Statistics
export interface DashboardStats {
  totalClients: number;
  activeClients: number;
  pendingProposals: number;
  totalCredits: number;
  recentActivities: Activity[];
}
