
import React from "react";
import { Routes, Route } from "react-router-dom";
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

      {/* Protected Routes */}
      {mainRoutes}
      {operationalRoutes}
      {taxCreditRoutes}
      {securityRoutes}
      {profileRoutes}
      {settingsRoutes}
      {placeholderRoutes}
    </Routes>
  );
};

export default AppRoutes;
