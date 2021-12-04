import run from "aocrunner";

type Data = {
  bingoNumbers: number[];
  boards: Boards;
};

type Boards = Array<Board>;
type Board = Array<Row>;
type Row = Array<Tile>;
type Tile = {
  number: number;
  marked: boolean;
};

const parseInput = (rawInput: string) =>
  rawInput
    .split(/\n/)
    .filter(Boolean)
    .reduce(
      (data: Data, row: string, index: number) => {
        if (index === 0) {
          data.bingoNumbers = row.split(",").map(Number);
        } else {
          const tiles: Row = row
            .split(/\s+/g)
            .filter((a) => a.trim().length > 0)
            .map((a) => ({ number: Number(a), marked: false }));

          if (index % 5 === 1) {
            data.boards.push([tiles]);
          } else {
            data.boards.at(-1)?.push(tiles);
          }
        }

        return data;
      },
      { bingoNumbers: [], boards: [[]] },
    );

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  for (const numberDrawn of input.bingoNumbers) {
    const winningBoards = markTiles(numberDrawn, input);

    if (winningBoards.length && winningBoards.at(0)) {
      return calculateScore(winningBoards[0], numberDrawn);
    }
  }
};

const markTiles = (numberDrawn: number, input: Data): Boards => {
  const boards: Boards = [];
  for (let board of input.boards) {
    for (let row of board) {
      for (let tile of row) {
        if (tile.number === numberDrawn) {
          if (!tile.marked) {
            tile.marked = true;
            const winningBoard = checkForBingo(board);
            if (winningBoard) {
              boards.push(winningBoard);
            }
          }
        }
      }
    }
  }

  return boards;
};

const checkForBingo = (board: Board): Board | undefined => {
  for (let row of board) {
    let winningRow = row.every((tile) => tile.marked);
    if (winningRow) {
      return board;
    }
  }

  for (let i = 0; i < 5; i++) {
    const winningColumn =
      board.at(0)?.at(i)?.marked &&
      board.at(1)?.at(i)?.marked &&
      board.at(2)?.at(i)?.marked &&
      board.at(3)?.at(i)?.marked &&
      board.at(4)?.at(i)?.marked;

    if (winningColumn) {
      return board;
    }
  }
};

const calculateScore = (winningBoard: Board, winningNumber: number) => {
  return (
    winningNumber *
    winningBoard.reduce(
      (boardSum, row) =>
        boardSum +
        row
          .filter((tile) => !tile.marked)
          .reduce((rowSum, filteredTile) => rowSum + filteredTile.number, 0),

      0,
    )
  );
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const winningBoards: Set<Board> = new Set();
  for (const numberDrawn of input.bingoNumbers) {
    for (let board of markTiles(numberDrawn, input)) {
      winningBoards.add(board);
    }

    if (winningBoards.size === input.boards.length - 1) {
      return calculateScore(
        [...winningBoards][winningBoards.size - 1],
        numberDrawn,
      );
    }
  }
};

run({
  part1: {
    tests: [
      // {input: ``, expected: ""},
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
