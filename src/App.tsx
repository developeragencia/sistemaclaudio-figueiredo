
import React, { useState } from "react";
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
import Favicon from "./components/ui/Favicon";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SiteEditor from "./components/admin/SiteEditor";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Favicon />
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
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
              
              <Route path="/tax-audit" element={
                <ProtectedRoute>
                  <Layout>
                    <AuditTax />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Site Editor Route */}
              <Route path="/site-editor" element={
                <ProtectedRoute>
                  <Layout>
                    <SiteEditor />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Módulos Principais - Protected */}
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
              
              {/* Cálculos e Recuperação - Protected */}
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
              
              {/* Relatórios - Protected */}
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
              
              {/* Gestão - Protected */}
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
              
              {/* Sistema - Protected */}
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
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
