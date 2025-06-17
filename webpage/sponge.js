import { TurtleManager } from "tgfx";

const turtleManager = new TurtleManager("canvas");
const turtleZero = turtleManager.spawn(400, 300);
turtleZero.hide();
turtleZero.setSpeed(10);
turtleZero.setColor("#ff0000");

async function square(turtle, radius) {
  turtle.jump(-radius, -radius);
  turtle.setHeading(0);
  await turtle.draw(radius * 2);
  turtle.rotate(90);
  await turtle.draw(radius * 2);
  turtle.rotate(90);
  await turtle.draw(radius * 2);
  turtle.rotate(90);
  await turtle.draw(radius * 2);
  turtle.jump(+radius, +radius);
}

async function step(turtle, length, remainingSteps) {
  if (remainingSteps == 0) {
    return;
  }

  await square(turtle, length);

  const turtle1 = turtle.clone();
  const turtle2 = turtle.clone();
  const turtle3 = turtle.clone();
  const turtle4 = turtle.clone();
  const turtle5 = turtle.clone();
  const turtle6 = turtle.clone();
  const turtle7 = turtle.clone();

  turtle.jump(-length * 2, -length * 2);
  turtle1.jump(0, -length * 2);
  turtle2.jump(length * 2, -length * 2);

  turtle3.jump(-length * 2, 0);
  turtle4.jump(+length * 2, 0);

  turtle5.jump(-length * 2, length * 2);
  turtle6.jump(0, length * 2);
  turtle7.jump(length * 2, length * 2);

  const newLength = length / 3;

  await Promise.all([
    step(turtle, newLength, remainingSteps - 1),
    step(turtle1, newLength, remainingSteps - 1),
    step(turtle2, newLength, remainingSteps - 1),
    step(turtle3, newLength, remainingSteps - 1),
    step(turtle4, newLength, remainingSteps - 1),
    step(turtle5, newLength, remainingSteps - 1),
    step(turtle6, newLength, remainingSteps - 1),
    step(turtle7, newLength, remainingSteps - 1),
  ]);
}

await step(turtleZero, 100, 5);

console.log("done");
