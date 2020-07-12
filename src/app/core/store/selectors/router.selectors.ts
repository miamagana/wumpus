import { createSelector } from '@ngrx/store';
import { getCoreState } from '../selectors/config.selectors';

export const getRouterState = createSelector(
  getCoreState,
  (state) => state.router
);
