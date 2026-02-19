import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../store';
import AppRouter from '../router/AppRouter';
import { useAuthRehydration } from '@/features/auth/lib';

const AppProvider: React.FC = () => (
  <ReduxProvider store={store}>
    <AppWithRehydration />
  </ReduxProvider>
);

const AppWithRehydration: React.FC = () => {
  useAuthRehydration();
  return <AppRouter />;
};

export default AppProvider;
