import { TurtleManager } from "tgfx";

const turtleManager = new TurtleManager("canvas");
const turtle1 = turtleManager.spawn();
const turtle2 = turtleManager.spawn();
turtle1.teleport(100, 100);
turtle2.teleport(600, 100);

async function mandala(turtle, rings) {
  turtle.setSpeed(200);
  for (let i = 0; i < rings; i++) {
    for (let j = 0; j < 180; j++) {
      await turtle.draw(3);
      turtle.rotate(2);
      turtle.setColor(`hsl(${j + i * (360 / rings)}, 100%, 50%)`);
    }
    turtle.rotate(360 / rings);
  }
  turtle.hide();
}

Promise.all([mandala(turtle1, 20), mandala(turtle2, 10)]);
