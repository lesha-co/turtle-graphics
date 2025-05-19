import { Turtle } from "./turtle.js";

const turtle = new Turtle("canvas");

for (let i = 0; i < 28; i++) {
  turtle.draw(50 + i * 2);
  turtle.rotate(360 / 7);
}

for (let j = 28; j > 0; j--) {
  turtle.draw(50 + j * 2);
  turtle.rotate(-360 / 7);
}
