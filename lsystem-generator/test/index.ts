import { lsys } from "..";

const sequence = lsys(
  "A",
  {
    A: "A-B--B+A++AA+B-",
    B: "+A-BB--B-A++A+B",
  },
  5
);
for (let i of sequence) {
  // do stuff
  console.log(i);
}
