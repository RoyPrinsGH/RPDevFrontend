import React from 'react';

const AboutMe: React.FC = () => {
    return (
        <div className='page p-4 bg-blue-300/25 h-full w-full'>
            <div className='header text-center'>
                <h1 className='font-mono font-bold'>.RP.Dev</h1>
                <hr className='h-0.5 bg-blue-700/50' />
                <div className='nav flex justify-center'>
                    <a href='/hub' className='m-2'>Hub</a>
                    <a href='/about' className='m-2'>About Me</a>
                    <a href='/echoes' className='m-2'>Echoes</a>
                </div>
            </div>
            <div className='padding pb-32' />
            <div className='content text-center'>
                <h1>About Me</h1>
                <br />
                <p>Hi! My name is Roy Prins, and I am full-stack software engineer.</p>
                <p>Welcome to my personal site!</p>
            </div>
        </div>
    );
};

export default AboutMe;
