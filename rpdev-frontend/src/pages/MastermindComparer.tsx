import React, { useState } from 'react';
import MastermindSelector from '../components/MastermindSelector';

const MastermindComparer: React.FC = () => {

    const [state, setState] = useState(["red","red","red","red","red","red","red","red"]);
    const [result, setResult] = useState([-1, -1]);

    const updateState = (i: number, color: string) => {
        state[i] = color;
        setState(state);
        console.log(state);
    }

    const compare = () => {
        const firstFour = state.slice(0, 4);
        const lastFour = state.slice(4, 8);

        let exactMatches = 0;
        let includedMatches = 0;

        for (let i = 0; i < lastFour.length; i++) {
            if (lastFour[i] === firstFour[i]) {
                exactMatches++;
            } else if (firstFour.includes(lastFour[i])) {
                includedMatches++;
            }
        }

        setResult([exactMatches, includedMatches]);
    }

    return (
        <div className='page p-4 bg-black h-full w-full flex flex-col justify-center'>
            <div className='flex justify-center'>
                <div className='flex flex-col items-center gap-3 border-4 border-black rounded-xl bg-gradient-to-b from-purple-200 to-purple-400' style={{"boxShadow": "0 0 50px white"}}>
                    <h1 className='p-8 pl-5 pr-5 font-bold text-white' style={{"textShadow": "2px 2px 4px black"}}>
                        Mastermind
                    </h1>
                    <span className='font-thin text-black'>
                        Your chosen combination:
                    </span>
                    <div className='flex flex-row gap-4 drop-shadow-xl'>
                        <MastermindSelector onStateChanged={(newColor) => updateState(0, newColor)}/>
                        <MastermindSelector onStateChanged={(newColor) => updateState(1, newColor)}/>
                        <MastermindSelector onStateChanged={(newColor) => updateState(2, newColor)}/>
                        <MastermindSelector onStateChanged={(newColor) => updateState(3, newColor)}/>
                    </div>
                    <div className='pb-3' />
                    <span className='font-thin text-black'>
                        Their guess:
                    </span>
                    <div className='flex flex-row gap-4 drop-shadow-xl'>
                        <MastermindSelector onStateChanged={(newColor) => updateState(4, newColor)}/>
                        <MastermindSelector onStateChanged={(newColor) => updateState(5, newColor)}/>
                        <MastermindSelector onStateChanged={(newColor) => updateState(6, newColor)}/>
                        <MastermindSelector onStateChanged={(newColor) => updateState(7, newColor)}/>
                    </div>
                    <div className='pb-8' />
                    <button className='p-2 bg-slate-500 text-white font-semibold rounded-md border-2 border-black hover:bg-slate-400 transition duration-100 active:bg-slate-600 active:scale-75 drop-shadow-xl' onClick={compare}>
                        Compare!
                    </button>
                    <div className='pb-1' />
                    <div className='overflow-hidden flex flex-row gap-4' style={{"transition": "all 2s ease", "maxHeight": result[0] === -1 ? "0px" : "1000px"}}>
                        <div className='w-12 h-12 rounded-full border-2 border-black bg-red-600 text-center pt-2'>
                            <span className='font-bold text-white text-xl'>
                                {result[0]}
                            </span>
                        </div>
                        <div className='w-12 h-12 rounded-full border-2 text-black border-black bg-white text-center pt-2'>
                            <span className='font-bold text-xl'>
                                {result[1]}
                            </span>
                        </div>
                    </div>
                    <div className='pb-3' />
                </div>
            </div>
            <div className='pb-6' />
        </div>
    );
};

export default MastermindComparer;
