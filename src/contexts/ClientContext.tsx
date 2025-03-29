
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Client } from '../types';
import { getActiveClient } from '../services/mockData';

interface ClientContextType {
  activeClient: Client | null;
  setActiveClient: (client: Client | null) => void;
  loading: boolean;
}

export const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [activeClient, setActiveClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchActiveClient = async () => {
      try {
        const client = await getActiveClient();
        setActiveClient(client);
      } catch (error) {
        console.error('Failed to fetch active client:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveClient();
  }, []);

  return (
    <ClientContext.Provider value={{ activeClient, setActiveClient, loading }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
};
