import React, { type ReactNode, type InputHTMLAttributes } from 'react';
import CustomInput from '../BaseInput/BaseInput';
import './InputGroup.css';

interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onRightIconClick?: () => void;
  error?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  leftIcon,
  rightIcon,
  onRightIconClick,
  error,
  ...props
}) => {
  return (
    <div className="InputGroup">
      <label className="InputGroup__Label">{label}</label>
      <CustomInput
        icon={leftIcon}
        rightIcon={rightIcon}
        onRightIconClick={onRightIconClick}
        aria-invalid={Boolean(error)}
        {...props}
      />
      {error && <p className="InputGroup__Error" role="alert">{error}</p>}
    </div>
  );
};

export default InputGroup;
