export interface ConfirmModalProps {
    onClose: () => void;
    title: string;
    message: string;
    onConfirm: () => Promise<void>;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
  }
