import type { ReactNode, InputHTMLAttributes } from 'react';

export interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    onRightIconClick?: () => void;
    error?: string;
}
