import React, { ReactNode, InputHTMLAttributes } from 'react';
import CustomInput from '../BaseInput/BaseInput';
import './InputGroup.css';

interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onRightIconClick?: () => void;
}

const InputGroup: React.FC<InputGroupProps> = ({ 
  label, 
  leftIcon, 
  rightIcon, 
  onRightIconClick, 
  ...props 
}) => {
  return (
    <div className="InputGroup">
      <label className="InputGroup__Label">{label}</label>
      <CustomInput 
        icon={leftIcon} 
        rightIcon={rightIcon} 
        onRightIconClick={onRightIconClick} 
        {...props} 
      />
    </div>
  );
};

export default InputGroup;
