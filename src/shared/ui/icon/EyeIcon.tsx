import React from 'react';
import BaseIcon from './BaseIcon';

const EyeIcon = ({ isHidden, ...props }: React.ComponentProps<typeof BaseIcon> & { isHidden: boolean }) => (
    <BaseIcon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
        {isHidden && <line x1="1" y1="1" x2="23" y2="23" />}
    </BaseIcon>
);

export default EyeIcon;
