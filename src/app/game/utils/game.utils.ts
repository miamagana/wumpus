import { ICoordinates, IPlayerState } from '../models';
import { gameConfig } from '../../core/config';
import { IGameState } from '../models/game';
import { CellStatusEnum } from '../models/game.models';

export const getRandomPosition = (board: CellStatusEnum[][]): ICoordinates => {
  const boardLength = gameConfig.boardLength;
  let x = Math.floor(Math.random() * boardLength);
  let y = Math.floor(Math.random() * boardLength);
  // Check if the position is available
  while (board[x][y] !== CellStatusEnum.EMPTY) {
    x = Math.floor(Math.random() * boardLength);
    y = Math.floor(Math.random() * boardLength);
  }
  return { x, y };
};

export const isWithinBounds = (x: number): boolean =>
  x >= 0 && x < gameConfig.boardLength;

export const changeAdjacentCells = (
  board: CellStatusEnum[][],
  status: CellStatusEnum,
  startY: number,
  startX: number
): void => {
  let targetY = startY + 1;
  let targetX = startX;
  // Check right cell
  if (isWithinBounds(targetY) && checkAvailableCell(board, targetY, targetX)) {
    board[targetY][targetX] = status;
  }
  // Check right-upper cell
  targetX = startX + 1;
  if (
    isWithinBounds(targetY) &&
    isWithinBounds(targetX) &&
    checkAvailableCell(board, targetY, targetX)
  ) {
    board[targetY][targetX] = status;
  }
  // Check right-lower cell
  targetX = startX - 1;
  if (
    isWithinBounds(targetY) &&
    isWithinBounds(targetX) &&
    checkAvailableCell(board, targetY, targetX)
  ) {
    board[targetY][targetX] = status;
  }
  // Check left cell
  targetX = startX;
  targetY = startY - 1;
  if (isWithinBounds(targetY) && checkAvailableCell(board, targetY, targetX)) {
    board[targetY][targetX] = status;
  }
  // Check left-upper cell
  targetX = startX + 1;
  if (
    isWithinBounds(targetY) &&
    isWithinBounds(targetX) &&
    checkAvailableCell(board, targetY, targetX)
  ) {
    board[targetY][targetX] = status;
  }
  // Check left-lower cell
  targetX = startX - 1;
  if (
    isWithinBounds(targetY) &&
    isWithinBounds(targetX) &&
    checkAvailableCell(board, targetY, targetX)
  ) {
    board[targetY][targetX] = status;
  }
  // Check upper cell
  targetX = startX + 1;
  targetY = startY;
  if (isWithinBounds(targetX) && checkAvailableCell(board, targetY, targetX)) {
    board[targetY][targetX] = status;
  }
  // Check lower cell
  targetX = startX - 1;
  if (isWithinBounds(targetX) && checkAvailableCell(board, targetY, targetX)) {
    board[targetY][targetX] = status;
  }
};

export const checkAvailableCell = (
  board: CellStatusEnum[][],
  x: number,
  y: number
): boolean => board[x][y] === 'EMPTY';

export const generateGameBoard = (): Partial<IGameState> => {
  const length = gameConfig.boardLength;
  const board = [];
  const row = [...Array(length).fill(CellStatusEnum.EMPTY)];
  for (let i = 0; i < length; i++) {
    board[i] = [...row];
  }
  board.length = length;
  board[0][0] = CellStatusEnum.EXIT;
  const wumpus: ICoordinates = getRandomPosition(board);
  board[wumpus.x][wumpus.y] = CellStatusEnum.WUMPUS;
  changeAdjacentCells(board, CellStatusEnum.STINKY, wumpus.x, wumpus.y);
  const gold: ICoordinates = getRandomPosition(board);
  board[gold.x][gold.y] = CellStatusEnum.GOLD;
  console.log(board);
  return {
    wumpus,
    board,
  };
};
