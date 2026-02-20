import React from 'react';
import type { BaseInputProps } from './BaseInput.types'
import './BaseInput.css';

const BaseInput: React.FC<BaseInputProps> = ({ 
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
