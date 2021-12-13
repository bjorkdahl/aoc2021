import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split(/\n/).map((line) => line.split(""));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const openings = ["(", "[", "{", "<"];
  const closings = { ")": 3, "]": 57, "}": 1197, ">": 25137 };

  return input.reduce((highscore, line) => {
    const stack: string[] = [];
    for (const c of line) {
      if (openings.includes(c)) {
        stack.push(c);
      } else {
        const lastopening = stack.pop();
        switch (c) {
          case ")":
            if (lastopening !== "(") {
              return highscore + closings[c];
            }
            break;
          case "]":
            if (lastopening !== "[") {
              return highscore + closings[c];
            }
            break;
          case "}":
            if (lastopening !== "{") {
              return highscore + closings[c];
            }
            break;
          case ">":
            if (lastopening !== "<") {
              return highscore + closings[c];
            }
            break;
        }
      }
    }

    return highscore;
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const openings = ["(", "[", "{", "<"];
  const scores: number[] = [];
  const checkCorrupted: { [key: string]: (value: string) => boolean } = {
    ")": (last: string) => last !== "(",
    "]": (last: string) => last !== "[",
    "}": (last: string) => last !== "{",
    ">": (last: string) => last !== "<",
  };

  for (const line of input) {
    const stack: string[] = [];
    let corrupted = false;

    for (const c of line) {
      if (openings.includes(c)) {
        stack.push(c);
      } else {
        const lastopening = stack.pop()!;

        if (checkCorrupted[c](lastopening)) {
          corrupted = true;
          break;
        }
      }
    }

    if (!corrupted || stack.length === 0) {
      scores.push(countScore(stack));
    }
  }

  return scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)];
};

const scoreMap: { [key: string]: number } = {
  "(": 1,
  "[": 2,
  "{": 3,
  "<": 4,
};

const countScore = (stack: string[], score = 0): number => {
  while (stack.length > 0) {
    score = score * 5 + scoreMap[stack.pop()!];
  }
  return score;
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
      {
        input: `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`,
        expected: 288957,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
