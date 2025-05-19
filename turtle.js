export class Turtle {
  positionX = 0;
  positionY = 0;
  angle = -90;

  constructor(selector) {
    this.turtlespan = document.createElement("span");
    this.turtlespan.innerText = "🐢";

    this.canvas = document.querySelector(selector);
    this.ctx = this.canvas.getContext("2d");
    this.positionX = this.canvas.offsetWidth / 2;
    this.positionY = this.canvas.offsetHeight / 2;
  }

  teleport(x, y) {
    this.positionX = x;
    this.positionY = y;
  }

  draw(distance) {
    const radians = (this.angle * Math.PI) / 180;
    const endX = this.positionX + distance * Math.cos(radians);
    const endY = this.positionY + distance * Math.sin(radians);

    this.ctx.beginPath();
    this.ctx.moveTo(this.positionX, this.positionY);
    this.ctx.lineTo(endX, endY);
    this.ctx.stroke();

    this.positionX = endX;
    this.positionY = endY;
  }

  rotate(degrees) {
    this.angle = (this.angle + degrees) % 360;
    if (this.angle < 0) {
      this.angle += 360;
    }
  }

  setColor(color) {
    this.ctx.strokeStyle = this.color;
  }

  setWidth(width) {
    this.ctx.lineWidth = this.lineWidth;
  }
}
