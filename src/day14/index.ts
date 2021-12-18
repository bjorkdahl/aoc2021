import run from "aocrunner";

type Poly = {
  template: string;
  rules: { [key: string]: string };
};

const parseInput = (rawInput: string) =>
  rawInput.split(/\n\n/).reduce(
    (poly: Poly, rows: string, index: number) => {
      if (index === 0) {
        poly.template = rows;
      } else {
        poly.rules = rows
          .split(/\n/)
          .reduce((rules: { [key: string]: string }, row) => {
            const [pair, insert] = row.split(" -> ");
            rules[pair] = insert;
            return rules;
          }, {});
      }
      return poly;
    },
    {
      template: "",
      rules: {},
    },
  );

const part1 = (rawInput: string) => {
  const poly = parseInput(rawInput);

  for (let step = 0; step < 10; step++) {
    const copy: string[] = JSON.parse(JSON.stringify(poly.template.split("")));
    for (let p = 0; p < poly.template.length - 1; p++) {
      const pair = poly.template[p].concat(poly.template[p + 1]);
      copy.splice(p + p + 1, 0, poly.rules[pair]);
    }
    poly.template = copy.join("");
  }

  const quantities = getQuantities(poly.template.split(""));
  const [highest, lowest] = getExtremes(quantities);

  return highest - lowest;
};

const getQuantities = (template: string[]): { [key: string]: number } =>
  template.reduce((quantities: { [key: string]: number }, char) => {
    if (!quantities.hasOwnProperty(char)) {
      quantities[char] = 0;
    }
    quantities[char] += 1;
    return quantities;
  }, {});

const getExtremes = (quantities: { [key: string]: number }): [number, number] =>
  Object.values(quantities).reduce(
    (extremes: [number, number], record) => {
      if (record > extremes[0]) {
        extremes[0] = record;
      }

      if (record < extremes[1]) {
        extremes[1] = record;
      }

      return extremes;
    },
    [0, Infinity],
  );

const part2 = (rawInput: string) => {
  const poly = parseInput(rawInput);
  const counter: { [key: string]: number } = {};
  const steps = 40;

  for (const element of poly.template) {
    counter[element] = (counter[element] ?? 0) + 1;
  }

  for (let i = 0; i < poly.template.length; i++) {
    const pair = poly.template.slice(i, i + 2);

    let currentStep = { [pair]: 1 };

    for (let i = 0; i < steps; i++) {
      const nextLevel: Record<string, number> = {};
      for (const [pair, count] of Object.entries(currentStep)) {
        const insertion = poly.rules[pair];
        counter[insertion] = (counter[insertion] ?? 0) + count;
        const leftChild = `${pair[0]}${insertion}`;
        const rightChild = `${insertion}${pair[1]}`;
        nextLevel[leftChild] = (nextLevel[leftChild] ?? 0) + count;
        nextLevel[rightChild] = (nextLevel[rightChild] ?? 0) + count;
      }
      currentStep = nextLevel;
    }
  }

  const sorted = Object.values(counter).sort((a, b) => b - a);

  return sorted[0] - sorted[sorted.length - 1];
};

run({
  part1: {
    tests: [
      {
        input: `
        NNCB

        CH -> B
        HH -> N
        CB -> H
        NH -> C
        HB -> C
        HC -> B
        HN -> C
        NN -> C
        BH -> H
        NC -> B
        NB -> B
        BN -> B
        BB -> N
        BC -> B
        CC -> N
        CN -> C
        `,
        expected: 1588,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        NNCB

        CH -> B
        HH -> N
        CB -> H
        NH -> C
        HB -> C
        HC -> B
        HN -> C
        NN -> C
        BH -> H
        NC -> B
        NB -> B
        BN -> B
        BB -> N
        BC -> B
        CC -> N
        CN -> C
        `,
        expected: 2188189693529,
      },
    ],
    solution: part2,
  },
  onlyTests: false,
});
