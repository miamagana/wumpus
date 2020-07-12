import { IConfig } from '../../models';
import { createAction, props } from '@ngrx/store';

export const configGame = createAction(
  '[Config] Config Game',
  props<{
    payload: IConfig;
  }>()
);
