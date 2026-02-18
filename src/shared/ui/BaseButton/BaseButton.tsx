import React, { type ReactNode } from 'react';
import './BaseButton.css'

type ButtonVariant = 'primary' | 'link' | 'icon-only' | 'icon-gray' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children?: ReactNode;
  icon?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  hasBorder?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  variant = 'primary',
  size = 'md',
  className = '',
  hasBorder = false,
  onClick,
}) => {
  // Базовые стили для всех кнопок
  const baseStyles = "BaseButton";
  
  // Логика подбора классов
  const getVariantClass = () => {
    switch (variant) {
      case 'link': 
        return 'btn--link'; // "Создать" (просто текст)
      case 'icon-only': 
        return 'btn--icon-primary'; // Синяя кнопка-квадрат с белой иконкой
      case 'icon-gray': 
        return 'btn--icon-gray'; // Просто серая иконка
      case 'ghost':
        return 'btn--ghost';
      default: 
        return 'btn--primary'; // Базовая синяя
    }
  };

  const borderClass = hasBorder ? 'btn--with-border' : '';

  return (
    <button 
      className={`${baseStyles} ${getVariantClass()} ${borderClass} btn--${size} ${className}`}
      onClick={onClick}
    >
      {icon && <span className="btn__icon">{icon}</span>}
      {children && <span className="btn__text">{children}</span>}
    </button>
  );
};

export default Button;
