import React, { useState } from 'react';
import { BaseButton } from '@/shared/ui';
import './ConfirmModal.css';

interface ConfirmModalProps {
  onClose: () => void;
  title: string;
  message: string;
  onConfirm: () => Promise<void>;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

const confirmButtonClass: Record<NonNullable<ConfirmModalProps['variant']>, string> = {
  danger: 'ConfirmModal__ConfirmBtn--danger',
  warning: 'ConfirmModal__ConfirmBtn--warning',
  info: 'ConfirmModal__ConfirmBtn--info',
};

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  onClose,
  title,
  message,
  onConfirm,
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
  variant = 'info',
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="ConfirmModal">
      <div className="ConfirmModal__Header">
        <h3 className="ConfirmModal__Title">{title}</h3>
      </div>

      <p className="ConfirmModal__Message">{message}</p>

      <div className="ConfirmModal__Actions">
        <BaseButton
          type="button"
          variant="ghost"
          size='sm'
          hasBorder
          onClick={onClose}
          disabled={loading}
        >
          {cancelText}
        </BaseButton>
        <BaseButton
          type="button"
          variant="primary"
          size='sm'
          className={confirmButtonClass[variant]}
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? '...' : confirmText}
        </BaseButton>
      </div>
    </div>
  );
};
