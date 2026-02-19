import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth';
import { ROUTES } from '../routes';

interface RequireAuthGuardProps {
  children: React.ReactElement;
  redirectTo?: string;
}

export const RequireAuthGuard: React.FC<RequireAuthGuardProps> = ({
  children,
  redirectTo = ROUTES.ROOT,
}) => {
  const { isAuthenticated, isRehydrated } = useAuth();
  

  if (!isRehydrated) {
    return null;
  }
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};
