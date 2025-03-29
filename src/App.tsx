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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Index />} />

          {/* Main Dashboard */}
          <Route path="/dashboard" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
          
          {/* Auditoria Fiscal */}
          <Route path="/tax-audit" element={
            <Layout>
              <AuditTax />
            </Layout>
          } />
          
          {/* Módulos Principais */}
          <Route path="/clients-management" element={
            <Layout>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Gestão de Clientes</h1>
                <p className="text-gray-500">Página em desenvolvimento</p>
              </div>
            </Layout>
          } />
          
          {/* Cálculos e Recuperação */}
          <Route path="/irrf-calculations" element={
            <Layout>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Cálculos IRRF</h1>
                <p className="text-gray-500">Página em desenvolvimento</p>
              </div>
            </Layout>
          } />
          <Route path="/irrf-recovery" element={
            <Layout>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Recuperação IRRF/PJ</h1>
                <p className="text-gray-500">Página em desenvolvimento</p>
              </div>
            </Layout>
          } />
          <Route path="/credits-identification" element={
            <Layout>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Identificação de Créditos</h1>
                <p className="text-gray-500">Página em desenvolvimento</p>
              </div>
            </Layout>
          } />
          
          {/* Relatórios */}
          <Route path="/detailed-reports" element={
            <Layout>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Relatórios Detalhados</h1>
                <p className="text-gray-500">Página em desenvolvimento</p>
              </div>
            </Layout>
          } />
          <Route path="/retention-receipts" element={
            <Layout>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Comprovantes de Retenção</h1>
                <p className="text-gray-500">Página em desenvolvimento</p>
              </div>
            </Layout>
          } />
          <Route path="/fiscal-reports" element={
            <Layout>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Relatórios Fiscais</h1>
                <p className="text-gray-500">Página em desenvolvimento</p>
              </div>
            </Layout>
          } />
          <Route path="/interactive-dashboard" element={
            <Layout>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Dashboard Interativo</h1>
                <p className="text-gray-500">Página em desenvolvimento</p>
              </div>
            </Layout>
          } />
          
          {/* Gestão */}
          <Route path="/commercial-proposals" element={
            <Layout>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Propostas Comerciais</h1>
                <p className="text-gray-500">Página em desenvolvimento</p>
              </div>
            </Layout>
          } />
          <Route path="/tax-compensation" element={
            <Layout>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Compensação Tributária</h1>
                <p className="text-gray-500">Página em desenvolvimento</p>
              </div>
            </Layout>
          } />
          <Route path="/audit-management" element={
            <Layout>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Gestão de Auditorias</h1>
                <p className="text-gray-500">Página em desenvolvimento</p>
              </div>
            </Layout>
          } />
          
          {/* Sistema */}
          <Route path="/security-audit" element={
            <Layout>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Segurança & Auditoria</h1>
                <p className="text-gray-500">Página em desenvolvimento</p>
              </div>
            </Layout>
          } />
          <Route path="/operational" element={
            <Layout>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Operacional</h1>
                <p className="text-gray-500">Página em desenvolvimento</p>
              </div>
            </Layout>
          } />
          <Route path="/site-content" element={
            <Layout>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Site e Conteúdo</h1>
                <p className="text-gray-500">Página em desenvolvimento</p>
              </div>
            </Layout>
          } />
          <Route path="/import" element={
            <Layout>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Importação</h1>
                <p className="text-gray-500">Página em desenvolvimento</p>
              </div>
            </Layout>
          } />
          <Route path="/support" element={
            <Layout>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Suporte</h1>
                <p className="text-gray-500">Página em desenvolvimento</p>
              </div>
            </Layout>
          } />
          <Route path="/settings" element={
            <Layout>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Configurações</h1>
                <p className="text-gray-500">Página em desenvolvimento</p>
              </div>
            </Layout>
          } />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
