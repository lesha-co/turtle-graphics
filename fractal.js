import { TurtleManager } from "./turtle.js";

const turtleManager = new TurtleManager("canvas");
const turtleZero = turtleManager.spawn(400, 500);
turtleZero.hide();
turtleZero.setSpeed(200);

async function step(turtle, length, angleA, angleB, factor, remainingSteps) {
  if (remainingSteps == 0) {
    return;
  }

  await turtle.draw(length);
  const turtle2 = turtle.clone();

  const newSpeed = turtle.speed * (0.5 + Math.random());
  turtle2.setSpeed(newSpeed);

  turtle.rotate(angleA);
  turtle2.rotate(angleB);

  await Promise.all([
    step(turtle, length * factor, angleA, angleB, factor, remainingSteps - 1),
    step(turtle2, length * factor, angleA, angleB, factor, remainingSteps - 1),
  ]);
}

await step(turtleZero, 100, -30, 40, 0.8, 13);
console.log("done");
