import React from 'react';

interface ScrollableContentProps {
    children: React.ReactNode;
}

const ScrollableContent: React.FC<ScrollableContentProps> = ({ children }) => {
    return (
        <div
            style={{
                overflow: 'overlay',
                height: '100%',
            }}
        >
            {children}
        </div>
    );
};

export default ScrollableContent;
