import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/app/store';
import AppRouter from '@/app/router/AppRouter';
import { useAuthRehydration } from '@/features/auth/lib';
import { ToastProvider } from './ToastProvider';
import { ModalProvider } from '@/shared/lib/modal';
import { ModalRenderer } from '@/shared/ui';

const AppProvider: React.FC = () => (
  <ReduxProvider store={store}>
      <ModalProvider>
        <ToastProvider>
          <AppWithRehydration />
          <ModalRenderer />
        </ToastProvider>
      </ModalProvider>
  </ReduxProvider>
);

const AppWithRehydration: React.FC = () => {
  useAuthRehydration();
  return <AppRouter />;
};

export default AppProvider;
