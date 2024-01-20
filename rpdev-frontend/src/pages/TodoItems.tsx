import React, {useEffect} from 'react';

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
        <div>
            <h1>Todo Items:</h1>
            <ul>
                {items.map((item: TodoItem) => (
                    <li key={item.id}>
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoItems;