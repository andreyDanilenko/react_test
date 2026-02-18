import React from 'react';
import BaseIcon from './BaseIcon';

const PlusIcon = (props: React.ComponentProps<typeof BaseIcon>) => {
  return (
    <BaseIcon 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={2} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
        <path d="M12 5V19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M5 12H19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </BaseIcon>
  );
};

export default PlusIcon;
