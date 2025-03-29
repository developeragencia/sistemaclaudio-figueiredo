
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
          <Route path="/clients" element={
            <Layout>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Clientes</h1>
                <p className="text-gray-500">Página em desenvolvimento</p>
              </div>
            </Layout>
          } />
          <Route path="/proposals" element={
            <Layout>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Propostas</h1>
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
          <Route path="/audit" element={
            <Layout>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Auditoria</h1>
                <p className="text-gray-500">Página em desenvolvimento</p>
              </div>
            </Layout>
          } />
          <Route path="/reports" element={
            <Layout>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Relatórios</h1>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
