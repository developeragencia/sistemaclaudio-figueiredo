
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import AuditTax from "./pages/AuditTax";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import { useState } from "react";
import Favicon from "./components/ui/Favicon";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SiteEditor from "./components/admin/SiteEditor";
import { ToastProvider } from "@/hooks/use-toast";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ToastProvider>
          <AuthProvider>
            <BrowserRouter>
              <Favicon />
              <Toaster />
              <Sonner />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />

                {/* Protected Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <Layout>
                      <Admin />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/tax-audit" element={
                  <ProtectedRoute>
                    <Layout>
                      <AuditTax />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/site-editor" element={
                  <ProtectedRoute>
                    <Layout>
                      <SiteEditor />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/clients-management" element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-6">
                        <h1 className="text-2xl font-bold">Gestão de Clientes</h1>
                        <p className="text-gray-500">Página em desenvolvimento</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/irrf-calculations" element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-6">
                        <h1 className="text-2xl font-bold">Cálculos IRRF</h1>
                        <p className="text-gray-500">Página em desenvolvimento</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/irrf-recovery" element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-6">
                        <h1 className="text-2xl font-bold">Recuperação IRRF/PJ</h1>
                        <p className="text-gray-500">Página em desenvolvimento</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/credits-identification" element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-6">
                        <h1 className="text-2xl font-bold">Identificação de Créditos</h1>
                        <p className="text-gray-500">Página em desenvolvimento</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/detailed-reports" element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-6">
                        <h1 className="text-2xl font-bold">Relatórios Detalhados</h1>
                        <p className="text-gray-500">Página em desenvolvimento</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/retention-receipts" element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-6">
                        <h1 className="text-2xl font-bold">Comprovantes de Retenção</h1>
                        <p className="text-gray-500">Página em desenvolvimento</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/fiscal-reports" element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-6">
                        <h1 className="text-2xl font-bold">Relatórios Fiscais</h1>
                        <p className="text-gray-500">Página em desenvolvimento</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/interactive-dashboard" element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-6">
                        <h1 className="text-2xl font-bold">Dashboard Interativo</h1>
                        <p className="text-gray-500">Página em desenvolvimento</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/commercial-proposals" element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-6">
                        <h1 className="text-2xl font-bold">Propostas Comerciais</h1>
                        <p className="text-gray-500">Página em desenvolvimento</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/tax-compensation" element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-6">
                        <h1 className="text-2xl font-bold">Compensação Tributária</h1>
                        <p className="text-gray-500">Página em desenvolvimento</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/audit-management" element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-6">
                        <h1 className="text-2xl font-bold">Gestão de Auditorias</h1>
                        <p className="text-gray-500">Página em desenvolvimento</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/security-audit" element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-6">
                        <h1 className="text-2xl font-bold">Segurança & Auditoria</h1>
                        <p className="text-gray-500">Página em desenvolvimento</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/operational" element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-6">
                        <h1 className="text-2xl font-bold">Operacional</h1>
                        <p className="text-gray-500">Página em desenvolvimento</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/site-content" element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-6">
                        <h1 className="text-2xl font-bold">Site e Conteúdo</h1>
                        <p className="text-gray-500">Página em desenvolvimento</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/import" element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-6">
                        <h1 className="text-2xl font-bold">Importação</h1>
                        <p className="text-gray-500">Página em desenvolvimento</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/two-factor-auth" element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-6">
                        <h1 className="text-2xl font-bold text-blue-800">Autenticação em Dois Fatores</h1>
                        <p className="text-blue-600">Configure a autenticação em dois fatores para aumentar a segurança das contas.</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/session-expiration" element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-6">
                        <h1 className="text-2xl font-bold text-blue-800">Expiração de Sessão</h1>
                        <p className="text-blue-600">Configure o tempo de expiração das sessões dos usuários no sistema.</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/access-protection" element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-6">
                        <h1 className="text-2xl font-bold text-blue-800">Proteção de Acesso</h1>
                        <p className="text-blue-600">Configure as políticas de proteção de acesso ao sistema.</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/audit-trails" element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-6">
                        <h1 className="text-2xl font-bold text-blue-800">Trilhas de Auditoria</h1>
                        <p className="text-blue-600">Visualize os registros de atividades no sistema para fins de auditoria.</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/users-permissions" element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-6">
                        <h1 className="text-2xl font-bold text-blue-800">Usuários e Permissões</h1>
                        <p className="text-blue-600">Gerencie usuários e suas permissões de acesso ao sistema.</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/support" element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-6">
                        <h1 className="text-2xl font-bold">Suporte</h1>
                        <p className="text-gray-500">Página em desenvolvimento</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-6">
                        <h1 className="text-2xl font-bold">Configurações</h1>
                        <p className="text-gray-500">Página em desenvolvimento</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </ToastProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
