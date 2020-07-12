import { createReducer, Action, on } from '@ngrx/store';
import * as PlayerActions from '../actions/player.actions';
import { IPlayerState } from '../../models';
import { IGameState } from '../../models/game';
import { generateGameBoard } from '../../utils/game.utils';

export const playerInitialState: IPlayerState = {
  position: {
    x: 0,
    y: 0,
  },
  hasGold: false,
  perceptions: [],
};

export const gameBoard = generateGameBoard();

export const initialState: IGameState = {
  player: { ...playerInitialState },
  ...gameBoard,
} as IGameState;

const playerGameReducer = createReducer(
  initialState,
  on(PlayerActions.move, (state, action) => {
    return { ...state };
  })
);

export function gameReducer(state: IGameState | undefined, action: Action) {
  return playerGameReducer(state, action);
}
