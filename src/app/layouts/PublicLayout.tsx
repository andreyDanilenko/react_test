import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks';
import { ROUTES } from '@/app/router/routes';

export const PublicLayout: React.FC = () => {
  const { isAuthenticated, isRehydrated } = useAuth();

  if (!isRehydrated) return null;
  if (isAuthenticated) return <Navigate to={ROUTES.HOME} replace />;

  return <Outlet />;
};
