import React from 'react';
import type { Toast as HotToastType } from 'react-hot-toast';
import { baseToastStyle, toastStyles } from './styles';

export interface ToastProps {
  t: HotToastType;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning' | 'loading';
  title?: string;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  t,
  message,
  type = 'info',
  title,
  onClose,
}) => {
  const currentStyle = toastStyles[type];

  return (
    <div
      className={`transform transition-all duration-300 ${
        t.visible ? 'animate-slide-in' : 'animate-slide-out'
      }`}
      style={{
        ...baseToastStyle,
        borderLeft: `4px solid ${currentStyle.accentColor}`,
        alignItems: 'flex-start',
        opacity: t.visible ? 1 : 0,
        transform: t.visible ? 'translateX(0)' : 'translateX(120%)',
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <div
            style={{
              fontWeight: 'var(--font-weight-heading)',
              marginBottom: '4px',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            {title}
          </div>
        )}
        <div>{message}</div>
      </div>

      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--color-text-muted)',
          opacity: 0.7,
          cursor: 'pointer',
          padding: '2px',
          marginTop: '-2px',
          marginRight: '-2px',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 'var(--radius-s)',
          transition: 'opacity var(--transition-fast)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
      >
        <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};
