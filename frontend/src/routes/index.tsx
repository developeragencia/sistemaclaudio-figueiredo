import React from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Pages
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';

const Routes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <RouterRoutes>
      {/* Rotas públicas */}
      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
      />

      {/* Rotas protegidas */}
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile"
        element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
      />

      {/* Rota padrão */}
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* Rota 404 */}
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};

export default Routes; 