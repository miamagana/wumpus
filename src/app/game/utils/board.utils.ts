import { ICellStatus, ICoordinates, IGameState, IWumpus } from '../models';

import { gameConfig } from 'src/app/core/config';

export const getRandomPosition = (
  board: ICellStatus[][],
  startIn: number = 0
): ICoordinates => {
  const boardLength = gameConfig.boardLength - 1;
  let x = getRndInteger(startIn, boardLength);
  let y = getRndInteger(startIn, boardLength);
  // Check if the position is available
  while (!checkAvailableCell(board, x, y, true)) {
    x = getRndInteger(startIn, boardLength);
    y = getRndInteger(startIn, boardLength);
  }
  return { x, y };
};

export function getRndInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const isWithinBounds = (x: number): boolean =>
  x >= 0 && x < gameConfig.boardLength;

export const changeAdjacentCells = (
  board: ICellStatus[][],
  status: ICellStatus,
  startY: number,
  startX: number
): void => {
  let targetY = startY + 1;
  let targetX = startX;
  // Check right cell
  if (isWithinBounds(targetY) && checkAvailableCell(board, targetY, targetX)) {
    board[targetY][targetX] = { ...board[targetY][targetX], ...status };
  }
  // Check right-upper cell
  targetX = startX + 1;
  if (
    isWithinBounds(targetY) &&
    isWithinBounds(targetX) &&
    checkAvailableCell(board, targetY, targetX)
  ) {
    board[targetY][targetX] = { ...board[targetY][targetX], ...status };
  }
  // Check right-lower cell
  targetX = startX - 1;
  if (
    isWithinBounds(targetY) &&
    isWithinBounds(targetX) &&
    checkAvailableCell(board, targetY, targetX)
  ) {
    board[targetY][targetX] = { ...board[targetY][targetX], ...status };
  }
  // Check left cell
  targetX = startX;
  targetY = startY - 1;
  if (isWithinBounds(targetY) && checkAvailableCell(board, targetY, targetX)) {
    board[targetY][targetX] = { ...board[targetY][targetX], ...status };
  }
  // Check left-upper cell
  targetX = startX + 1;
  if (
    isWithinBounds(targetY) &&
    isWithinBounds(targetX) &&
    checkAvailableCell(board, targetY, targetX)
  ) {
    board[targetY][targetX] = { ...board[targetY][targetX], ...status };
  }
  // Check left-lower cell
  targetX = startX - 1;
  if (
    isWithinBounds(targetY) &&
    isWithinBounds(targetX) &&
    checkAvailableCell(board, targetY, targetX)
  ) {
    board[targetY][targetX] = { ...board[targetY][targetX], ...status };
  }
  // Check upper cell
  targetX = startX + 1;
  targetY = startY;
  if (isWithinBounds(targetX) && checkAvailableCell(board, targetY, targetX)) {
    board[targetY][targetX] = { ...board[targetY][targetX], ...status };
  }
  // Check lower cell
  targetX = startX - 1;
  if (isWithinBounds(targetX) && checkAvailableCell(board, targetY, targetX)) {
    board[targetY][targetX] = { ...board[targetY][targetX], ...status };
  }
};

export function checkAvailableCell(
  board: ICellStatus[][],
  x: number,
  y: number,
  strict?: boolean
): boolean {
  const cell = board[x][y];
  if (!strict) {
    return !cell.wumpus && !cell.pit;
  } else {
    return !cell.exit && !cell.gold && !cell.wumpus && !cell.pit;
  }
}

export const generateGameBoard = (): {
  wumpus: IWumpus;
  board: ICellStatus[][];
} => {
  const length = gameConfig.boardLength;
  const board = [];
  const row = [...Array(length).fill({})];
  for (let i = 0; i < length; i++) {
    board[i] = [...row];
  }
  board.length = length;
  board[0][0] = {
    exit: true,
  };
  const wumpus: IWumpus = {
    position: getRandomPosition(board, Math.floor((length - 1) / 2)),
    alive: true,
  };
  const gold: ICoordinates = getRandomPosition(
    board,
    Math.floor((length - 1) / 2)
  );
  board[gold.x][gold.y] = {
    gold: true,
  };
  board[wumpus.position.x][wumpus.position.y] = {
    wumpus: true,
  };
  changeAdjacentCells(
    board,
    {
      stinky: true,
    },
    wumpus.position.x,
    wumpus.position.y
  );
  const pits = gameConfig.pits;
  for (let i = 0; i < pits; i++) {
    const pitPosition: ICoordinates = getRandomPosition(board);
    board[pitPosition.x][pitPosition.y] = {
      pit: true,
    };
    changeAdjacentCells(
      board,
      {
        breeze: true,
      },
      pitPosition.x,
      pitPosition.y
    );
  }
  return {
    wumpus,
    board,
  };
};
