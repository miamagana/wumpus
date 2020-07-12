import * as fromRouter from '@ngrx/router-store';
import * as fromConfig from './config.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { RouterStateUrl } from './router.reducer';

export interface CoreState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  config: fromConfig.IConfigState;
}

export const reducers: ActionReducerMap<CoreState> = {
  router: fromRouter.routerReducer,
  config: fromConfig.configReducer,
};
