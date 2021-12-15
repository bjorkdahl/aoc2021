import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput
    .split(/\n(?:\s+)?/)
    .map((connection) => connection.split("-"))
    .reduce((connections: { [key: string]: string[] }, connection) => {
      const [from, to] = connection;

      if (!connections.hasOwnProperty(from)) {
        connections[from] = [];
      }

      connections[from].push(to);

      if (!connections.hasOwnProperty(to)) {
        connections[to] = [];
      }

      connections[to].push(from);

      return connections;
    }, {});

const traverse = (
  validate: (paths: string[], path: string) => boolean,
  connections: { [key: string]: string[] },
  currentPath = "start",
  visited = [currentPath],
): number => {
  if (currentPath === "end") {
    return 1;
  }

  let sum = 0;
  const availablePaths = connections[currentPath];

  for (const path of availablePaths) {
    if (isNotStart(path) && validate(visited, path)) {
      sum += traverse(validate, connections, path, visited.concat(path));
    }
  }

  return sum;
};

const isNotStart = (path: string): boolean => path !== "start";

const isBigCave = (string: string): boolean => string === string.toUpperCase();
const isSmallCave = (string: string): boolean =>
  string === string.toLowerCase();

const validatePartOne = (paths: string[], path: string): boolean =>
  isBigCave(path) || !paths.includes(path);

const validatePartTwo = (paths: string[], path: string): boolean => {
  const smallCaves = paths.filter((p) => isSmallCave(p));

  return (
    isBigCave(path) ||
    !smallCaves.includes(path) ||
    new Set(smallCaves).size === smallCaves.length
  );
};

const part1 = (rawInput: string) => {
  const connections = parseInput(rawInput);
  const paths = traverse(validatePartOne, connections);
  return paths;
};

const part2 = (rawInput: string) => {
  const connections = parseInput(rawInput);
  const paths = traverse(validatePartTwo, connections);
  return paths;
};

run({
  part1: {
    tests: [
      {
        input: `start-A
        start-b
        A-c
        A-b
        b-d
        A-end
        b-end`,
        expected: 10,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `start-A
        start-b
        A-c
        A-b
        b-d
        A-end
        b-end`,
        expected: 36,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
