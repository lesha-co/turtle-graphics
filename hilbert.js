import { TurtleManager } from "./turtle.js";

const turtleManager = new TurtleManager("canvas");
const turtle = turtleManager.spawn(1000, 500);
turtle.setSpeed(1000);
turtle.hide();

turtle.L_System(
  "A",
  {
    A: "+BF-AFA-FB+",
    B: "-AF+BFB+FA-",
  },
  5,
  {
    // commands
    "+": (turtle) => turtle.rotate(-90),
    "-": (turtle) => turtle.rotate(90),
    F: async (turtle) => await turtle.draw(5),
  },
);
