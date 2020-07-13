import { IPlayerState, ICoordinates } from './player';

export interface IGameState {
  player: IPlayerState;
  wumpus: ICoordinates;
  board: ICellStatus[][];
}

export interface ICellStatus {
  wumpus?: boolean;
  stinky?: boolean;
  pit?: boolean;
  breeze?: boolean;
  gold?: boolean;
  exit?: boolean;
}
