import { gameReducer, initialState } from './game.reducer';
import * as GameActions from '../actions';
import { DirectionEnum, IGameState, IPlayerState } from '../../models';
import { generateGameBoard } from '../../utils';
import { gameConfig } from 'src/app/core/config';

describe('gameReducer should change state on', () => {
  const { wumpus, board } = generateGameBoard();
  const player: IPlayerState = {
    position: { x: 0, y: 0 },
    perceptions: [],
    arrows: gameConfig.arrows,
    hasGold: false,
    wallHit: false,
  };
  const initializedState: IGameState = { wumpus, board, player };
  it('initGame', () => {
    const action = GameActions.initGame();
    const state = gameReducer(initialState, action);
    expect(state.board).toBeDefined();
    expect(state.wumpus).toBeDefined();
    expect(state.player).toBeDefined();
  });

  describe('move', () => {
    it('LEFT', () => {
      const action = GameActions.move({ payload: DirectionEnum.LEFT });
      const state = gameReducer(initializedState, action);
      expect(state.player.wallHit).toBeTrue();
    });
    it('RIGHT', () => {
      const action = GameActions.move({ payload: DirectionEnum.RIGTH });
      const state = gameReducer(initializedState, action);
      expect(state.player.wallHit).toBeFalse();
    });
    it('DOWN', () => {
      const action = GameActions.move({ payload: DirectionEnum.DOWN });
      const state = gameReducer(initializedState, action);
      expect(state.player.wallHit).toBeTrue();
    });
    it('UP', () => {
      const action = GameActions.move({ payload: DirectionEnum.RIGTH });
      const state = gameReducer(initializedState, action);
      expect(state.player.wallHit).toBeFalse();
    });
  });

  describe('checkPerceptions', () => {
    it('hit', () => {
      const action = GameActions.checkPerceptions();
      const state = gameReducer(
        {
          ...initializedState,
          player: { ...initializedState.player, wallHit: true },
        },
        action
      );
      expect(state.player.perceptions.includes('You hit a wall!')).toBeTrue();
    });
    it('no hit', () => {
      const action = GameActions.checkPerceptions();
      const state = gameReducer(initializedState, action);
      expect(state.player.perceptions.includes('You hit a wall!')).toBeFalse();
    });
  });
  it('pickGold', () => {
    const action = GameActions.pickGold();
    const state = gameReducer(initializedState, action);
    expect(state.player.hasGold).toBeTrue();
  });
  it('shoot', () => {
    const arrows = initializedState.player.arrows - 1;
    const action = GameActions.shoot({ payload: DirectionEnum.DOWN });
    const state = gameReducer(initializedState, action);
    expect(state.player.arrows).toEqual(arrows);
  });
  it('resetGame', () => {
    const action = GameActions.resetGame();
    const state = gameReducer(
      {
        ...initializedState,
        player: { ...initializedState.player, wallHit: true },
      },
      action
    );
    expect(state).toEqual(initialState);
  });
});
