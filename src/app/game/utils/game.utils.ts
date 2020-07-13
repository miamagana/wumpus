import { ICoordinates } from '../models';
import { gameConfig } from '../../core/config';
import { IGameState, ICellStatus } from '../models';
import { gameBoard } from '../store/reducers/game.reducer';

export const getRandomPosition = (
  board: ICellStatus[][],
  limit: number = 0
): ICoordinates => {
  const boardLength = gameConfig.boardLength - 1;
  let x = Math.floor(Math.random() * boardLength) + limit;
  let y = Math.floor(Math.random() * boardLength) + limit;
  // Check if the position is available
  while (!checkAvailableCell(board, x, y)) {
    x = Math.floor(Math.random() * boardLength) + limit;
    y = Math.floor(Math.random() * boardLength) + limit;
  }
  return { x, y };
};

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
    board[targetY][targetX] = { ...status, ...board[targetY][targetX] };
  }
  // Check right-upper cell
  targetX = startX + 1;
  if (
    isWithinBounds(targetY) &&
    isWithinBounds(targetX) &&
    checkAvailableCell(board, targetY, targetX)
  ) {
    board[targetY][targetX] = { ...status, ...board[targetY][targetX] };
  }
  // Check right-lower cell
  targetX = startX - 1;
  if (
    isWithinBounds(targetY) &&
    isWithinBounds(targetX) &&
    checkAvailableCell(board, targetY, targetX)
  ) {
    board[targetY][targetX] = { ...status, ...board[targetY][targetX] };
  }
  // Check left cell
  targetX = startX;
  targetY = startY - 1;
  if (isWithinBounds(targetY) && checkAvailableCell(board, targetY, targetX)) {
    board[targetY][targetX] = { ...status, ...board[targetY][targetX] };
  }
  // Check left-upper cell
  targetX = startX + 1;
  if (
    isWithinBounds(targetY) &&
    isWithinBounds(targetX) &&
    checkAvailableCell(board, targetY, targetX)
  ) {
    board[targetY][targetX] = { ...status, ...board[targetY][targetX] };
  }
  // Check left-lower cell
  targetX = startX - 1;
  if (
    isWithinBounds(targetY) &&
    isWithinBounds(targetX) &&
    checkAvailableCell(board, targetY, targetX)
  ) {
    board[targetY][targetX] = { ...status, ...board[targetY][targetX] };
  }
  // Check upper cell
  targetX = startX + 1;
  targetY = startY;
  if (isWithinBounds(targetX) && checkAvailableCell(board, targetY, targetX)) {
    board[targetY][targetX] = { ...status, ...board[targetY][targetX] };
  }
  // Check lower cell
  targetX = startX - 1;
  if (isWithinBounds(targetX) && checkAvailableCell(board, targetY, targetX)) {
    board[targetY][targetX] = { ...status, ...board[targetY][targetX] };
  }
};

export function checkAvailableCell(
  board: ICellStatus[][],
  x: number,
  y: number
): boolean {
  const cell = board[x][y];
  return !cell.exit && !cell.gold && !cell.wumpus && !cell.pit;
}

export const generateGameBoard = (): Partial<IGameState> => {
  const length = gameConfig.boardLength;
  const board = [];
  const row = [...Array(length).fill({})];
  for (let i = 0; i < length; i++) {
    board[i] = [...row];
  }
  board.length = length;
  board[0][0] = { exit: true };
  const wumpus: ICoordinates = getRandomPosition(board);
  board[wumpus.x][wumpus.y] = { wumpus: true };
  changeAdjacentCells(board, { stinky: true }, wumpus.x, wumpus.y);
  // We don't want the gold to be next to the start Position
  const startFrom = Math.floor(length / 2);
  const gold: ICoordinates = getRandomPosition(board, startFrom);
  board[gold.x][gold.y] = { gold: true };
  console.log(board);
  return {
    wumpus,
    board,
  };
};
