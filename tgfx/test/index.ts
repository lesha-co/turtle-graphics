import { lsys } from "lsystem-generator";
import { coordinatesToSVGPath, render } from "../src";

import fs from "node:fs";
const sequence = lsys(
  "A",
  {
    A: "A-B--B+A++AA+B-",
    B: "+A-BB--B-A++A+B",
  },
  5,
);

const advance = 20;
const stroke = advance / 2;
const color = "rgba(0,0,0,50%)";
const path = coordinatesToSVGPath(
  render(sequence, {
    // commands
    "+": { rotate: -60 },
    "-": { rotate: +60 },
    A: { advance },
    B: { advance },
  }),
);

const svg = `<svg viewBox="${path.viewBox}" width="${path.w}" height="${path.h}" xmlns="http://www.w3.org/2000/svg">
  <path
    stroke="${color}"
    stroke-width="${stroke}"
    fill="none"
    stroke-linejoin="miter"
    stroke-miterlimit="1"
    d="${path.path}" />
</svg>
`;

fs.writeFileSync("output.svg", svg);
