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
import ClientsManagement from "./pages/ClientsManagement";
import DataImport from "./pages/DataImport";
import RetentionAudit from "./pages/RetentionAudit";
import Reports from "./pages/Reports";
import SecuritySettingsPage from "./pages/SecuritySettings";
import SuppliersManagement from "./pages/SuppliersManagement";
import PaymentsManagement from "./pages/PaymentsManagement";
import { TwoFactorAuth } from "./components/auth/TwoFactorAuth";
import OperationalImport from "./pages/operational/OperationalImport";
import OperationalDashboard from "./pages/operational/OperationalDashboard";
import OperationalAudits from "./pages/operational/OperationalAudits";
import OperationalReceipts from "./pages/operational/OperationalReceipts";
import TaxCredits from "./pages/TaxCredits";
import AdvancedCalculator from "./pages/AdvancedCalculator";
import SecurityHub from "./pages/SecurityHub";
import TwoFactorAuthPage from "./pages/SecurityPages/TwoFactorAuthPage";
import SessionExpirationPage from "./pages/SecurityPages/SessionExpirationPage";
import AccessProtectionPage from "./pages/SecurityPages/AccessProtectionPage";
import AuditTrailsPage from "./pages/SecurityPages/AuditTrailsPage";
import UsersPermissionsPage from "./pages/SecurityPages/UsersPermissionsPage";
import PasswordResetPage from "./pages/PasswordResetPage";

// Import new settings pages
import SettingsLayout from "./pages/settings/SettingsLayout";
import ProfileSettings from "./pages/settings/ProfileSettings";
import AccountSettings from "./pages/settings/AccountSettings";
import SecuritySettings from "./pages/settings/SecuritySettings";
import AppearanceSettings from "./pages/settings/AppearanceSettings";
import SystemSettings from "./pages/settings/SystemSettings";
import SiteSettings from "./pages/settings/SiteSettings";
import DatabaseSettings from "./pages/settings/DatabaseSettings";
import LayoutSettings from "./pages/settings/LayoutSettings";

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
              <Route path="/reset-password" element={<PasswordResetPage />} />
              <Route path="/2fa" element={<TwoFactorAuth />} />

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
              
              <Route path="/import" element={
                <ProtectedRoute>
                  <Layout>
                    <DataImport />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/retention-audit" element={
                <ProtectedRoute>
                  <Layout>
                    <RetentionAudit />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/reports" element={
                <ProtectedRoute>
                  <Layout>
                    <Reports />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/security" element={
                <ProtectedRoute>
                  <Layout>
                    <SecuritySettingsPage />
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
                    <ClientsManagement />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/suppliers-management" element={
                <ProtectedRoute>
                  <Layout>
                    <SuppliersManagement />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/payments-management" element={
                <ProtectedRoute>
                  <Layout>
                    <PaymentsManagement />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/operational-import" element={
                <ProtectedRoute>
                  <Layout>
                    <OperationalImport />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/operational-dashboard" element={
                <ProtectedRoute>
                  <Layout>
                    <OperationalDashboard />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/operational-audits" element={
                <ProtectedRoute>
                  <Layout>
                    <OperationalAudits />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/operational-receipts" element={
                <ProtectedRoute>
                  <Layout>
                    <OperationalReceipts />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Tax Credits routes */}
              <Route path="/tax-credits" element={
                <ProtectedRoute>
                  <Layout>
                    <TaxCredits />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/advanced-calculator" element={
                <ProtectedRoute>
                  <Layout>
                    <AdvancedCalculator />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Security & Audit Routes */}
              <Route path="/security-hub" element={
                <ProtectedRoute>
                  <Layout>
                    <SecurityHub />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/two-factor-auth" element={
                <ProtectedRoute>
                  <Layout>
                    <TwoFactorAuthPage />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/session-expiration" element={
                <ProtectedRoute>
                  <Layout>
                    <SessionExpirationPage />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/access-protection" element={
                <ProtectedRoute>
                  <Layout>
                    <AccessProtectionPage />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/audit-trails" element={
                <ProtectedRoute>
                  <Layout>
                    <AuditTrailsPage />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/users-permissions" element={
                <ProtectedRoute>
                  <Layout>
                    <UsersPermissionsPage />
                  </Layout>
                </ProtectedRoute>
              } />

              {/* New Settings Routes */}
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Layout>
                    <SettingsLayout />
                  </Layout>
                </ProtectedRoute>
              }>
                <Route path="profile" element={<ProfileSettings />} />
                <Route path="account" element={<AccountSettings />} />
                <Route path="security" element={<SecuritySettings />} />
                <Route path="appearance" element={<AppearanceSettings />} />
                <Route path="system" element={<SystemSettings />} />
                <Route path="site" element={<SiteSettings />} />
                <Route path="database" element={<DatabaseSettings />} />
                <Route path="layout" element={<LayoutSettings />} />
                <Route index element={<ProfileSettings />} />
              </Route>
              
              {/* Placeholder routes */}
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
                      <h1 className="text-2xl font-bold">Painel Interativo</h1>
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
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
