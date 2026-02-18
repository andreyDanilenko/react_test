import React, { ReactNode, InputHTMLAttributes } from 'react';
import './BaseInput.css';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: ReactNode;
    rightIcon?: ReactNode;
    onRightIconClick?: () => void;
}
  
const BaseInput: React.FC<CustomInputProps> = ({ icon, rightIcon, onRightIconClick, ...props }) => {
    return (
        <div className="BaseInput">
        {icon && <div className="BaseInput__Icon">{icon}</div>}
        
        <input className="BaseInput__Field" {...props} />
        
        {rightIcon && (
            <div 
            className="BaseInput__Icon" 
            onClick={onRightIconClick}
            style={{ cursor: onRightIconClick ? 'pointer' : 'default', marginLeft: 'auto' }}
            >
            {rightIcon}
            </div>
        )}
        </div>
    );
};


export default BaseInput;
