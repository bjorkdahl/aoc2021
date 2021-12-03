import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split(/\n/).map((a) => Number(a));

const part1 = (rawInput: string) => {
  const input: number[] = parseInput(rawInput);

  const increases = input.reduce((acc, current, index) => {
    const previous = index > 0 && input.at(index - 1);
    if (previous && current > previous) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return increases;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const increases = input.reduce((acc, current, index) => {
    const previous = index > 0 && input.at(index - 3);
    if (previous && current > previous) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return increases;
};

run({
  part1: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
