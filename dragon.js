import { TurtleManager } from "./turtle.js";

const ORDER = 15;

const turtleManager = new TurtleManager("canvas");
const turtle = turtleManager.spawn();
turtle.hide();
turtle.setSpeed(10000);

let nucleus = "dld"; // Draw, rotate left, draw
for (let i = 0; i < ORDER; i++) {
  nucleus = nucleus + "l" + inverse(nucleus);
}

/**
 * inverse rotations (R -> L, L -> R) and
 * inverse instruction order (R L L -> L L R)
 * @param {string} instructions
 * @returns {string}
 */
function inverse(instructions) {
  const inversedRotations = instructions.replace(/[lr]/g, (match) =>
    match === "l" ? "r" : "l",
  );
  return inversedRotations.split("").reverse().join("");
}

/**
 * Draw the dragon curve
 */
const drawDistance = 3;
let draws = 0;
for (const instruction of nucleus) {
  switch (instruction) {
    case "d":
      await turtle.draw(drawDistance);
      turtle.setColor(`hsl(${draws % 360}, 100%, 50%)`);
      draws++;
      break;
    case "r":
      turtle.rotate(90);
      break;
    case "l":
      turtle.rotate(-90);
      break;
  }
}
