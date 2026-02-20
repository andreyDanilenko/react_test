import React from 'react';
import { BaseInput } from '@/shared/ui';
import type { InputGroupProps } from './InputGroup.types'
import './InputGroup.css';

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
      <BaseInput
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
