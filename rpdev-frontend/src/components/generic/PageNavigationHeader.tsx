import React from 'react'
import { Link } from 'react-router-dom';

interface PageNavigationHeaderProps {
    title: string;
    currentPage: string;
}

const links = [
    { path: 'hub', label: 'Hub' },
    { path: 'about', label: 'About Me' },
    { path: 'echoes', label: 'Echoes' },
    { path: 'mastermind', label: 'Mastermind Comparer' },
    { path: 'todo', label: 'Todo Items' },
];

const PageNavigationHeader: React.FC<PageNavigationHeaderProps> = ({ title, currentPage }) => {
    return (
        <div className='header text-center'>
            <div className='rounded p-2 w-full' style={{"boxShadow": "0 20px 20px -18px rgb(74 222 128)", "textShadow": "2px 2px 4px green"}}>
                <span className='font-mono font-bold text-green-400 text-5xl'>{title}</span>
            </div>
            <div className='pt-3 nav flex justify-center gap-7'>
                {links.map((link) => (
                    link.path === currentPage
                        ? <Link key={link.path} to={'/' + link.path} className='m-2 text-yellow-400 transition-all duration-100' style={{"textShadow": "2px 2px 4px yellow"}}>{link.label}</Link>
                        : <Link key={link.path} to={'/' + link.path} className='m-2 text-green-300 transition-all duration-100' style={{"textShadow": "2px 2px 4px cyan"}}>{link.label}</Link>
                ))}
            </div>
        </div>
    );
};

export default PageNavigationHeader;