import React, { useState } from 'react';

interface MastermindSelectorProps {
    onStateChanged: (color: string) => void;
}

const MastermindSelector: React.FC<MastermindSelectorProps> = ({ onStateChanged }) => {
    const colors = ["red", "green", "blue", "yellow", "white", "grey", "orange", "magenta"];
    const arrowColors = ["red", "green", "dodgerblue", "yellow", "white", "grey", "orange", "magenta"];

    const [colorIndex, setColorIndex] = useState(0);

    const jumpColorsForward = (i: number) => {
        const nextIndex = (colors.length + colorIndex + i) % colors.length;
        setColorIndex(nextIndex);
        onStateChanged(colors[nextIndex]);
    };

    return (
        <div className='flex flex-col items-center'>
            <div className='mb-1 rounded-md border-2 border-black transition duration-200 active:scale-75 bg-black' onClick={() => jumpColorsForward(-1)}>
                <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                    <path style={{fill: arrowColors[(colors.length + colorIndex - 1) % colors.length]}} d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z"/>
                </svg>
            </div>
            <div className='w-12 h-12 rounded-md border-2 border-black transition duration-200 active:scale-75 focus:border-8' style={{ backgroundColor: colors[colorIndex] }} onClick={() => jumpColorsForward(1)}></div>
        </div>
    );
};

export default MastermindSelector;
