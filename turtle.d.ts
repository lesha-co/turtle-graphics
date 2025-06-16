declare class Turtle {
    history: {
        positionX: number;
        positionY: number;
        angle: number;
    }[];
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    positionX: number;
    positionY: number;
    angle: number;
    speed: number;
    emoji: string;
    turtlespan: HTMLSpanElement | null;
    constructor(emoji: string | undefined, x: number, y: number, angle: number, speed: number, enable: boolean, canvas: HTMLCanvasElement);
    setSpeed(speed: number): void;
    updateTurtlePosition(): void;
    teleport(x: number, y: number): void;
    jump(x: number, y: number): void;
    clone(): Turtle;
    hide(): void;
    show(): void;
    remember(): void;
    return(): void;
    draw(distance: number): Promise<void>;
    rotate(degrees: number): void;
    setHeading(degrees: number): void;
    setColor(color: string): void;
    setWidth(width: number): void;
    sleep(seconds?: number): Promise<unknown>;
    L_System(initiator: string, expansionRules: Record<string, string>, iterations: number, commands: Record<string, (t: Turtle) => Promise<void> | void>): Promise<void>;
}
export declare class TurtleManager {
    canvas: HTMLCanvasElement;
    canvasHolder: HTMLElement | null;
    width: number;
    height: number;
    ctx: CanvasRenderingContext2D;
    constructor(selector: string, dpr?: number);
    spawn(x: number, y: number): Turtle;
    clear(): void;
    sleep(seconds?: number): Promise<unknown>;
}
export {};
