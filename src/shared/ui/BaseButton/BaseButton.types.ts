import type { ReactNode, ButtonHTMLAttributes } from 'react';

export type BaseButtonVariant =
  | 'primary'
  | 'secondary'
  | 'link'
  | 'icon-only'
  | 'icon-gray'
  | 'icon-transparent'
  | 'ghost';

export type BaseButtonSize = 'sm' | 'md' | 'lg';

export interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  icon?: ReactNode;
  variant?: BaseButtonVariant;
  size?: BaseButtonSize;
  className?: string;
  hasBorder?: boolean;
}
