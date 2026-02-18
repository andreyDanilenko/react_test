import React from 'react';
import LogoIcon from '../icon/LogoIcon';
import './LogoBadge.css';

interface LogoBadgeProps {
  width?: number;
}

const LogoBadge: React.FC<LogoBadgeProps> = ({ width = 35 }) => {
    const height = React.useMemo(() => Math.round(width * (34 / 35)), [width]);
    
    return (
        <div className="LogoBadge">
            <div className="LogoBadge__Icon">
                <LogoIcon width={width} height={height} color="black" />
            </div>
        </div>
    );
};

export default LogoBadge;
