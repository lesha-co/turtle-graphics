import { TurtleManager } from "tgfx";

const turtleManager = new TurtleManager("canvas");

turtleManager.ctx.fillStyle = "#000"; // e.g., "#000000"
turtleManager.ctx.fillRect(
  0,
  0,
  turtleManager.canvas.width,
  turtleManager.canvas.height,
);

const turtle = turtleManager.spawn(400, 0);
turtle.setSpeed(1000);
turtle.setWidth(1);
turtle.hide();

let hue = 0;
async function step(turtle) {
  hue++;
  turtle.setColor(`hsl(${hue / 150}, 100%, 50%)`);
  await turtle.draw(10);
}

turtle.L_System(
  "A",
  {
    A: "A-B--B+A++AA+B-",
    B: "+A-BB--B-A++A+B",
  },
  5,
  {
    // commands
    "+": (turtle) => turtle.rotate(-60),
    "-": (turtle) => turtle.rotate(60),
    A: step,
    B: step,
  },
);
