import React from 'react';
import { toast } from 'react-hot-toast';
import { Toast } from '@/shared/ui/toast/Toast';
import { toastStyles } from '@/shared/ui/toast/styles';

type ToastType = keyof typeof toastStyles;

interface ToastOptions {
  title?: string;
  duration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

export const useAppToast = () => {
  const showToast = (
    message: string,
    type: ToastType = 'info',
    options?: ToastOptions
  ) => {
    return toast.custom(
      (t) =>
        React.createElement(Toast, {
          t,
          message,
          type,
          title: options?.title,
          onClose: () => toast.dismiss(t.id),
        }),
      {
        duration: options?.duration || 4000,
        position: options?.position || 'top-right',
      }
    );
  };

  const success = (message: string, options?: ToastOptions) => {
    return showToast(message, 'success', options);
  };

  const error = (message: string, options?: ToastOptions) => {
    return showToast(message, 'error', options);
  };

  const info = (message: string, options?: ToastOptions) => {
    return showToast(message, 'info', options);
  };

  const warning = (message: string, options?: ToastOptions) => {
    return showToast(message, 'warning', options);
  };

  const loading = (message: string, options?: ToastOptions) => {
    return toast.loading(message, {
      ...options,
      duration: Infinity,
    });
  };

  const dismiss = (toastId?: string) => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  };

  const promise = <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    },
    options?: ToastOptions
  ) => {
    return toast.promise(promise, messages, {
      ...options,
      success: {
        duration: options?.duration || 4000,
      },
    });
  };

  return {
    success,
    error,
    info,
    warning,
    loading,
    dismiss,
    promise,
    custom: showToast,
  };
};
