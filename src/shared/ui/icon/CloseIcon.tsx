import React from 'react';
import BaseIcon from './BaseIcon';

const CloseIcon = (props: React.ComponentProps<typeof BaseIcon>) => {
  return (
    <BaseIcon 
      viewBox="0 0 17 18"
      fill="none" 
      stroke="currentColor" 
      strokeWidth={2} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
        <path d="M1.01031 1.00002L15.0103 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M15 1.00002L1 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </BaseIcon>
  );
};

export default CloseIcon;
