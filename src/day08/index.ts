import run from "aocrunner";

type Observation = {
  signalPatterns: Array<string>,
  output: Array<string>
}

const parseInput = (rawInput: string) => rawInput.split(/\n/).reduce((observations: Observation[], displayInput) => {
  const [signalPatterns, output] = displayInput.split(' | ')
  const observation: Observation = {
    signalPatterns: signalPatterns.split(' '),
    output: output.split(' '),
  }
  observations.push(observation)
  return observations
}, []);

const part1 = (rawInput: string) => {
  const observations = parseInput(rawInput);

  let count = 0;
  for(const observation of observations) {
    for (const line of observation.output) {
      if ([2,3,4,7,8].includes(line.length)) {
        count += 1;
      }
    }
  }

  return count;
};

const part2 = (rawInput: string) => {
  const observations = parseInput(rawInput);
  let sum = 0;

  for(const observation of observations) {
    const mapping = deduceMapping(observation.signalPatterns)

    let output: number[] = []
    for (const line of observation.output) {
      if (mapping.has(line)) {
        output.push(mapping.get(line)!);
      } else {
        throw new Error(`No mapping for output value: ${line}`)
      }
    }

    sum += Number(output.join(''))
  }
  
  return sum;
};

const deduceMapping = (signalPatterns: string[]): Map<string, number> => {
  const mapping = new Map<string, number>()
  
  // Deduce

  return mapping;
}

run({
  part1: {
    tests: [
       { input: `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
       edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
       fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
       fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
       aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
       fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
       dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf |  cefg dcbef fcge gbcadfe
       bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
       egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
       gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`, 
       expected: 26 },
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
  //onlyTests: true,
});
