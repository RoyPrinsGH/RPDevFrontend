import { WebGLRenderer } from "three";
import { BloomEffect, EffectComposer, EffectPass, RenderPass, DepthOfFieldEffect } from "postprocessing";
import { CubePlaygroundSceneManager } from "./CubePlaygroundSceneManager";

export class CubePlaygroundRenderer {
    private renderer: WebGLRenderer;
    private composer: EffectComposer;
    private sceneManager: CubePlaygroundSceneManager;

    constructor(canvas: HTMLCanvasElement, sceneManager: CubePlaygroundSceneManager) {
        this.sceneManager = sceneManager;
        this.renderer = new WebGLRenderer({ canvas });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x020202);

        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(new RenderPass(this.sceneManager.scene, this.sceneManager.camera));
        this.composer.addPass(
            new EffectPass(this.sceneManager.camera, new BloomEffect({ mipmapBlur: true, luminanceThreshold: 0.4, luminanceSmoothing: 0.2, intensity: 0.5 }))
        );
        this.composer.addPass(
            new EffectPass(this.sceneManager.camera, new DepthOfFieldEffect(this.sceneManager.camera, { focusDistance: 0, focalLength: 0.1, bokehScale: 2, height: 480 }))
        );
    }

    public render() {
        this.composer.render();
    }

    public resize(x: number, y: number) {
        this.renderer.setSize(x, y);
        this.composer.setSize(x, y);
    }
}