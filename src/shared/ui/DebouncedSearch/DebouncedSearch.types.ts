import type { BaseInputProps } from '@/shared/ui';

export interface DebouncedSearchProps extends Omit<BaseInputProps, 'onChange' | 'value'> {
    onDebouncedChange: (value: string) => void;
    delay?: number;
    initialValue?: string;
  }
  