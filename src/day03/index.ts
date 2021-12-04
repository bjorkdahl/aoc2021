import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split(/\n/).map((a) => a.trim());

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const result = { gammaRate: "", epsilonRate: "" };

  const map = input.reduce((acc, binary) => {
    for (let i = 0; i < binary.length; i++) {
      const currentSum = acc.get(i) ?? 0;
      acc.set(i, currentSum + Number(binary.at(i)));
    }

    return acc;
  }, new Map<number, number>());

  for (const [key, value] of map.entries()) {
    result.gammaRate += value / input.length > 0.5 ? "1" : "0";
    result.epsilonRate += value / input.length < 0.5 ? "1" : "0";
  }

  return parseInt(result.epsilonRate, 2) * parseInt(result.gammaRate, 2);
};

const part2 = (rawInput: string) => {
  let input = parseInput(rawInput);

  let OGRating = Array.from(input),
    CO2Rating = Array.from(input);

  while (OGRating.length > 1 && CO2Rating.length > 1) {
    const length = 12;
    let OGsum = 0,
      CO2sum = 0;

    for (let i = 0; i < length; i++) {
      for (const binary of OGRating) {
        OGsum += Number(binary.at(i));
      }

      for (const binary of CO2Rating) {
        CO2sum += Number(binary.at(i));
      }

      if (OGRating.length > 1) {
        if (OGsum / OGRating.length >= 0.5) {
          OGRating = OGRating.filter((binary) => binary.at(i) === "1");
        } else {
          OGRating = OGRating.filter((binary) => binary.at(i) === "0");
        }
      }

      if (CO2Rating.length > 1) {
        if (CO2sum / CO2Rating.length >= 0.5) {
          CO2Rating = CO2Rating.filter((binary) => binary.at(i) === "0");
        } else {
          CO2Rating = CO2Rating.filter((binary) => binary.at(i) === "1");
        }
      }

      OGsum = 0;
      CO2sum = 0;
    }
  }

  return parseInt(OGRating[0], 2) * parseInt(CO2Rating[0], 2);
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
