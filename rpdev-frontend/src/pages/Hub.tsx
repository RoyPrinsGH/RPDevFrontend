import React from 'react';
import CustomCursor from '../components/CustomCursor';
import SiteView from '../components/SiteView';

const Hub: React.FC = () => {
    return (
        <div id="hub">
            <CustomCursor moveDuration={0.2} shrinkDuration={0.1} />
            <SiteView targetObjectCount={10} />
        </div>
    );
};

export default Hub;
