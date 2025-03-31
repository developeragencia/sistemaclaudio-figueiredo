
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect to login if not logged in
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Wrap children in Layout for protected routes
  return <Layout>{children}</Layout>;
};

export default ProtectedRoute;
