import React from 'react';
import CustomCursor from '../components/CustomCursor';
import CubePlayground from '../components/CubePlayground';

const Hub: React.FC = () => {
    return (
        <>
            <CustomCursor moveDuration={0.2} shrinkDuration={0.1} />
            <div id="hub">
                <CubePlayground targetObjectCount={10} />
            </div>
        </>
    );
};

export default Hub;
