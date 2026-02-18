import React from 'react';
import BaseIcon from './BaseIcon';

const SearchIcon = (props: React.ComponentProps<typeof BaseIcon>) => {
  return (
    <BaseIcon 
      viewBox="0 0 24 24"
      fill="none" 
      stroke="currentColor" 
      strokeWidth={1} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
          <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </BaseIcon>
  );
};

export default SearchIcon;
