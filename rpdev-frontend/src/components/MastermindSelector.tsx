import React, { useState } from 'react';

interface MastermindSelectorProps {
    onStateChanged: (color: string) => void;
}

const MastermindSelector: React.FC<MastermindSelectorProps> = ({ onStateChanged }) => {
    const [color, setColor] = useState("red");

    const cycleColors = () => {
        const colors = ["red", "green", "blue", "yellow", "white", "grey", "orange", "magenta"];
        const currentIndex = colors.indexOf(color);
        const nextIndex = (currentIndex + 1) % colors.length;
        const nextColor = colors[nextIndex];
        setColor(nextColor);
        onStateChanged(nextColor);
    };

    return (
        <div>
            <div className='w-12 h-12 rounded-md border-2 border-black transition duration-200 active:scale-75' style={{ backgroundColor: color }} onClick={cycleColors}></div>
        </div>
    );
};

export default MastermindSelector;
