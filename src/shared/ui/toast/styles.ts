import type { CSSProperties } from 'react';

export const toastStyles = {
  success: {
    accentColor: 'var(--color-success)',
  },
  error: {
    accentColor: 'var(--color-error)',
  },
  info: {
    accentColor: 'var(--color-info)',
  },
  warning: {
    accentColor: 'var(--color-warning)',
  },
  loading: {
    accentColor: 'var(--color-bg-input)',
  },
};

export const baseToastStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--gap-medium)',
    padding: '12px 16px',
    borderRadius: 'var(--radius-s)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)',
    lineHeight: 'var(--line-height-base)',
    boxShadow: 'var(--shadow-card)',
    maxWidth: '360px',
    width: '100%',
    border: '1px solid var(--color-border-subtle)',
    backdropFilter: 'blur(6px)',
    backgroundColor: 'var(--color-bg-page)',
    color: 'var(--color-text-body)',
};
