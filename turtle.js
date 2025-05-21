class Turtle {
  history = [];
  constructor(emoji = "🐢", x, y, angle, speed, enable, canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
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
  setSpeed(speed) {
    this.speed = speed;
  }
  updateTurtlePosition() {
    if (!this.turtlespan) return;

    const turtleSize = 20; // Approximate size of the turtle emoji
    this.turtlespan.style.left = this.positionX - turtleSize / 2 + "px";
    this.turtlespan.style.top = this.positionY - turtleSize / 2 + "px";
    this.turtlespan.style.transform = `rotate(${180 + Math.round(this.angle)}deg)`;
    if (this.speed > 10) {
      this.turtlespan.style.transition = undefined;
    } else {
      this.turtlespan.style.transition =
        "left 0.1s ease, top 0.1s ease, transform 0.1s ease";
    }
  }
  teleport(x, y) {
    this.positionX = x;
    this.positionY = y;
    this.updateTurtlePosition();
  }
  jump(x, y) {
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
    this.turtlespan.parentElement.removeChild(this.turtlespan);
    this.turtlespan = null;
  }
  show() {
    this.turtlespan = document.createElement("span");
    this.turtlespan.innerText = this.emoji;
    this.turtlespan.style.position = "absolute";
    this.turtlespan.style.pointerEvents = "none";

    this.canvas.parentElement.appendChild(this.turtlespan);
  }

  remember() {
    this.history.push({
      positionX: this.positionX,
      positionY: this.positionY,
      angle: this.angle,
    });
  }
  return() {
    const { positionX, positionY, angle } = this.history.pop();
    this.positionX = positionX;
    this.positionY = positionY;
    this.angle = angle;
    this.updateTurtlePosition();
  }
  async draw(distance) {
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

  rotate(degrees) {
    this.angle = this.angle + degrees;
    this.updateTurtlePosition();
  }
  setHeading(degrees) {
    this.angle = degrees;
    this.updateTurtlePosition();
  }
  setColor(color) {
    this.ctx.strokeStyle = color;
  }
  setWidth(width) {
    this.ctx.lineWidth = width;
  }
  sleep(seconds = 1) {
    const p = Promise.withResolvers();
    setTimeout(p.resolve, seconds * 1000);
    return p.promise;
  }
  /**
   *
   * @param {Record<string, (this)=>(Promise<void>|void)>} commands
   * @param {string} initiator
   * @param {Record<string, string>} expansionRules
   * @param {number} iterations
   */
  async L_System(initiator, expansionRules, iterations, commands) {
    /**
     *
     * @param {string} iterable (list or generator) of instructions at current level
     * @returns iterable
     */
    function* stepGenerator(list) {
      // iterating over a list of instructions
      for (let instruction of list) {
        // if there is an expansion rule for current instruction
        if (expansionRules[instruction]) {
          // yield all instructions for that expansion rule
          yield* expansionRules[instruction];
        } else {
          // otherwise yield the instruction itself — it does not expand
          yield instruction;
        }
      }
    }

    // now we wrapping generator in itself several times
    let generator = initiator;
    for (let i = 0; i < iterations; i++) {
      generator = stepGenerator(generator);
    }

    for (const instruction of generator) {
      if (!commands[instruction]) continue;
      await commands[instruction](this);
    }
  }
}

export class TurtleManager {
  constructor(selector) {
    this.canvas = document.querySelector(selector);
    this.canvasHolder = this.canvas.parentElement;

    const dpr = 6;
    const { width, height } = this.canvas.getBoundingClientRect();
    this.width = width;
    this.height = height;
    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.scale(dpr, dpr);
  }

  spawn(x, y) {
    x ??= this.width / 2;
    y ??= this.height / 2;
    return new Turtle("🐢", x, y, -90, 1, true, this.canvas);
  }
  clear() {
    const ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  sleep(seconds = 1) {
    const p = Promise.withResolvers();
    setTimeout(p.resolve, seconds * 1000);
    return p.promise;
  }
}
