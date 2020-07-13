import * as fromGame from '../reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectGameState = createFeatureSelector<fromGame.GameState>(
  'game'
);

export const getGameState = createSelector(
  selectGameState,
  (state) => state.game
);

export const getPlayerState = createSelector(
  getGameState,
  (state) => state.player
);

export const getArrows = createSelector(
  getPlayerState,
  (state) => state?.arrows
);

export const getBoardState = createSelector(
  getGameState,
  (state) => state.board
);

export const getWumpusState = createSelector(
  getGameState,
  (state) => state.wumpus
);
