import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BloomEffect, EffectComposer, EffectPass, RenderPass, DepthOfFieldEffect } from "postprocessing";

const SiteView: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [scene, setScene] = React.useState<THREE.Scene | null>(null);
    const [camera, setCamera] = React.useState<THREE.PerspectiveCamera | null>(null);
    const [renderer, setRenderer] = React.useState<THREE.WebGLRenderer | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        if (!scene) {
            setScene(new THREE.Scene());
        }

        if (!camera) {
            setCamera(new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 100));
        }

        if (!renderer) {
            setRenderer(new THREE.WebGLRenderer({ canvas }));
        }

        if (!scene || !camera || !renderer) {
            console.log("scene, camera, or renderer not created");
            return;
        }

        camera.position.z = 7;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x030011);

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
        let mousePositionBeforeDrag = { x: 0, y: 0 };

        const handleMouseDown = (event: MouseEvent) => {
            if (animatingRotation) return;
            mousePositionBeforeDrag = { x: event.clientX, y: event.clientY };
            isDragging = true;
            previousMousePosition = { x: event.clientX, y: event.clientY };
        };

        const handleMouseMove = (event: MouseEvent) => {
            if (animatingRotation) return;
            if (!isDragging) return;

            const { x, y } = previousMousePosition;
            const dx = event.clientX - x;
            const dy = event.clientY - y;

            lastDxDy = { dx, dy };

            cube.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), dx * 0.01);
            cube.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), dy * 0.01);

            previousMousePosition = { x: event.clientX, y: event.clientY };
        };

        let targetRotation = new THREE.Euler();
        let animatingRotation = false;

        const handleMouseUp = (event: MouseEvent) => {
            if (animatingRotation) return;
            isDragging = false;
            if (Math.abs(mousePositionBeforeDrag.x - previousMousePosition.x) < 0.1 && Math.abs(mousePositionBeforeDrag.y - previousMousePosition.y) < 0.1) {
                // Calculate the intersection between the clicked ray and the cube's faces
                const mouse = new THREE.Vector2();
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

                const raycaster = new THREE.Raycaster();
                raycaster.setFromCamera(mouse, camera);

                const intersects = raycaster.intersectObjects(scene.children);

                if (intersects.length > 0) {
                    const face = intersects[0].face;
                    if (face === null) return;
                    console.log(face)
                    console.log(cube.rotation)
                    const prevRotation = cube.rotation.clone();
                    cube.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), face!.normal);
                    cube.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI);
                    cube.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), Math.PI);
                    targetRotation = cube.rotation.clone();
                    cube.rotation.copy(prevRotation);
                    console.log(cube.rotation)

                    animatingRotation = true;
                }
            }
        };

        // TODO: Refactor this to be more DRY
        // TODO: Add support for animating rotation on mobile

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

        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));
        composer.addPass(new EffectPass(camera, new BloomEffect( { mipmapBlur: true,
			luminanceThreshold: 0.4,
			luminanceSmoothing: 0.2,
			intensity: 0.5 } )));
        composer.addPass(new EffectPass(camera, new DepthOfFieldEffect(camera, {
            focusDistance: 0,
            focalLength: 0.1,
            bokehScale: 2,
            height: 480
        })));

        function not_too_close(a: number, clamp: number): number {
            if (a < clamp && a > 0) {
                return clamp;
            } else if (a > -clamp && a <= 0) {
                return -clamp;
            } else {
                return a;
            }
        }

        const animate = (_: number) => {
            composer.render();

            if (animatingRotation) {

                let diff_x = targetRotation.x - cube.rotation.x;
                let diff_y = targetRotation.y - cube.rotation.y;
                let diff_z = targetRotation.z - cube.rotation.z;

                if (diff_x > Math.PI) {
                    diff_x -= 2 * Math.PI;
                } else if (diff_x < -Math.PI) {
                    diff_x += 2 * Math.PI;
                }

                if (diff_y > Math.PI) {
                    diff_y -= 2 * Math.PI;
                } else if (diff_y < -Math.PI) {
                    diff_y += 2 * Math.PI;
                }

                if (diff_z > Math.PI) {
                    diff_z -= 2 * Math.PI;
                } else if (diff_z < -Math.PI) {
                    diff_z += 2 * Math.PI;
                }

                if (diff_x < 0.01 && diff_y < 0.01 && diff_z < 0.01) {
                    cube.rotation.copy(targetRotation);
                    lastDxDy = { dx: 0, dy: 0 };
                    animatingRotation = false;
                } else {
                    cube.rotation.x += not_too_close(diff_x * 0.02, 0.002);
                    cube.rotation.y += not_too_close(diff_y * 0.02, 0.002);
                    cube.rotation.z += not_too_close(diff_z * 0.02, 0.002);
                }

            } else {
                if (!isDragging) {
                    cube.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), lastDxDy.dx * 0.01);
                    cube.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), lastDxDy.dy * 0.01);
                }

                lastDxDy.dx *= 0.98;
                lastDxDy.dy *= 0.98;
            }

            requestAnimationFrame(animate);
        };

        window.onresize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            composer.setSize(window.innerWidth, window.innerHeight);
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
    }, [scene, camera, renderer]);

    return <canvas ref={canvasRef} className='h-full w-full fixed' />;
};

export default SiteView;
