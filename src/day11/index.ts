import run from "aocrunner";

type Coordinates = [number, number][];

const parseInput = (rawInput: string) =>
  rawInput.split(/\n/).map((row) => row.split("").map(Number));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const stack: Coordinates = [];
  let flashes = 0;

  for (let step = 0; step < 100; step++) {
    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[y].length; x++) {
        input[y][x] += 1;
        if (input[y][x] === 10) {
          stack.push([y, x]);
        }
      }
    }

    while (stack.length !== 0) {
      const [y, x] = stack.shift()!;
      flashes += 1;

      for (let h = -1; h < 2; h++) {
        for (let v = -1; v < 2; v++) {
          if (input[y + h]?.[x + v]) {
            input[y + h][x + v] += 1;
            if (input[y + h][x + v] === 10) {
              stack.push([y + h, x + v]);
            }
          }
        }
      }
    }

    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] > 10) {
          input[y][x] = 0;
        }
      }
    }
  }

  return flashes;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const stack: Coordinates = [];
  let synced = false;

  for (let step = 0; step < Infinity; step++) {
    synced = true;
    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[y].length; x++) {
        input[y][x] += 1;
        if (input[y][x] === 10) {
          stack.push([y, x]);
        }
      }
    }

    while (stack.length !== 0) {
      const [y, x] = stack.shift()!;

      for (let h = -1; h < 2; h++) {
        for (let v = -1; v < 2; v++) {
          if (input[y + h]?.[x + v]) {
            input[y + h][x + v] += 1;
            if (input[y + h][x + v] === 10) {
              stack.push([y + h, x + v]);
            }
          }
        }
      }
    }

    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] > 10) {
          input[y][x] = 0;
        } else {
          synced = false;
        }
      }
    }

    if (synced) {
      return step + 1;
    }
  }
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
