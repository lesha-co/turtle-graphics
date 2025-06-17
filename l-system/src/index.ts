export function lsys(
  initiator: string,
  rules: Record<string, string>,
  iterations: number,
): Iterable<string> {
  function* stepGenerator(list: Iterable<string>) {
    // iterating over a list of instructions
    for (let instruction of list) {
      // if there is an expansion rule for current instruction
      if (rules[instruction]) {
        // yield all instructions for that expansion rule
        yield* rules[instruction];
      } else {
        // otherwise yield the instruction itself — it does not expand
        yield instruction;
      }
    }
  }

  // now we wrapping generator in itself several times
  let generator: Iterable<string> = initiator;
  for (let i = 0; i < iterations; i++) {
    generator = stepGenerator(generator);
  }

  return generator;
}
