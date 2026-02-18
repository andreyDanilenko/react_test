import React, { type ReactNode, type InputHTMLAttributes } from 'react';
import './BaseInput.css';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: ReactNode;
    rightIcon?: ReactNode;
    onRightIconClick?: () => void;
    variant?: 'default' | 'filled';
}
  
const BaseInput: React.FC<CustomInputProps> = ({ 
    icon, 
    rightIcon, 
    onRightIconClick, 
    variant = 'default', 
    className = '',
    ...props 
}) => {
    const containerClasses = `BaseInput BaseInput--${variant} ${className}`;

    return (
        <div className={containerClasses}>
            {icon && <div className="BaseInput__Icon">{icon}</div>}
            
            <input className="BaseInput__Field" {...props} />
            
            {rightIcon && (
                <div 
                    className="BaseInput__Icon BaseInput__Icon--right" 
                    onClick={onRightIconClick}
                    style={{ cursor: onRightIconClick ? 'pointer' : 'default' }}
                >
                    {rightIcon}
                </div>
            )}
        </div>
    );
};

export default BaseInput;