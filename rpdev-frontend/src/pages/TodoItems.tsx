import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';

type TodoItem = {
    id: number;
    name: string;
    isComplete: boolean;
};

const TodoItems: React.FC = () => {
    const [items, setItems] = React.useState([]);

    const fetchItems = async () => {
        const data = await fetch('api/todoitems');
        const items = await data.json();
        setItems(items);
    };

    useEffect(() => {
        console.log('useEffect called');
        fetchItems();
    }, []);

    return (
        <div className='page p-4 bg-black h-full w-full'>
            <div className='header text-center'>
                <h1 className='font-mono font-bold pb-4 text-green-400'>// Royprins.dev //</h1>
                <hr className='h-0.5 bg-blue-700/50' />
                <div className='nav flex justify-center gap-7'>
                    <Link to='/hub' className='m-2 text-green-400'>Hub</Link>
                    <Link to='/about' className='m-2 text-green-400'>About Me</Link>
                    <Link to='/echoes' className='m-2 text-green-400'>Echoes</Link>
                    <Link to='/mastermind' className='m-2 text-green-400'>Mastermind Comparer</Link>
                    <Link to='/todo' className='m-2 text-yellow-300'>Todo Items</Link>
                </div>
            </div>
            <div className='padding pb-32' />
            <div className='content text-center justify-center flex'>
                <div className='w-fit border-green-400 border-2 rounded-md p-10 text-green-400'>
                <h1>Todo Items:</h1>
            <ul>
                {items.map((item: TodoItem) => (
                    <li key={item.id}>
                        {item.name}
                    </li>
                ))}
            </ul>
                </div>
            </div>
        </div>
    );
};

export default TodoItems;