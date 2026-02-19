import React from 'react';
import { Toaster } from 'react-hot-toast';

const toastAnimations = `
@keyframes slide-in {
  from {
    transform: translateX(120%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(120%);
    opacity: 0;
  }
}

.animate-slide-in {
  animation: slide-in 0.3s cubic-bezier(0.21, 1.02, 0.73, 1) forwards;
}

.animate-slide-out {
  animation: slide-out 0.2s cubic-bezier(0.06, 0.71, 0.55, 1) forwards;
}
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = toastAnimations;
  document.head.appendChild(style);
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'transparent',
            padding: 0,
            boxShadow: 'none',
          },
        }}
      />
    </>
  );
};
