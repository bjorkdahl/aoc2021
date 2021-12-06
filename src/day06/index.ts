import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split(",").reduce((map, fishString) => {
    const daysLeft = Number(fishString);
    const currentAmount = map.get(daysLeft) ?? 0;

    map.set(daysLeft, currentAmount + 1);

    return map;
  }, new Map<number, number>());

const part1 = (rawInput: string) => {
  let input = parseInput(rawInput);

  for (let day = 0; day < 80; day++) {
    const copy = new Map<number, number>();
    for (const [daysLeft, amount] of input.entries()) {
      if (daysLeft === 0 || daysLeft === 7) {
        const currentAmount = copy.get(6) ?? 0;
        copy.set(6, currentAmount + amount);

        if (daysLeft === 0) {
          copy.set(8, amount);
        }
      } else {
        copy.set(daysLeft - 1, amount);
      }
    }

    input = new Map(copy);
  }

  return [...input.values()].reduce((sum, num) => sum + num, 0);
};

const part2 = (rawInput: string) => {
  let input = parseInput(rawInput);

  for (let day = 0; day < 256; day++) {
    const copy = new Map<number, number>();
    for (const [daysLeft, amount] of input.entries()) {
      if (daysLeft === 0 || daysLeft === 7) {
        const currentAmount = copy.get(6) ?? 0;
        copy.set(6, currentAmount + amount);

        if (daysLeft === 0) {
          copy.set(8, amount);
        }
      } else {
        copy.set(daysLeft - 1, amount);
      }
    }

    input = new Map(copy);
  }

  return [...input.values()].reduce((sum, num) => sum + num, 0);
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
