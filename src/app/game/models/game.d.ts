import { IPlayerState, ICoordinates } from './player';
import { CellStatusEnum } from './game.models';

export interface IGameState {
  player: IPlayerState;
  wumpus: ICoordinates;
  board: CellStatusEnum[][];
}
