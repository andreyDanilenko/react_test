import React, { useState, useCallback, type ReactNode } from 'react';
import { ModalContext } from './context';
import type { ModalConfig } from './types';

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);

  const openModal = useCallback(<P,>(config: ModalConfig<P>) => {
    setModalConfig(config as ModalConfig);
  }, []);

  const closeModal = useCallback(() => {
    setModalConfig(null);
  }, []);

  const updateModal = useCallback(<P,>(config: Partial<ModalConfig<P>>) => {
    setModalConfig(prev => prev ? { ...prev, ...config } : null);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        updateModal,
        modalConfig,
        isOpen: !!modalConfig,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
