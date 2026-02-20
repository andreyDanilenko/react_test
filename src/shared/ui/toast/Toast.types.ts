import type { Toast as HotToastType } from 'react-hot-toast';

export interface ToastProps {
    t: HotToastType;
    message: string;
    type?: 'success' | 'error' | 'info' | 'warning' | 'loading';
    title?: string;
    onClose?: () => void;
  }
  