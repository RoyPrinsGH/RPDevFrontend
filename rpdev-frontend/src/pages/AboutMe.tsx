import React from 'react';
import PageNavigationHeader from '../components/generic/PageNavigationHeader';

const AboutMe: React.FC = () => {
    return (
        <div className='page p-4 bg-black h-full w-full'>
            <PageNavigationHeader title='// ROYPRINS.DEV //' currentPage='about' />
            <div className='padding pb-32' />
            <div className='content text-center justify-center flex'>
                <div className='w-fit border-yellow-400 border-2 rounded-md p-10 text-green-400'>
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
