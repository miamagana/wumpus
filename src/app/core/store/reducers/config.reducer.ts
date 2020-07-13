import { IConfig } from '../../models';
import { createReducer, Action, on } from '@ngrx/store';
import * as ConfigActions from '../actions/config.actions';
import * as fromGame from '../../../game/store';

export interface IConfigState extends IConfig {
  configured: boolean;
}

export const initialState: IConfigState = {
  configured: false,
  arrows: 0,
  pits: 1,
  boardLength: 4,
};

const configurationReducer = createReducer(
  initialState,
  on(ConfigActions.configGame, (state, action) => ({
    ...state,
    configured: true,
    ...action.payload,
  })),
  on(fromGame.resetGame, () => ({
    ...initialState,
  }))
);

export function configReducer(state: IConfigState | undefined, action: Action) {
  return configurationReducer(state, action);
}
