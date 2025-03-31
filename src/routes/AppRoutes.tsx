
import React from "react";
import { Routes } from "react-router-dom";
import Layout from "@/components/layout/Layout";

// Import route groups
import { publicRoutes } from "./publicRoutes";
import {
  mainRoutes,
  operationalRoutes,
  taxCreditRoutes,
  securityRoutes,
  settingsRoutes,
  profileRoutes,
  placeholderRoutes,
} from "./protectedRoutes";

/**
 * AppRoutes component that combines all route groups
 */
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes}

      {/* Protected Routes wrapped in Layout */}
      <React.Fragment>
        {/* Protected Main Routes */}
        {mainRoutes}

        {/* Operational Routes */}
        {operationalRoutes}

        {/* Tax Credits Routes */}
        {taxCreditRoutes}

        {/* Security & Audit Routes */}
        {securityRoutes}

        {/* Profile Routes */}
        {profileRoutes}

        {/* Settings Routes */}
        {settingsRoutes}

        {/* Placeholder Routes */}
        {placeholderRoutes}
      </React.Fragment>
    </Routes>
  );
};

export default AppRoutes;
