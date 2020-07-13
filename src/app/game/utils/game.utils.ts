import { PerceptionEnum, PerceptionTextEnum } from '../models';
import { ICellStatus } from '../models';

export const getPerceptionText = (key: PerceptionEnum): string => {
  switch (key) {
    case PerceptionEnum.STINKY:
      return PerceptionTextEnum.stinky;

    case PerceptionEnum.GOLD:
      return PerceptionTextEnum.gold;

    case PerceptionEnum.BREEZE:
      return PerceptionTextEnum.breeze;

    default:
      break;
  }
};

export const getPositionPerceptions = (
  board: ICellStatus[][],
  x: number,
  y: number
): string[] => {
  const result = [];
  const cell = board[x][y];
  const perceptionKeys = ['gold', 'stinky', 'breeze'];
  Object.keys(cell)
    .filter((key) => !!cell[key] && perceptionKeys.includes(key))
    .forEach((filteredKey: string) => {
      const text = getPerceptionText(PerceptionEnum[filteredKey.toUpperCase()]);
      result.push(text);
    });
  return result;
};
