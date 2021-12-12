import run from "aocrunner";
import { assert } from "console";

type Observation = {
  signalPatterns: string[][];
  output: string[][];
};

const parseInput = (rawInput: string) =>
  rawInput.split(/\n/).reduce((observations: Observation[], displayInput) => {
    const [signalPatterns, output] = displayInput.split(" | ");
    const observation: Observation = {
      signalPatterns: signalPatterns.split(" ").map((p) => p.split("")),
      output: output.split(" ").map((p) => p.split("")),
    };
    observations.push(observation);
    return observations;
  }, []);

const part1 = (rawInput: string) => {
  const observations = parseInput(rawInput);

  let count = 0;
  for (const observation of observations) {
    for (const line of observation.output) {
      if ([2, 3, 4, 7].includes(line.length)) {
        count += 1;
      }
    }
  }

  return count;
};

const part2 = (rawInput: string) => {
  const observations = parseInput(rawInput);

  return observations.reduce((sum, observation) => {
    const mapping = deduceMapping(observation.signalPatterns);

    let output: number[] = [];
    for (const line of observation.output) {
      const sorted = line.sort().join("");
      if (mapping.has(sorted)) {
        output.push(mapping.get(sorted)!);
      } else {
        throw new Error(`No mapping for output value: ${line}`);
      }
    }

    return (sum += Number(output.join("")));
  }, 0);
};

const deduceMapping = (signalPatterns: string[][]): Map<string, number> => {
  const mapping = new Map<string, number>();

  const digitToSegments = {
    1: "cf", // Done
    7: "acf", // Done
    4: "bcdf", // Done
    5: "abdfg", // Done
    2: "acdeg", // Done
    3: "acdfg", // Done
    9: "abcdfg", // Done
    0: "abcefg", // Done
    6: "abdefg", // Done
    8: "abcdefg", // Done
  }; // Letters known: a, g ,e

  // Deductions

  const one = signalPatterns.filter((pattern) => pattern.length === 2).at(0)!;
  const seven = signalPatterns.filter((pattern) => pattern.length === 3).at(0)!;
  const four = signalPatterns.filter((pattern) => pattern.length === 4).at(0)!;
  const eight = signalPatterns.filter((pattern) => pattern.length === 7).at(0)!;

  const a = seven.filter((char: string) => !one.includes(char)).at(0)!;

  const g = signalPatterns
    .filter((pattern) => pattern.length === 6)
    .filter((pattern) => four.concat(a).every((c) => pattern.includes(c)))
    .at(0)!
    .filter((char) => !four.concat(a).includes(char))
    .at(0)!;

  const e = eight.filter((char) => !four.concat([a, g]).includes(char)).at(0)!;

  const nine = four.concat([a, g]);

  const three = signalPatterns
    .filter((pattern) => pattern.length === 5)
    .filter((pattern) => one.every((char) => pattern.includes(char)))
    .at(0)!;

  const d = three.filter((char) => !one.concat([a, g]).includes(char)).at(0)!;

  const zero = eight.filter((char) => char !== d);

  const six = signalPatterns
    .filter((pattern) => pattern.length === 6)
    .filter((pattern) => !pattern.every((char) => zero.includes(char)))
    .filter((pattern) => !pattern.every((char) => nine.includes(char)))
    .at(0)!;

  const two = signalPatterns
    .filter((pattern) => pattern.length === 5)
    .filter((pattern) => pattern.includes(e))
    .at(0)!;

  const five = signalPatterns
    .filter((pattern) => pattern.length === 5)
    .filter((pattern) => !pattern.every((char) => two.includes(char)))
    .filter((pattern) => !pattern.every((char) => three.includes(char)))
    .at(0)!;

  // Add known patterns
  mapping.set(zero.sort().join(""), 0);
  mapping.set(one.sort().join(""), 1);
  mapping.set(two.sort().join(""), 2);
  mapping.set(three.sort().join(""), 3);
  mapping.set(four.sort().join(""), 4);
  mapping.set(five.sort().join(""), 5);
  mapping.set(six.sort().join(""), 6);
  mapping.set(seven.sort().join(""), 7);
  mapping.set(eight.sort().join(""), 8);
  mapping.set(nine.sort().join(""), 9);

  return mapping;
};

run({
  part1: {
    tests: [
      {
        input: `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
       edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
       fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
       fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
       aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
       fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
       dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf |  cefg dcbef fcge gbcadfe
       bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
       egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
       gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`,
        expected: 26,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`,
        expected: 5353,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
