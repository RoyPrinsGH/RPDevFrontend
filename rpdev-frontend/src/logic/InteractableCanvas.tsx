export enum InteractionType {
    MOUSE_DOWN,
    MOUSE_MOVE,
    MOUSE_UP,
}

export type Interaction = {
    type: InteractionType;
    x: number;
    y: number;
}

export interface InteractionPiper {
    pipe(interaction: Interaction): void;
}

export class InteractableCanvas {
    private canvas: HTMLCanvasElement;
    private interactionPiper: InteractionPiper;
    
    constructor(canvas: HTMLCanvasElement, interactionPiper: InteractionPiper) {
        this.canvas = canvas;
        this.interactionPiper = interactionPiper;
    }

    public startListening() {
        this.canvas.addEventListener("mousedown",  (event) => this.interactionPiper.pipe( { type: InteractionType.MOUSE_DOWN, x: event.clientX, y: event.clientY } as Interaction ));
        this.canvas.addEventListener("mouseup",    (event) => this.interactionPiper.pipe( { type: InteractionType.MOUSE_UP,   x: event.clientX, y: event.clientY } as Interaction ));
        this.canvas.addEventListener("mousemove",  (event) => this.interactionPiper.pipe( { type: InteractionType.MOUSE_MOVE, x: event.clientX, y: event.clientY } as Interaction ));
        this.canvas.addEventListener("touchstart", (event) => this.interactionPiper.pipe( { type: InteractionType.MOUSE_DOWN, x: event.touches[0].clientX, y: event.touches[0].clientY } as Interaction ));
        this.canvas.addEventListener("touchend",   (event) => this.interactionPiper.pipe( { type: InteractionType.MOUSE_UP,   x: event.touches[0].clientX, y: event.touches[0].clientY } as Interaction ));
        this.canvas.addEventListener("touchmove",  (event) => this.interactionPiper.pipe( { type: InteractionType.MOUSE_MOVE, x: event.touches[0].clientX, y: event.touches[0].clientY } as Interaction ));
    }

    public stopListening() {
        this.canvas.removeEventListener("mousedown",  (event) => this.interactionPiper.pipe( { type: InteractionType.MOUSE_DOWN, x: event.clientX, y: event.clientY } as Interaction ));
        this.canvas.removeEventListener("mouseup",    (event) => this.interactionPiper.pipe( { type: InteractionType.MOUSE_UP,   x: event.clientX, y: event.clientY } as Interaction ));
        this.canvas.removeEventListener("mousemove",  (event) => this.interactionPiper.pipe( { type: InteractionType.MOUSE_MOVE, x: event.clientX, y: event.clientY } as Interaction ));
        this.canvas.removeEventListener("touchstart", (event) => this.interactionPiper.pipe( { type: InteractionType.MOUSE_DOWN, x: event.touches[0].clientX, y: event.touches[0].clientY } as Interaction ));
        this.canvas.removeEventListener("touchend",   (event) => this.interactionPiper.pipe( { type: InteractionType.MOUSE_UP,   x: event.touches[0].clientX, y: event.touches[0].clientY } as Interaction ));
        this.canvas.removeEventListener("touchmove",  (event) => this.interactionPiper.pipe( { type: InteractionType.MOUSE_MOVE, x: event.touches[0].clientX, y: event.touches[0].clientY } as Interaction ));
    }
}