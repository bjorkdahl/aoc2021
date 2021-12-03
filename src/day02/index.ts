import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split(/\n/).map((instruction) => ({
    direction: instruction.split(" ").at(0),
    amount: Number(instruction.split(" ").at(1)),
  }));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const result = input.reduce(
    (acc, instruction) => {
      switch (instruction.direction) {
        case "forward":
          acc.horizontal += instruction.amount;
          break;
        case "up":
          acc.depth -= instruction.amount;
          break;
        case "down":
          acc.depth += instruction.amount;
          break;
        default:
          console.log("WTF DID YOU DO", instruction);
          break;
      }

      return acc;
    },
    {
      horizontal: 0,
      depth: 0,
    },
  );

  return result.depth * result.horizontal;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const result = input.reduce(
    (acc, instruction) => {
      switch (instruction.direction) {
        case "forward":
          acc.horizontal += instruction.amount;
          acc.depth += instruction.amount * acc.aim;
          break;
        case "up":
          acc.aim -= instruction.amount;
          break;
        case "down":
          acc.aim += instruction.amount;
          break;
        default:
          console.log("WTF DID YOU DO", instruction);
          break;
      }

      return acc;
    },
    {
      horizontal: 0,
      depth: 0,
      aim: 0,
    },
  );

  return result.depth * result.horizontal;
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
