import React from 'react';
import { Link } from 'react-router-dom';

const AboutMe: React.FC = () => {
    return (
        <div className='page p-4 bg-black h-full w-full'>
            <div className='header text-center'>
                <h1 className='font-mono font-bold pb-4 text-green-400'>// Royprins.dev //</h1>
                <hr className='h-0.5 bg-blue-700/50' />
                <div className='nav flex justify-center gap-7'>
                    <Link to='/hub' className='m-2 text-green-400'>Hub</Link>
                    <Link to='/about' className='m-2 text-yellow-300'>About Me</Link>
                    <Link to='/echoes' className='m-2 text-green-400'>Echoes</Link>
                    <Link to='/mastermind' className='m-2 text-green-400'>Mastermind Comparer</Link>
                    <Link to='/todo' className='m-2 text-green-400'>Todo Items</Link>
                </div>
            </div>
            <div className='padding pb-32' />
            <div className='content text-center justify-center flex'>
                <div className='w-fit border-green-400 border-2 rounded-md p-10 text-green-400'>
                    <h1>About Me</h1>
                    <br />
                    <p>Hi! My name is Roy Prins, and I am a full-stack software engineer.</p>
                    <p>Welcome to my personal site!</p>
                    <p>Check out the code for this site on GitHub: <a className='text-red-500' href='https://github.com/RoyPrinsGH/royprins.dev'>GitHub Repo</a></p>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;
