
import React, { useState } from 'react';
import { useClient } from '@/contexts/ClientContext';
import { Client } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, Users, ListChecks, FileSearch, Plus, 
  PenSquare, AlertCircle, CheckCircle2, XCircle, Briefcase
} from 'lucide-react';
import ClientDetails from '@/components/client/ClientDetails';
import ClientUsers from '@/components/client/ClientUsers';
import ClientProposals from '@/components/client/ClientProposals';
import ClientExecution from '@/components/client/ClientExecution';
import ClientTimeline from '@/components/client/ClientTimeline';
import { motion } from 'framer-motion';

const ClientsManagement = () => {
  const { clients, loading, setActiveClient } = useClient();
  const { userRole } = useAuth();
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedTab, setSelectedTab] = useState('details');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
    setActiveClient(client);
  };

  // Filter clients based on status
  const filteredClients = filterStatus
    ? clients.filter(client => client.status === filterStatus)
    : clients;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05 
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
  };

  const isAdmin = userRole === 'admin' || userRole === 'office_staff';

  return (
    <div className="container max-w-screen-2xl mx-auto py-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side - Clients List */}
        <motion.div 
          className="md:w-96 space-y-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header with filters */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Briefcase className="h-6 w-6" />
              Clientes
            </h1>
            {isAdmin && (
              <Button size="sm" className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                Novo
              </Button>
            )}
          </div>

          {/* Status Filters */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            <Button 
              variant={filterStatus === null ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilterStatus(null)}
            >
              Todos ({clients.length})
            </Button>
            <Button 
              variant={filterStatus === 'active' ? "default" : "outline"}
              size="sm"
              className="text-green-600"
              onClick={() => setFilterStatus('active')}
            >
              Ativos ({clients.filter(c => c.status === 'active').length})
            </Button>
            <Button 
              variant={filterStatus === 'pending' ? "default" : "outline"} 
              size="sm"
              className="text-yellow-600"
              onClick={() => setFilterStatus('pending')}
            >
              Pendentes ({clients.filter(c => c.status === 'pending').length})
            </Button>
            <Button 
              variant={filterStatus === 'inactive' ? "default" : "outline"} 
              size="sm"
              className="text-red-600"
              onClick={() => setFilterStatus('inactive')}
            >
              Inativos ({clients.filter(c => c.status === 'inactive').length})
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar cliente..."
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Clients List */}
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <motion.div 
              className="space-y-2 mt-4 max-h-[calc(100vh-240px)] overflow-y-auto pr-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredClients.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Nenhum cliente encontrado.
                </div>
              ) : (
                filteredClients.map((client) => (
                  <motion.div 
                    key={client.id}
                    variants={itemVariants}
                  >
                    <Card 
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedClient?.id === client.id ? 'border-primary ring-1 ring-primary' : ''
                      }`}
                      onClick={() => handleSelectClient(client)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{client.name}</h3>
                            <p className="text-sm text-gray-500">{client.cnpj}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className={`${
                              client.status === 'active'
                                ? 'bg-green-100 text-green-800 border-green-300'
                                : client.status === 'inactive'
                                ? 'bg-red-100 text-red-800 border-red-300'
                                : 'bg-yellow-100 text-yellow-800 border-yellow-300'
                            }`}
                          >
                            {client.status === 'active'
                              ? 'Ativo'
                              : client.status === 'inactive'
                              ? 'Inativo'
                              : 'Pendente'}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Right Side - Client Details */}
        <div className="flex-1">
          {selectedClient ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Client header */}
              <div className="bg-card rounded-lg p-6 border shadow-sm">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <h1 className="text-2xl font-bold">{selectedClient.name}</h1>
                    <p className="text-muted-foreground">CNPJ: {selectedClient.cnpj}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant="outline"
                        className={`${
                          selectedClient.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : selectedClient.status === 'inactive'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {selectedClient.status === 'active'
                          ? 'Ativo'
                          : selectedClient.status === 'inactive'
                          ? 'Inativo'
                          : 'Pendente'}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        Criado em: {selectedClient.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {isAdmin && (
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <PenSquare className="h-4 w-4" />
                        Editar
                      </Button>
                    )}
                    <Button variant="default" size="sm">
                      Definir como Ativo
                    </Button>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
                <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
                  <TabsTrigger value="details" className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    <span className="hidden md:inline">Detalhes</span>
                  </TabsTrigger>
                  <TabsTrigger value="users" className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span className="hidden md:inline">Usuários</span>
                  </TabsTrigger>
                  <TabsTrigger value="proposals" className="flex items-center gap-1">
                    <FileSearch className="h-4 w-4" />
                    <span className="hidden md:inline">Propostas</span>
                  </TabsTrigger>
                  <TabsTrigger value="execution" className="flex items-center gap-1">
                    <ListChecks className="h-4 w-4" />
                    <span className="hidden md:inline">Execução</span>
                  </TabsTrigger>
                  <TabsTrigger value="timeline" className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="hidden md:inline">Timeline</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <ClientDetails client={selectedClient} />
                </TabsContent>
                
                <TabsContent value="users" className="space-y-4">
                  <ClientUsers clientId={selectedClient.id} />
                </TabsContent>
                
                <TabsContent value="proposals" className="space-y-4">
                  <ClientProposals clientId={selectedClient.id} />
                </TabsContent>
                
                <TabsContent value="execution" className="space-y-4">
                  <ClientExecution clientId={selectedClient.id} />
                </TabsContent>
                
                <TabsContent value="timeline" className="space-y-4">
                  <ClientTimeline clientId={selectedClient.id} />
                </TabsContent>
              </Tabs>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center h-64 p-6 bg-card rounded-lg border shadow-sm"
            >
              <div className="text-center space-y-2">
                <Briefcase className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h2 className="text-xl font-medium">Selecione um cliente</h2>
                <p className="text-muted-foreground">
                  Escolha um cliente da lista para ver seus detalhes
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientsManagement;
