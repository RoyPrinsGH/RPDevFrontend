import React, { useRef, useEffect } from 'react';
import { SiteViewRenderer } from '../logic/SiteViewRenderer';
import { SiteViewSceneManager } from '../logic/SiteViewSceneManager';
import { SiteViewCube } from '../logic/SiteViewCube';
import { InteractableCanvas } from '../logic/InteractableCanvas';

const SiteView: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sceneManager = useRef<SiteViewSceneManager>();
    const renderer = useRef<SiteViewRenderer>();
    const interactableCanvas = useRef<InteractableCanvas>();

    useEffect(() => {
        console.log("SiteView (re-)rendering...")

        if (canvasRef.current === null) {
            return;
        }

        if (sceneManager.current === undefined) {
            console.log("Creating new scene manager")
            sceneManager.current = new SiteViewSceneManager();
            sceneManager.current.add(new SiteViewCube(), true, true);
        }

        if (renderer.current === undefined) {
            console.log("Creating new renderer")
            renderer.current = new SiteViewRenderer(canvasRef.current!, sceneManager.current);
        }

        if (interactableCanvas.current === undefined) {
            console.log("Creating new interactable canvas")
            interactableCanvas.current = new InteractableCanvas(canvasRef.current!, sceneManager.current);
            interactableCanvas.current.startListening();
        }

        const animate = () => {
            sceneManager.current!.tick();
            renderer.current!.render();
            requestAnimationFrame(animate);
        };

        window.onresize = () => {
            sceneManager.current!.updateCameraAspect(window.innerWidth / window.innerHeight);
            renderer.current!.resize(window.innerWidth, window.innerHeight);
        };

        animate();

        return () => {
            window.onresize = null;
            interactableCanvas.current!.stopListening();
        };
    }, []);

    return <canvas ref={canvasRef} className='h-full w-full fixed' />;
};

export default SiteView;
