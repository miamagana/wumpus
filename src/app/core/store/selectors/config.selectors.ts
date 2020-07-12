import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCore from '../reducers';

export const getCoreState = createFeatureSelector<fromCore.CoreState>('core');

export const getConfigState = createSelector(
  getCoreState,
  (state) => state.config
);

export const getConfigured = createSelector(
  getConfigState,
  (state) => state.configured
);
