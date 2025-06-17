# L-System Generator

an insanely simple and effecient generator of L-system expansions.

It has O(n) space complexity where n is the number of iterations, *not* result length.

We can achieve it by wrapping generators into each other, which barely consumes any memory, but lets us create very big sequences

```js
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
```
