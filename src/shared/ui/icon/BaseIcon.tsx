import React from 'react';

interface BaseIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  children?: React.ReactNode;
}

const BaseIcon = ({ 
  children, 
  size = 24, 
  color = 'currentColor', 
  viewBox = '0 0 24 24',
  ...props 
}: BaseIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color }}
      {...props}
    >
      {children}
    </svg>
  );
};

export default BaseIcon;
