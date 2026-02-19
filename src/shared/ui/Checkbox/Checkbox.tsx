import React from 'react';
import './Checkbox.css';

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>, newValue?: boolean) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  'aria-label'?: string;
  id?: string;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  label,
  disabled = false,
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
      <span className={`custom-checkbox ${checked ? 'checked' : ''}`} />
      {label != null && label !== '' && <span className="checkbox-label">{label}</span>}
    </label>
  );
};

export default Checkbox;
