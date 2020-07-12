import { NavigationExtras } from '@angular/router';
import { createAction, props, union } from '@ngrx/store';

export const go = createAction(
  '[Router] Go',
  props<{
    path: any[];
    query?: object;
    extras?: NavigationExtras;
  }>()
);

export const back = createAction('[Router] Back');
export const forward = createAction('[Router] Forward');

const all = union({ go, back, forward });
export type Actions = typeof all;
