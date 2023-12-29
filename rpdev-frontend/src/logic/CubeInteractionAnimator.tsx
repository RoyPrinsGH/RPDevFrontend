import { Euler, Object3D, Vector3, Vector2 } from "three";
import { SiteViewSceneManager } from "./SiteViewSceneManager";
import { Interaction, InteractionType } from "./InteractableCanvas";

function correctRotation(rotation: number) {
    if (rotation > Math.PI) {
        return rotation - 2 * Math.PI;
    } else if (rotation < -Math.PI) {
        return rotation + 2 * Math.PI;
    } else {
        return rotation;
    }
}

function clampAwayFromZero(f: number, limit: number) {
    if (f < limit && f > 0) {
        return limit;
    } else if (f > -limit && f <= 0) {
        return -limit;
    } else {
        return f;
    }
}

enum AnimationState {
    DISABLED,
    IDLE,
    DRAGGING,
    DAMPING_ROTATION,
    FACE_ROTATION,
}

export default class CubeInteractionAnimator {

    animationState: AnimationState;
    targetObject: Object3D;
    targetRotation?: Euler;
    dragTo?: { x: number, y: number };

    constructor(targetObject: Object3D) {
        this.targetObject = targetObject;
        this.animationState = AnimationState.IDLE;
    }

    tick() {
        this.animateTick();  
        this.updateAnimationState();
    };

    pipe(sceneManager: SiteViewSceneManager, interaction: Interaction) {
        switch (this.animationState) {
            case AnimationState.DRAGGING:
                this.dragTo = undefined;
                if (interaction.type === InteractionType.MOUSE_UP) {
                    if (Math.abs(this.mousePositionBeforeDrag.x - interaction.x) < 0.1 && Math.abs(this.mousePositionBeforeDrag.y - interaction.y) < 0.1) {
                        this.animationState = AnimationState.FACE_ROTATION;
                        this.targetRotation = this.calculateTargetRotation(sceneManager, interaction);
                    } else {
                        this.animationState = AnimationState.DAMPING_ROTATION;
                    }
                } else if (interaction.type === InteractionType.MOUSE_MOVE) {
                    this.dragTo = { x: interaction.x, y: interaction.y };
                }
                break;
            case AnimationState.DAMPING_ROTATION:
            case AnimationState.IDLE:
                if (interaction.type === InteractionType.MOUSE_DOWN) {
                    this.animationState = AnimationState.DRAGGING;
                    this.resetDampingRotation();
                    this.mousePositionBeforeDrag = this.previousMousePosition = { x: interaction.x, y: interaction.y };
                }
                break;
            case AnimationState.FACE_ROTATION:
            case AnimationState.DISABLED:
            default:
                break;
        }
    };

    private calculateTargetRotation(sceneManager: SiteViewSceneManager, interaction: Interaction): Euler | undefined {
        const mouse = new Vector2();
        mouse.x = (interaction.x / window.innerWidth) * 2 - 1;
        mouse.y = -(interaction.y / window.innerHeight) * 2 + 1;

        const intersect = sceneManager.getIntersectionAtScreenPosition(interaction);
        if (intersect === undefined) return undefined;

        const face = intersect.face;
        if (face === null) return;

        const prevRotation = this.targetObject.rotation.clone();

        this.targetObject.quaternion.setFromUnitVectors(new Vector3(0, 0, 1), face!.normal);
        this.targetObject.rotateOnAxis(new Vector3(0, 0, 1), Math.PI);
        this.targetObject.rotateOnWorldAxis(new Vector3(0, 0, 1), Math.PI);

        let targetRotation = this.targetObject.rotation.clone();

        this.targetObject.rotation.copy(prevRotation);

        return targetRotation;
    }

    private updateAnimationState() {
        switch (this.animationState) {
            case AnimationState.DAMPING_ROTATION:
                if (this.isDampingRotationDone()) {
                    console.log("Damping rotation done")
                    this.animationState = AnimationState.IDLE;
                    this.resetDampingRotation();
                }
                break;
            case AnimationState.FACE_ROTATION:
                if (this.isFaceRotationDone()) {
                    console.log("Face rotation done")
                    this.animationState = AnimationState.IDLE;
                    this.resetDampingRotation();
                    this.snapToTargetRotation();
                }
                break;
            case AnimationState.IDLE:
            case AnimationState.DISABLED:
            case AnimationState.DRAGGING:
            default:
                break;
        }
    }

