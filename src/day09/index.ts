import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split(/\n/).map((row) => row.split("").map(Number));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let riskLevels = 0;

  for (const [y, row] of input.entries()) {
    for (const [x, point] of row.entries()) {
      if (isLowPoint(point, x, y, input)) {
        riskLevels += point + 1;
      }
    }
  }

  return riskLevels;
};

const isLowPoint = (point: number, x: number, y: number, input: number[][]) => {
  const above = input[y - 1]?.[x];
  const below = input[y + 1]?.[x];
  const left = input[y]?.[x - 1];
  const right = input[y]?.[x + 1];

  return (
    (above === undefined || above > point) &&
    (below === undefined || below > point) &&
    (left === undefined || left > point) &&
    (right === undefined || right > point)
  );
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lowPoints: LowPoint[] = [];

  for (const [y, row] of input.entries()) {
    for (const [x, point] of row.entries()) {
      if (isLowPoint(point, x, y, input)) {
        lowPoints.push({ x, y, height: point });
      }
    }
  }

  let result: number[] = [];
  for (const lowPoint of lowPoints) {
    result.push(dfs(input, lowPoint));
  }

  return result
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((s, v) => s * v, 1);
};

type LowPoint = { x: number; y: number; height: number };

const dfs = (
  input: number[][],
  location: { x: number; y: number },
  previous?: number,
  visited: Record<string, boolean> = {},
): number => {
  const { x, y } = location;
  const height = input[y]?.[x];

  if (
    height === undefined ||
    height === 9 ||
    visited[`${y}-${x}`] ||
    height < previous!
  ) {
    return 0;
  }

  visited[`${y}-${x}`] = true;

  return (
    dfs(input, { x: x - 1, y }, height, visited) +
    dfs(input, { x: x + 1, y }, height, visited) +
    dfs(input, { x, y: y + 1 }, height, visited) +
    dfs(input, { x, y: y - 1 }, height, visited) +
    1
  );
};

run({
  part1: {
    tests: [
      // {
      //   input: `2199943210
      //   3987894921
      //   9856789892
      //   8767896789
      //   9899965678`,
      //   expected: 15,
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2199943210
       3987894921
       9856789892
       8767896789
       9899965678`,
        expected: 1134,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
