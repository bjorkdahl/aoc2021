import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput
    .split(",")
    .map(Number)
    .reduce((sorted: number[], position) => {
      if (sorted[position]) {
        sorted[position] += 1;
      } else {
        sorted[position] = 1;
      }

      return sorted;
    }, []);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let minimumFuelCost = Infinity;

  for (let position = 0; position < input.length; position++) {
    let fuelCost = 0;
    for (let submarines = 0; submarines < input.length; submarines++) {
      if (fuelCost > minimumFuelCost) {
        break;
      }
      const amountOfSubmarines = input[submarines] ?? 0;
      const fuelCostToPosition =
        Math.abs(position - submarines) * amountOfSubmarines;
      fuelCost += fuelCostToPosition;
    }

    if (fuelCost < minimumFuelCost) {
      minimumFuelCost = fuelCost;
    }
  }

  return minimumFuelCost;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let minimumFuelCost = Infinity;

  for (let position = 0; position < input.length; position++) {
    let fuelCost = 0;
    for (let submarines = 0; submarines < input.length; submarines++) {
      if (fuelCost > minimumFuelCost) {
        break;
      }
      const amountOfSubmarines = input[submarines] ?? 0;
      const positionalDifference = Math.abs(position - submarines);

      // Arithmatic series
      // { Sum of series with n length = (n / 2) * (first term of series + n)  }
      const fuelCostToPositionPerSubmarine =
        (positionalDifference / 2) * (1 + positionalDifference);
      const fuelCostToPosition =
        fuelCostToPositionPerSubmarine * amountOfSubmarines;
      fuelCost += fuelCostToPosition;
    }

    if (fuelCost < minimumFuelCost) {
      minimumFuelCost = fuelCost;
    }
  }

  return minimumFuelCost;
};

run({
  part1: {
    tests: [{ input: `16,1,2,0,4,2,7,1,2,14`, expected: 37 }],
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
