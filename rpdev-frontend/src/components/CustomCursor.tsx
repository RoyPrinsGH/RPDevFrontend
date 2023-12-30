import React, { useEffect } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
    
    useEffect(() => {
        const cursor = document.querySelector("#cursor");
        if (cursor === null) {
            return;
        }

        const updateCursor = (e: MouseEvent) => {
            let cursorRect = cursor.getBoundingClientRect();
            gsap.to(cursor, {x: e.clientX - cursorRect.width / 2, y: e.clientY - cursorRect.height / 2, duration: 0.2 });
        };

        const shrinkCursor = () => {
            gsap.to(cursor, {scale: 0.5, duration: 0.1 });
        };

        const growCursor = () => {
            gsap.to(cursor, {scale: 1, duration: 0.1 });
        };

        document.addEventListener("mousemove", updateCursor);
        document.addEventListener("mousedown", shrinkCursor);
        document.addEventListener("mouseup", growCursor);

        return () => {
            document.removeEventListener("mousemove", updateCursor);
            document.removeEventListener("mousedown", shrinkCursor);
            document.removeEventListener("mouseup", growCursor);
        };

    }, []);

    return (
        <div id="cursor" className='w-32 h-32 z-10 border-2 border-black rounded-full absolute pointer-events-none'></div>
    );
};

export default CustomCursor;
