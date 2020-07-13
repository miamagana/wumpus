import { createAction, props } from '@ngrx/store';
import { DirectionEnum } from '../../models';

export const move = createAction(
  '[Player] Move',
  props<{ payload: DirectionEnum }>()
);
export const shoot = createAction(
  '[Player] Shoot',
  props<{ payload: DirectionEnum }>()
);
export const pickGold = createAction('[Player] Pick Gold');
export const killWumpus = createAction('[Player] Kill Wumpus');
export const exitCave = createAction('[Player] Exit Cave');
