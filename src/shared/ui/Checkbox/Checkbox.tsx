import React from 'react';
import type { CheckboxProps } from './Checkbox.types'
import './Checkbox.css';

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  label,
  disabled = false,
  size = 'lg',
  'aria-label': ariaLabel,
  id,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const newValue = !checked;
    onChange?.(e, newValue);
  };

  const handleLabelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <label
      id={id}
      className={`checkbox-container ${disabled ? 'disabled' : ''} ${className}`.trim()}
      aria-label={ariaLabel}
      onClick={handleLabelClick}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="hidden-checkbox"
        aria-label={ariaLabel}
      />
      <span className={`custom-checkbox checkbox--${size} ${checked ? 'checked' : ''}`} />
      {label != null && label !== '' && <span className="checkbox-label">{label}</span>}
    </label>
  );
};

export default Checkbox;
