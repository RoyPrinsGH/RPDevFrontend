import {BoxGeometry, MeshBasicMaterial, TextureLoader, Mesh} from "three"
import AssetManager from "./AssetManager";
import {InteractableObject, UpdateableObject, CubePlaygroundSceneManager} from "./CubePlaygroundSceneManager";
import InteractableCubeAnimator from "./InteractableCubeAnimator";
import {Interaction} from "./InteractableCanvas";

export class InteractableCube extends Mesh implements InteractableObject, UpdateableObject {

    private cubeInteractionAnimator: InteractableCubeAnimator = new InteractableCubeAnimator(this);

    constructor() {
        const geometry = new BoxGeometry(2, 2, 2);
        const textureLoader = new TextureLoader();
        const materials = [
            new MeshBasicMaterial({map: textureLoader.load(AssetManager.getImg("right"))}),
            new MeshBasicMaterial({map: textureLoader.load(AssetManager.getImg("left"))}),
            new MeshBasicMaterial({map: textureLoader.load(AssetManager.getImg("top"))}),
            new MeshBasicMaterial({map: textureLoader.load(AssetManager.getImg("bottom"))}),
            new MeshBasicMaterial({map: textureLoader.load(AssetManager.getImg("front"))}),
            new MeshBasicMaterial({map: textureLoader.load(AssetManager.getImg("back"))}),
        ];
        super(geometry, materials);

        this.position.set(0, 0, 0);
    }

    pipe(sceneManager: CubePlaygroundSceneManager, interaction: Interaction) {
        this.cubeInteractionAnimator.pipe(sceneManager, interaction);
    }

    tick() {
        this.cubeInteractionAnimator.tick();
    }

}