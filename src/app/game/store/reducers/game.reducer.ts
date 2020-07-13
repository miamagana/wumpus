import { createReducer, Action, on } from '@ngrx/store';
import * as GameActions from '../actions';
import { IGameState } from '../../models/game';
import {
  generateGameBoard,
  getPositionPerceptions,
  isWithinBounds,
} from '../../utils';
import { gameConfig } from '../../../core/config';
import { DirectionEnum, IPlayerState } from '../../models';

export const initialState: IGameState = {
  board: undefined,
  wumpus: undefined,
  player: undefined,
};

// tslint:disable:no-shadowed-variable
const playerGameReducer = createReducer(
  initialState,
  on(GameActions.initGame, (state) => {
    const { wumpus, board } = generateGameBoard();
    const player: IPlayerState = {
      position: { x: 0, y: 0 },
      perceptions: [],
      arrows: gameConfig.arrows,
      hasGold: false,
      wallHit: false,
    };
    return { ...state, wumpus, board, player };
  }),
  on(GameActions.move, (state, action) => {
    let targetX = state.player.position.x;
    let targetY = state.player.position.y;
    let wallHit = false;
    switch (action.payload) {
      case DirectionEnum.LEFT:
        targetX--;
        break;
      case DirectionEnum.RIGTH:
        targetX++;
        break;
      case DirectionEnum.UP:
        targetY++;
        break;

      default:
        targetY--;
        break;
    }
    if (!isWithinBounds(targetX)) {
      targetX = state.player.position.x;
      wallHit = true;
    }
    if (!isWithinBounds(targetY)) {
      targetY = state.player.position.y;
      wallHit = true;
    }
    return {
      ...state,
      player: {
        ...state.player,
        position: { x: targetX, y: targetY },
        wallHit,
      },
    };
  }),
  on(GameActions.checkPerceptions, (state) => {
    const perceptions = getPositionPerceptions(
      state.board,
      state.player.position.x,
      state.player.position.y
    );
    if (state.player.wallHit) {
      perceptions.push('You hit a wall!');
    }
    return {
      ...state,
      player: {
        ...state.player,
        wallHit: false,
        perceptions,
      },
    };
  }),
  on(GameActions.pickGold, (state) => {
    return { ...state, player: { ...state.player, hasGold: true } };
  }),
  on(GameActions.shoot, (state) => {
    const arrows = state.player.arrows - 1;
    return {
      ...state,
      player: { ...state.player, arrows },
    };
  }),
  on(GameActions.resetGame, () => {
    return { ...initialState };
  })
);

export function gameReducer(state: IGameState | undefined, action: Action) {
  return playerGameReducer(state, action);
}
