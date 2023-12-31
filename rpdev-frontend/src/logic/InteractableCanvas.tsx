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

    private convertMouseEventToInteraction(type: InteractionType, event: MouseEvent): Interaction {
        return { type: type, x: event.clientX, y: event.clientY };
    }

    private convertTouchEventToInteraction(type: InteractionType, event: TouchEvent): Interaction {
        return { type: type, x: event.touches[0].clientX, y: event.touches[0].clientY };
    }

    public startListening() {
        this.canvas.addEventListener("mousedown",   (event) => this.interactionPiper.pipe( this.convertMouseEventToInteraction(InteractionType.MOUSE_DOWN, event) ));
        this.canvas.addEventListener("mouseup",     (event) => this.interactionPiper.pipe( this.convertMouseEventToInteraction(InteractionType.MOUSE_UP, event) ));
        this.canvas.addEventListener("mousemove",   (event) => this.interactionPiper.pipe( this.convertMouseEventToInteraction(InteractionType.MOUSE_MOVE, event) ));

        this.canvas.addEventListener("touchstart",  (event) => this.interactionPiper.pipe( this.convertTouchEventToInteraction(InteractionType.MOUSE_DOWN, event) ));
        this.canvas.addEventListener("touchend",    (event) => this.interactionPiper.pipe( this.convertTouchEventToInteraction(InteractionType.MOUSE_UP, event) ));
        this.canvas.addEventListener("touchcancel", (event) => this.interactionPiper.pipe( this.convertTouchEventToInteraction(InteractionType.MOUSE_UP, event) ));
        this.canvas.addEventListener("touchmove",   (event) => this.interactionPiper.pipe( this.convertTouchEventToInteraction(InteractionType.MOUSE_MOVE, event) ));
    }

    public stopListening() {
        this.canvas.removeEventListener("mousedown",   (event) => this.interactionPiper.pipe( this.convertMouseEventToInteraction(InteractionType.MOUSE_DOWN, event) ));
        this.canvas.removeEventListener("mouseup",     (event) => this.interactionPiper.pipe( this.convertMouseEventToInteraction(InteractionType.MOUSE_UP, event) ));
        this.canvas.removeEventListener("mousemove",   (event) => this.interactionPiper.pipe( this.convertMouseEventToInteraction(InteractionType.MOUSE_MOVE, event) ));

        this.canvas.removeEventListener("touchstart",  (event) => this.interactionPiper.pipe( this.convertTouchEventToInteraction(InteractionType.MOUSE_DOWN, event) ));
        this.canvas.removeEventListener("touchend",    (event) => this.interactionPiper.pipe( this.convertTouchEventToInteraction(InteractionType.MOUSE_UP, event) ));
        this.canvas.removeEventListener("touchcancel", (event) => this.interactionPiper.pipe( this.convertTouchEventToInteraction(InteractionType.MOUSE_UP, event) ));
        this.canvas.removeEventListener("touchmove",   (event) => this.interactionPiper.pipe( this.convertTouchEventToInteraction(InteractionType.MOUSE_MOVE, event) ));
    }
}