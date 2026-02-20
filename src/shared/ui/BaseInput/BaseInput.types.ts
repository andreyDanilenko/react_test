import type { ReactNode, InputHTMLAttributes } from 'react';

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: ReactNode;
    rightIcon?: ReactNode;
    onRightIconClick?: () => void;
    variant?: 'default' | 'filled';
}
