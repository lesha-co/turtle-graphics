import { lsys } from "../dist/index.js";

const sequence = lsys(
  "A",
  {
    A: "A-B--B+A++AA+B-",
    B: "+A-BB--B-A++A+B",
  },
  100,
);

console.log((process.memoryUsage.rss() / 1024 / 1024) | 0);
