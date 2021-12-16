import run from "aocrunner";

type Instructions = {
  dots: number[][];
  folds: [string, number][];
};

const parseInput = (rawInput: string) =>
  rawInput.split(/\n\n/).reduce(
    (instructions: Instructions, rows: string, index: number) => {
      if (index === 0) {
        instructions.dots = rows
          .split(/\n/)
          .map((row) => row.split(",").map(Number));
      } else {
        instructions.folds = rows.split(/\n/).map((row) => {
          const [axis, index] = row.split("=");

          return [axis.slice(-1), Number(index)];
        });
      }
      return instructions;
    },
    { dots: [], folds: [] },
  );

const part1 = (rawInput: string) => {
  const instructions = parseInput(rawInput);

  for (const [index, fold] of instructions.folds.entries()) {
    const [axis, foldIndex] = fold;

    if (index > 0) {
      continue;
    }

    for (let i = 0; i < instructions.dots.length; i++) {
      const [x, y] = instructions.dots[i];
      if (axis === "y") {
        if (y > foldIndex) {
          instructions.dots[i] = [x, foldIndex - (y - foldIndex)];
        }
      } else {
        if (x > foldIndex) {
          instructions.dots[i] = [foldIndex - (x - foldIndex), y];
        }
      }
    }
  }

  return new Set(instructions.dots.map((dots) => dots.join("-"))).size;
};

const part2 = (rawInput: string) => {
  const instructions = parseInput(rawInput);

  for (const [axis, index] of instructions.folds) {
    for (let i = 0; i < instructions.dots.length; i++) {
      const [x, y] = instructions.dots[i];
      if (axis === "y") {
        if (y > index) {
          instructions.dots[i] = [x, index - (y - index)];
        }
      } else {
        if (x > index) {
          instructions.dots[i] = [index - (x - index), y];
        }
      }
    }
  }

  const [maxX, maxY] = instructions.dots.reduce(
    (maxes, dots) => {
      if (dots[0] > maxes[0]) {
        maxes[0] = dots[0];
      }
      if (dots[1] > maxes[1]) {
        maxes[1] = dots[1];
      }
      return maxes;
    },
    [0, 0],
  );

  const matrix = Array.from(Array(maxY + 1), () =>
    new Array(maxX + 1).fill("."),
  );

  for (const [x, y] of instructions.dots) {
    matrix[y][x] = "#";
  }

  for (let y = 0; y < matrix.length; y++) {
    console.log(matrix[y].join(" "));
  }

  return;
};

run({
  part1: {
    tests: [
      {
        input: `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7`,
        expected: 17,
      },
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
  onlyTests: false,
});
