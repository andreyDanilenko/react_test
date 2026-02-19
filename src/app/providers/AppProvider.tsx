import React, { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { store } from '../store';
import AppRouter from '../router/AppRouter';
import { setAuthStore } from '@/shared/api/authApi';
import { setTokens, logout } from '@/features/auth/model/authSlice';
import { useAuthRehydration } from '@/features/auth/lib';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
    },
  },
});

const AppProvider: React.FC = () => {
  useEffect(() => {
    setAuthStore(store.getState.bind(store), store.dispatch, {
      setTokens,
      logout,
    });
  }, []);

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppWithRehydration />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ReduxProvider>
  );
};

const AppWithRehydration: React.FC = () => {
  useAuthRehydration();
  return <AppRouter />;
};

export default AppProvider;
