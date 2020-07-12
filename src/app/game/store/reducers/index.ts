import * as fromGame from './game.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { IGameState } from '../../models';

export interface GameState {
  game: IGameState;
}

export const reducers: ActionReducerMap<GameState> = {
  game: fromGame.gameReducer,
};
