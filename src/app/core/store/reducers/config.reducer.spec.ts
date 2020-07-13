import { configReducer, initialState, IConfigState } from './config.reducer';
import * as ConfigActions from '../actions/config.actions';
import * as GameActions from '../../../game/store';

describe('configReducer should change state on', () => {
  it('configGame', () => {
    const expected: IConfigState = {
      ...initialState,
      configured: true,
      arrows: 1,
      boardLength: 1,
      pits: 1,
    };
    const action = ConfigActions.configGame({
      payload: { arrows: 1, boardLength: 1, pits: 1 },
    });
    expect(configReducer(initialState, action)).toEqual(expected);
  });

  it('resetGame', () => {
    const action = GameActions.resetGame();
    const expected = { ...initialState };
    const state: IConfigState = { ...initialState, pits: 1000 };
    expect(configReducer(state, action)).toEqual(expected);
  });
});
