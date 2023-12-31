import React, { useEffect } from 'react';
import gsap from 'gsap';

interface CustomCursorProps {
  moveDuration: number;
  shrinkDuration: number;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ moveDuration, shrinkDuration }) => {
    
    useEffect(() => {

        console.log("CustomCursor (re-)rendering...");

        const cursor = document.querySelector("#cursor");
        if (cursor === null) {
            return;
        }

        const updateCursorMouseEvent = (e: MouseEvent) => {
            let cursorRect = cursor.getBoundingClientRect();
            gsap.to(cursor, {x: e.clientX - cursorRect.width / 2, y: e.clientY - cursorRect.height / 2, duration: moveDuration});
        };

        const updateCursorTouchEvent = (e: TouchEvent) => {
            let cursorRect = cursor.getBoundingClientRect();
            gsap.to(cursor, {x: e.touches[0].clientX - cursorRect.width, y: e.touches[0].clientY - cursorRect.height, duration: moveDuration});
        };

        const shrinkCursor = () => {
            gsap.to(cursor, {scale: 0.5, duration: shrinkDuration});
        };

        const growCursor = () => {
            gsap.to(cursor, {scale: 1, duration: shrinkDuration});
        };

        document.addEventListener("mousemove", updateCursorMouseEvent);
        document.addEventListener("mousedown", shrinkCursor);
        document.addEventListener("mouseup", growCursor);
        document.addEventListener("touchmove", updateCursorTouchEvent);
        document.addEventListener("touchstart", shrinkCursor);
        document.addEventListener("touchstart", updateCursorTouchEvent)
        document.addEventListener("touchend", growCursor);

        return () => {
            document.removeEventListener("mousemove", updateCursorMouseEvent);
            document.removeEventListener("mousedown", shrinkCursor);
            document.removeEventListener("mouseup", growCursor);
            document.removeEventListener("touchmove", updateCursorTouchEvent);
            document.removeEventListener("touchstart", shrinkCursor);
            document.removeEventListener("touchstart", updateCursorTouchEvent)
            document.removeEventListener("touchend", growCursor);
        };

    }, [moveDuration, shrinkDuration]);

    return (
        <div id="cursor" className='w-11 h-11 z-10 border-4 border-gray-300 rounded-full absolute pointer-events-none'></div>
    );
};

export default CustomCursor;
