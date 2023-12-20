import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SiteView: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 100);
        camera.position.z = 7;

        const renderer = new THREE.WebGLRenderer({ canvas });

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

        renderer.setClearColor(0xffffff);

        const geometry = new THREE.BoxGeometry(2, 2, 2);

        const assetsBasePath = import.meta.env.VITE_ASSETS_BASE_PATH;

        const materials = [
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(`${assetsBasePath}/img/right.png`) }),
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(`${assetsBasePath}/img/left.png`) }),
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(`${assetsBasePath}/img/top.png`) }),
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(`${assetsBasePath}/img/bottom.png`) }),
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(`${assetsBasePath}/img/front.png`) }),
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(`${assetsBasePath}/img/back.png`) }),
        ];

        const cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);

        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };
        let lastDxDy = { dx: 0, dy: 0 };

        const handleMouseDown = (event: MouseEvent) => {
            isDragging = true;
            previousMousePosition = { x: event.clientX, y: event.clientY };
        };

        const handleMouseMove = (event: MouseEvent) => {
            if (!isDragging) return;

            const { x, y } = previousMousePosition;
            const dx = event.clientX - x;
            const dy = event.clientY - y;

            lastDxDy = { dx, dy };

            cube.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), dx * 0.01);
            cube.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), dy * 0.01);

            previousMousePosition = { x: event.clientX, y: event.clientY };
        };

        const handleMouseUp = () => {
            isDragging = false;
        };

        const handleTouchStart = (event: TouchEvent) => {
            const touch = event.touches[0];
            isDragging = true;
            previousMousePosition = { x: touch.clientX, y: touch.clientY };
        };

        const handleTouchMove = (event: TouchEvent) => {
            if (!isDragging) return;

            const touch = event.touches[0];
            const { x, y } = previousMousePosition;
            const dx = touch.clientX - x;
            const dy = touch.clientY - y;

            lastDxDy = { dx, dy };

            cube.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), dx * 0.01);
            cube.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), dy * 0.01);

            previousMousePosition = { x: touch.clientX, y: touch.clientY };
        };

        const handleTouchEnd = () => {
            isDragging = false;
        };

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('touchstart', handleTouchStart);
        canvas.addEventListener('touchmove', handleTouchMove);
        canvas.addEventListener('touchend', handleTouchEnd);

        const animate = (_: number) => {
            renderer.render(scene, camera);

            if (!isDragging) {
                cube.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), lastDxDy.dx * 0.01);
                cube.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), lastDxDy.dy * 0.01);
            }

            lastDxDy.dx *= 0.95;
            lastDxDy.dy *= 0.95;

            requestAnimationFrame(animate);
        };

        window.onresize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        animate(0);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('touchmove', handleTouchMove);
            canvas.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    return <canvas ref={canvasRef} className='h-full w-full' />;
};

export default SiteView;
