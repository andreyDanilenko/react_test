import type { ComponentType } from 'react';

export interface ModalOptions {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

export interface ModalConfig<P = any> {
  component: ComponentType<P & { onClose: () => void }>;
  props?: Omit<P, 'onClose'>;
  options?: ModalOptions;
}

export interface ModalContextType {
  openModal: <P>(config: ModalConfig<P>) => void;
  closeModal: () => void;
  updateModal: <P>(config: Partial<ModalConfig<P>>) => void;
  modalConfig: ModalConfig | null;
  isOpen: boolean;
}
