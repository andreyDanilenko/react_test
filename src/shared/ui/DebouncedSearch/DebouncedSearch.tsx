import { useState, useEffect, type ChangeEvent } from 'react';
import { BaseInput } from '@/shared/ui';
import { useDebounce } from '@/shared/lib/hooks';
import type { DebouncedSearchProps } from '@/shared/ui' 

const DebouncedSearch = ({
  onDebouncedChange,
  delay = 500,
  initialValue = '',
  ...props
}: DebouncedSearchProps) => {
  const [value, setValue] = useState(initialValue);
  const debouncedValue = useDebounce(value, delay);

  useEffect(() => {
    onDebouncedChange(debouncedValue);
  }, [debouncedValue, onDebouncedChange]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <BaseInput
      {...props}
      value={value}
      onChange={handleChange}
    />
  );
};

export default DebouncedSearch;
