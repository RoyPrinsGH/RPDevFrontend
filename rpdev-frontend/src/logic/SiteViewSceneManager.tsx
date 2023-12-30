import { Scene, PerspectiveCamera, Object3D, Raycaster, Vector2, Intersection, Object3DEventMap } from "three";
import { Interaction, InteractionPiper } from "./InteractableCanvas";

export interface InteractableObject extends Object3D {
    pipe(sceneManager: SiteViewSceneManager, interaction: Interaction): void;
}

export interface UpdateableObject extends Object3D {
    tick(sceneManager: SiteViewSceneManager): void;
}

export class SiteViewSceneManager implements InteractionPiper {
    public scene: Scene;
    public camera: PerspectiveCamera;
    private raycaster: Raycaster;

    private interactableObjects: InteractableObject[] = [];
    private updateableObjects: UpdateableObject[] = [];

    constructor() {
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
        this.camera.position.z = 7;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.raycaster = new Raycaster();
    }

    public pipe(interaction: Interaction) {
        //console.log("InteractionPiper/SiteViewSceneManager: Received Interaction ", interaction)
        this.interactableObjects.forEach(obj => obj.pipe(this, interaction));
    }

    public tick() {
        this.updateableObjects.forEach(obj => obj.tick(this));
    }

    public add(object: Object3D, isInteractable: boolean = false, isUpdateable: boolean = false) {
        console.log("SiteViewSceneManager: Adding object ", object, " to scene as " + (isInteractable ? "|interactable" : "") + (isUpdateable ? "|updateable" : ""))
        this.scene.add(object);
        if (isInteractable) {
            this.interactableObjects.push(object as InteractableObject);
        }
        if (isUpdateable) {
            this.updateableObjects.push(object as UpdateableObject);
        }
    }

    public remove(object: Object3D) {
        this.scene.remove(object);
        this.interactableObjects = this.interactableObjects.filter(obj => obj.uuid !== object.uuid);
        this.updateableObjects = this.updateableObjects.filter(obj => obj.uuid !== object.uuid);
    }

    public getIntersectionAtScreenPosition(position: { x: number; y: number }): Intersection<Object3D<Object3DEventMap>> | undefined {
        const mouse = new Vector2();
        mouse.x = (position.x / window.innerWidth) * 2 - 1;
        mouse.y = -(position.y / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(mouse, this.camera);

        const intersects = this.raycaster.intersectObjects(this.scene.children, true);

        if (intersects.length > 0) {
            return intersects[0];
        }

        return undefined;
    }

    public getObjectScreenCoordinates(object: Object3D): { x: number; y: number } {
        const screenPosition = object.position.clone().project(this.camera);

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const x = Math.round((screenPosition.x + 1) * screenWidth / 2);
        const y = Math.round((-screenPosition.y + 1) * screenHeight / 2);

        return { x, y };
    }

    public getSceneObjects(): Object3D[] {
        return this.scene.children;
    }

    public updateCameraAspect(aspect: number) {
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
    }
}