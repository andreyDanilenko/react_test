import React from 'react';
import { useModal } from '@/shared/lib/modal/context';
import { Modal } from '@/shared/ui';

const ModalRenderer: React.FC = () => {
  const { modalConfig, closeModal, isOpen } = useModal();

  if (!modalConfig || !isOpen) return null;

  const { component: Component, props, options } = modalConfig;

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      size={options?.size}
      closeOnOverlayClick={options?.closeOnOverlayClick}
      closeOnEsc={options?.closeOnEsc}
    >
      <Component {...props} onClose={closeModal} />
    </Modal>
  );
};

export default ModalRenderer
