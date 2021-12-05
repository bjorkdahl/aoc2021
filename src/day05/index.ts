import run from "aocrunner";

type Coordinates = string;
type Lines = Array<Line>;
type Line = {
  from: { x1: number; y1: number };
  to: { x2: number; y2: number };
};

const parseInput = (rawInput: string): Lines =>
  rawInput.split(/\n/).map((a) => {
    const [from, to] = a.split(" -> ");
    const [x1, y1] = from.split(",");
    const [x2, y2] = to.split(",");
    return {
      from: { x1: Number(x1), y1: Number(y1) },
      to: { x2: Number(x2), y2: Number(y2) },
    };
  });

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const filteredLines = input.filter(
    (line) => line.from.x1 === line.to.x2 || line.from.y1 === line.to.y2,
  );

  const visited = new Map<Coordinates, number>();

  for (const line of filteredLines) {
    const { x1, y1 } = line.from;
    const { x2, y2 } = line.to;

    const lineDirection = x1 === x2 ? "vertical" : "horizontal";

    if (lineDirection === "vertical") {
      const lower = y1 > y2 ? y2 : y1;
      const higher = y1 > y2 ? y1 : y2;
      for (let y = lower; y <= higher; y++) {
        const coordinate = `${x1}-${y}`;
        const timesVisisted = visited.get(coordinate) ?? 0;
        visited.set(coordinate, timesVisisted + 1);
      }
    } else {
      const lower = x1 > x2 ? x2 : x1;
      const higher = x1 > x2 ? x1 : x2;
      for (let x = lower; x <= higher; x++) {
        const coordinate = `${x}-${y1}`;
        const timesVisisted = visited.get(coordinate) ?? 0;
        visited.set(coordinate, timesVisisted + 1);
      }
    }
  }

  return [...visited].filter((point) => point[1] > 1).length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const visited = new Map<Coordinates, number>();

  for (const line of input) {
    const { x1, y1 } = line.from;
    const { x2, y2 } = line.to;

    const lineDirection =
      x1 === x2 ? "vertical" : y1 === y2 ? "horizontal" : "diagonal";

    if (lineDirection === "vertical") {
      const lower = y1 > y2 ? y2 : y1;
      const higher = y1 > y2 ? y1 : y2;
      for (let y = lower; y <= higher; y++) {
        const coordinate = `${x1}-${y}`;
        const timesVisisted = visited.get(coordinate) ?? 0;
        visited.set(coordinate, timesVisisted + 1);
      }
    } else if (lineDirection === "horizontal") {
      const lower = x1 > x2 ? x2 : x1;
      const higher = x1 > x2 ? x1 : x2;
      for (let x = lower; x <= higher; x++) {
        const coordinate = `${x}-${y1}`;
        const timesVisisted = visited.get(coordinate) ?? 0;
        visited.set(coordinate, timesVisisted + 1);
      }
    } else {
      const lowerX = x1 > x2 ? x2 : x1;
      const higherX = x1 > x2 ? x1 : x2;

      let diagonalY = lowerX === x1 ? y1 : y2;
      const diagonalDirection =
        lowerX === x1 ? (y1 > y2 ? "down" : "up") : y2 > y1 ? "down" : "up";

      for (let x = lowerX; x <= higherX; x++) {
        const coordinate = `${x}-${diagonalY}`;
        const timesVisisted = visited.get(coordinate) ?? 0;
        visited.set(coordinate, timesVisisted + 1);

        if (diagonalDirection === "down") {
          diagonalY -= 1;
        } else {
          diagonalY += 1;
        }
      }
    }
  }

  return [...visited].filter((point) => point[1] > 1).length;
};

run({
  part1: {
    tests: [
      {
        input: `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`,
        expected: 5,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
