import { TurtleManager } from "./turtle.js";

const turtleManager = new TurtleManager("canvas");
const turtle = turtleManager.spawn(1200, 800);
turtle.setSpeed(1000);
turtle.hide();
//roduction rules:

// X → YF + XF + Y
// Y → XF − YF − X
turtle.L_System(
  "XF",
  {
    X: "YF+XF+Y",
    Y: "XF-YF-X",
  },
  9,
  {
    // commands
    "+": (turtle) => turtle.rotate(-60),
    "-": (turtle) => turtle.rotate(60),
    F: async (turtle) => await turtle.draw(1),
  },
);
