export interface CheckboxProps {
    checked?: boolean;
    onChange?: (e?: React.ChangeEvent<HTMLInputElement>, newValue?: boolean) => void;
    label?: React.ReactNode;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    'aria-label'?: string;
    id?: string;
    className?: string;
  }
