import React from 'react';
import type { BaseButtonProps } from './BaseButton.types';
import './BaseButton.css';

const Button: React.FC<BaseButtonProps> = ({
  children,
  icon,
  variant = 'primary',
  size = 'md',
  className = '',
  hasBorder = false,
  type = 'button',
  disabled,
  ...rest
}) => {
  const baseStyles = 'BaseButton';

  const getVariantClass = () => {
    switch (variant) {
      case 'secondary':
        return 'btn--secondary';
      case 'link':
        return 'btn--link';
      case 'icon-only':
        return 'btn--icon-primary';
      case 'icon-gray':
        return 'btn--icon-gray';
      case 'icon-transparent':
        return 'btn--icon-transparent';
      case 'icon-outline':
        return 'btn--icon-outline';
      case 'ghost':
        return 'btn--ghost';
      default:
        return 'btn--primary';
    }
  };

  const borderClass = hasBorder ? 'btn--with-border' : '';

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${getVariantClass()} ${borderClass} btn--${size} ${className}`}
      {...rest}
    >
      {icon && <span className="btn__icon">{icon}</span>}
      {children && <span className="btn__text">{children}</span>}
    </button>
  );
};

export default Button;
