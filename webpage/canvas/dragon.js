import { TurtleManager } from "tgfx";

const turtleManager = new TurtleManager("canvas");
const turtle = turtleManager.spawn(1000, 500);
turtle.setSpeed(1000);
turtle.hide();

turtle.L_System(
  "F",
  {
    F: "F+G",
    G: "F-G",
  },
  15,
  {
    // commands
    "+": (turtle) => turtle.rotate(-90),
    "-": (turtle) => turtle.rotate(90),
    F: async (turtle) => await turtle.draw(5),
    G: async (turtle) => await turtle.draw(5),
  },
);
