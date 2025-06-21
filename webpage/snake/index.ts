import { lsys } from "lsystem-generator";
import { render } from "tgfx";

const advance = 10;

const sequence = lsys(
  "A",
  {
    A: "A-B--B+A++AA+B-",
    B: "+A-BB--B-A++A+B",
  },
  5,
);
const path = render(sequence, {
  // commands
  "+": { rotate: -60 },
  "-": { rotate: +60 },
  A: { advance },
  B: { advance },
});

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

for (let p of path) {
  ctx.ellipse(p.x, p.y, 2, 2, 0, 0, Math.PI * 2);
}
