import React, {useEffect} from 'react';
import PageNavigationHeader from '../components/generic/PageNavigationHeader';

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
            <PageNavigationHeader title='// ROYPRINS.DEV //' currentPage='todo' />
            <div className='padding pb-32' />
            <div className='content text-center justify-center flex'>
                <div className='w-fit border-yellow-400 border-2 rounded-md p-10 text-green-400'>
                <h1>Todo Items:</h1>
                <br />
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