    private animateTick() {
        switch (this.animationState) {
            case AnimationState.DRAGGING:
                this.animateDraggingTick();
                break;
            case AnimationState.DAMPING_ROTATION:
                this.animateDampingRotationTick();
                break;
            case AnimationState.FACE_ROTATION:
                this.animateFaceRotationTick();
                break;
            case AnimationState.DISABLED:
            case AnimationState.IDLE:
            default:
                break;
        }
    }

    private snapToTargetRotation() {
        console.log("Snapping to target face rotation")
        if (this.targetRotation === undefined) return;
        this.targetObject.rotation.copy(this.targetRotation);
    }

    private resetDampingRotation() {
        console.log("Resetting damping rotation")
        this.lastDxDy = { dx: 0, dy: 0 };
    }

    private isDampingRotationDone() {
        return Math.abs(this.lastDxDy.dx) < 0.01 && Math.abs(this.lastDxDy.dy) < 0.01;
    }

    private isFaceRotationDone() {
        if (this.targetRotation === undefined) return true;

        let rot: { diff_x: number, diff_y: number, diff_z: number } | undefined = this.getDiffWithTargetRotation();
        if (rot === undefined) return;

        return Math.abs(rot.diff_x) < 0.01 && Math.abs(rot.diff_y) < 0.01 && Math.abs(rot.diff_z) < 0.01;
    }

    enable() {
        this.animationState = AnimationState.IDLE;
    }

    disable() {
        this.animationState = AnimationState.DISABLED;
    }

    private lastDxDy = { dx: 0, dy: 0 };
    private previousMousePosition = { x: 0, y: 0 };
    private mousePositionBeforeDrag = { x: 0, y: 0 };

    private animateDraggingTick() {
        if (this.dragTo === undefined) return;
        const { x, y } = this.previousMousePosition;

        const dx = this.dragTo.x - x;
        const dy = this.dragTo.y - y;

        this.lastDxDy.dx *= 0.98;
        this.lastDxDy.dy *= 0.98;

        if (dx === 0 && dy === 0) return;
        this.lastDxDy = { dx, dy };

        this.targetObject.rotateOnWorldAxis(new Vector3(0, 1, 0), dx * 0.01);
        this.targetObject.rotateOnWorldAxis(new Vector3(1, 0, 0), dy * 0.01);

        this.previousMousePosition = this.dragTo;
    }

    private animateDampingRotationTick() {
        this.targetObject.rotateOnWorldAxis(new Vector3(0, 1, 0), this.lastDxDy.dx * 0.01);
        this.targetObject.rotateOnWorldAxis(new Vector3(1, 0, 0), this.lastDxDy.dy * 0.01);

        this.lastDxDy.dx *= 0.98;
        this.lastDxDy.dy *= 0.98;
    }

    private getDiffWithTargetRotation(): { diff_x: number, diff_y: number, diff_z: number } | undefined {
        if (this.targetRotation === undefined) return undefined;

        let diff_x = correctRotation(this.targetRotation.x - this.targetObject.rotation.x);
        let diff_y = correctRotation(this.targetRotation.y - this.targetObject.rotation.y);
        let diff_z = correctRotation(this.targetRotation.z - this.targetObject.rotation.z);

        return { diff_x, diff_y, diff_z };
    }

    private animateFaceRotationTick() {
        if (this.targetRotation === undefined) return;

        let rot: { diff_x: number, diff_y: number, diff_z: number } | undefined = this.getDiffWithTargetRotation();
        if (rot === undefined) return;

        this.targetObject.rotation.x += clampAwayFromZero(rot.diff_x * 0.02, 0.002);
        this.targetObject.rotation.y += clampAwayFromZero(rot.diff_y * 0.02, 0.002);
        this.targetObject.rotation.z += clampAwayFromZero(rot.diff_z * 0.02, 0.002);
    }
}