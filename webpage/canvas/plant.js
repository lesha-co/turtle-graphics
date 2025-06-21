import { TurtleManager } from "tgfx";

const turtleManager = new TurtleManager("canvas");
const turtle = turtleManager.spawn(100, 800);
turtle.setSpeed(1000);
turtle.hide();

turtle.L_System(
  "-X",
  {
    X: "F+[[X]-X]-F[-FX]+X",
    F: "FF",
  },
  8,
  {
    // commands
    "+": (turtle) => turtle.rotate(-15),
    "-": (turtle) => turtle.rotate(15),
    "[": (turtle) => turtle.remember(),
    "]": (turtle) => turtle.return(),
    F: async (turtle) => await turtle.draw(1),
  },
);
