import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import ClientsManagement from "@/pages/ClientsManagement";
import TaxCredits from "@/pages/TaxCredits";
import Reports from "@/pages/Reports";
import SettingsLayout from "@/pages/settings/SettingsLayout";
import ProfileSettings from "@/pages/settings/ProfileSettings";
import AccountSettings from "@/pages/settings/AccountSettings";
import SecuritySettings from "@/pages/settings/SecuritySettings";
import AppearanceSettings from "@/pages/settings/AppearanceSettings";
import SystemSettings from "@/pages/settings/SystemSettings";
import SiteSettings from "@/pages/settings/SiteSettings";
import DatabaseSettings from "@/pages/settings/DatabaseSettings";
import LayoutSettings from "@/pages/settings/LayoutSettings";
// Other imports as needed

/**
 * Main dashboard and core routes
 */
export const mainRoutes = [
  <Route 
    path="/dashboard" 
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />,
  <Route 
    path="/clients-management" 
    element={
      <ProtectedRoute>
        <ClientsManagement />
      </ProtectedRoute>
    }
  />,
];

/**
 * Operational routes for daily workflow
 */
export const operationalRoutes = [
  <Route 
    path="/operational-dashboard" 
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />,
  // Add other operational routes here
];

/**
 * Tax Credit specific routes
 */
export const taxCreditRoutes = [
  <Route 
    path="/tax-credits" 
    element={
      <ProtectedRoute>
        <TaxCredits />
      </ProtectedRoute>
    }
  />,
  // Add other tax credit routes here
];

/**
 * Security and audit routes
 */
export const securityRoutes = [
  <Route 
    path="/security-hub" 
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />,
  // Add other security routes here
];

/**
 * Settings routes using the SettingsLayout component
 */
export const settingsRoutes = [
  <Route 
    path="/settings" 
    element={
      <ProtectedRoute>
        <SettingsLayout />
      </ProtectedRoute>
    }
  >
    <Route path="profile" element={<ProfileSettings />} />
    <Route path="account" element={<AccountSettings />} />
    <Route path="security" element={<SecuritySettings />} />
    <Route path="appearance" element={<AppearanceSettings />} />
    <Route path="system" element={<SystemSettings />} />
    <Route path="site" element={<SiteSettings />} />
    <Route path="database" element={<DatabaseSettings />} />
    <Route path="layout" element={<LayoutSettings />} />
    <Route index element={<ProfileSettings />} />
  </Route>,
];

/**
 * Profile routes
 */
export const profileRoutes = [
  <Route 
    path="/profile" 
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />,
];

/**
 * Routes that are placeholders or under development
 */
export const placeholderRoutes = [
  <Route 
    path="/reports" 
    element={
      <ProtectedRoute>
        <Reports />
      </ProtectedRoute>
    }
  />,
  // Add other placeholder routes here
];
