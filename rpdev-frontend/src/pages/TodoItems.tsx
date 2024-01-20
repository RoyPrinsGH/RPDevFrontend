import React, { useEffect } from 'react';

const TodoItems: React.FC = () => {
    const [items, setItems] = React.useState([]);

    const fetchItems = async () => {
        const data = await fetch('api/todoitems');
        const items = await data.json();
        setItems(items);
    };

    useEffect(() => {
        fetchItems();
    });

    return (
        <div>
            <h1>Todo Items:</h1>
            <ul>
                {items.map((item: any) => (
                    <li key={item.id}>
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoItems;