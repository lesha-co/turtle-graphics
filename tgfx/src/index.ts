import {lsys} from 'lsystem-generator'

class Turtle {
  history: {
    positionX: number;
    positionY: number;
    angle: number;
  }[] = [];
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  positionX: number;
  positionY: number;
  angle: number;
  speed: number;
  emoji: string;
  turtlespan: HTMLSpanElement | null = null;
  constructor(
    emoji = "🐢",
    x: number,
    y: number,
    angle: number,
    speed: number,
    enable: boolean,
    canvas: HTMLCanvasElement,
  ) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Failed to get canvas context");
    }
    this.ctx = ctx;
    this.positionX = x;
    this.positionY = y;
    this.angle = angle;
    this.speed = speed;
    this.emoji = emoji;

    if (enable) {
      this.show();
    }

    this.updateTurtlePosition();
  }
  setSpeed(speed: number) {
    this.speed = speed;
  }
  updateTurtlePosition() {
    if (!this.turtlespan) return;

    const turtleSize = 20; // Approximate size of the turtle emoji
    this.turtlespan.style.left = this.positionX - turtleSize / 2 + "px";
    this.turtlespan.style.top = this.positionY - turtleSize / 2 + "px";
    this.turtlespan.style.transform = `rotate(${
      180 + Math.round(this.angle)
    }deg)`;
    if (this.speed > 10 && this.turtlespan) {
      this.turtlespan.style.transition = "";
    } else {
      this.turtlespan.style.transition =
        "left 0.1s ease, top 0.1s ease, transform 0.1s ease";
    }
  }
  teleport(x: number, y: number) {
    this.positionX = x;
    this.positionY = y;
    this.updateTurtlePosition();
  }
  jump(x: number, y: number) {
    this.positionX += x;
    this.positionY += y;
    this.updateTurtlePosition();
  }
  clone() {
    return new Turtle(
      this.emoji,
      this.positionX,
      this.positionY,
      this.angle,
      this.speed,
      !!this.turtlespan,
      this.canvas,
    );
  }
  hide() {
    if (!this.turtlespan) return;
    this.turtlespan.parentElement?.removeChild(this.turtlespan);
    this.turtlespan = null;
  }
  show() {
    this.turtlespan = document.createElement("span");
    this.turtlespan.innerText = this.emoji;
    this.turtlespan.style.position = "absolute";
    this.turtlespan.style.pointerEvents = "none";

    this.canvas.parentElement?.appendChild(this.turtlespan);
  }

  remember() {
    this.history.push({
      positionX: this.positionX,
      positionY: this.positionY,
      angle: this.angle,
    });
  }
  return() {
    if (this.history.length === 0) {
      return;
    }
    const { positionX, positionY, angle } = this.history.pop()!;
    this.positionX = positionX;
    this.positionY = positionY;
    this.angle = angle;
    this.updateTurtlePosition();
  }
  async draw(distance: number) {
    const radians = (this.angle * Math.PI) / 180;
    const endX = this.positionX + distance * Math.cos(radians);
    const endY = this.positionY + distance * Math.sin(radians);

    this.ctx.beginPath();
    this.ctx.moveTo(this.positionX, this.positionY);
    this.ctx.lineTo(endX, endY);
    this.ctx.stroke();

    this.positionX = endX;
    this.positionY = endY;
    this.updateTurtlePosition();
    if (this.speed < 1000) {
      await this.sleep(1 / this.speed);
    }
  }

  rotate(degrees: number) {
    this.angle = this.angle + degrees;
    this.updateTurtlePosition();
  }
  setHeading(degrees: number) {
    this.angle = degrees;
    this.updateTurtlePosition();
  }
  setColor(color: string) {
    this.ctx.strokeStyle = color;
  }
  setWidth(width: number) {
    this.ctx.lineWidth = width;
  }
  sleep(seconds = 1) {
    const p = Promise.withResolvers();
    setTimeout(p.resolve, seconds * 1000);
    return p.promise;
  }

  async L_System(
    initiator: string,
    expansionRules: Record<string, string>,
    iterations: number,
    commands: Record<string, (t: Turtle) => Promise<void> | void>,
  ) {

    for (const instruction of lsys(initiator, expansionRules, iterations))
      await commands[instruction]?.(this);
  }
}

export class TurtleManager {
  canvas: HTMLCanvasElement;
  canvasHolder: HTMLElement | null;
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  constructor(selector: string, dpr = window.devicePixelRatio || 1) {
    this.canvas = document.querySelector(selector) as HTMLCanvasElement;
    this.canvasHolder = this.canvas.parentElement;
    const { width, height } = this.canvas.getBoundingClientRect();
    this.width = width;
    this.height = height;
    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    const ctx = this.canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Failed to get canvas context");
    }
    this.ctx = ctx;
    this.ctx.scale(dpr, dpr);
  }

  spawn(x: number, y: number) {
    x ??= this.width / 2;
    y ??= this.height / 2;
    return new Turtle("🐢", x, y, -90, 1, true, this.canvas);
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  sleep(seconds = 1) {
    const p = Promise.withResolvers();
    setTimeout(p.resolve, seconds * 1000);
    return p.promise;
  }
}
