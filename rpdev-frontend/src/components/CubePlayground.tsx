import React, { useRef, useEffect } from 'react';
import { CubePlaygroundRenderer } from '../logic/CubePlaygroundRenderer';
import { CubePlaygroundSceneManager } from '../logic/CubePlaygroundSceneManager';
import { InteractableCube } from '../logic/InteractableCube';
import { InteractableCanvas } from '../logic/InteractableCanvas';

interface SiteViewProps {
    targetObjectCount: number;
}

const CubePlayground: React.FC<SiteViewProps> = ({ targetObjectCount }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sceneManager = useRef<CubePlaygroundSceneManager>();
    const renderer = useRef<CubePlaygroundRenderer>();
    const interactableCanvas = useRef<InteractableCanvas>();

    useEffect(() => {
        console.log("SiteView (re-)rendering...")

        if (canvasRef.current === null) {
            return;
        }

        if (sceneManager.current === undefined) {
            console.log("Creating new scene manager")
            sceneManager.current = new CubePlaygroundSceneManager();
            sceneManager.current.add(new InteractableCube(), true, true);
        }

        if (renderer.current === undefined) {
            console.log("Creating new renderer")
            renderer.current = new CubePlaygroundRenderer(canvasRef.current!, sceneManager.current);
        }

        if (interactableCanvas.current === undefined) {
            console.log("Creating new interactable canvas")
            interactableCanvas.current = new InteractableCanvas(canvasRef.current!, sceneManager.current);
            interactableCanvas.current.startListening();
        }

        const animate = () => {
            sceneManager.current!.tick();
            renderer.current!.render();

            const objectCount = sceneManager.current!.getSceneObjects().length + 0.000001;

            if (Math.random() < 0.0005 / objectCount * targetObjectCount) {
                addRandomObject();
            }

            if (Math.random() < 0.0005 / targetObjectCount * objectCount) {
                removeRandomObject();
            }

            requestAnimationFrame(animate);
        };

        window.onresize = () => {
            sceneManager.current!.updateCameraAspect(window.innerWidth / window.innerHeight);
            renderer.current!.resize(window.innerWidth, window.innerHeight);
        };

        const removeRandomObject = () => {
            const objects = sceneManager.current!.getSceneObjects();
            if (objects.length > 0) {
                sceneManager.current!.remove(objects[0]);
            }
        }

        const addRandomObject = () => {
            const cube = new InteractableCube();
            cube.position.x = Math.random() * 7 - 3.5;
            cube.position.y = Math.random() * 7 - 3.5;
            cube.position.z = Math.random() * 7 - 3.5;
            sceneManager.current!.add(cube, true, true);
        }

        const handleKeyDown = (event: KeyboardEvent)  => {
            if (event.key === 'c') { console.log("pressed c"); addRandomObject() }
            if (event.key === 'd') { removeRandomObject() }
        }

        window.addEventListener('keydown', handleKeyDown);

        animate();

        return () => {
            window.onresize = null;
            window.removeEventListener('keydown', handleKeyDown);
            interactableCanvas.current!.stopListening();
        };
    }, [targetObjectCount]);

    return <canvas ref={canvasRef} className='h-full w-full fixed' />;
};

export default CubePlayground;
