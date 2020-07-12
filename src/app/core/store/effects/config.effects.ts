import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as CoreActions from '../actions';
import { gameConfig } from '../../config';

@Injectable()
export class ConfigEffects {
  constructor(private actions$: Actions) {}

  // In here we are overwriting the default configuration with the provided by the user.
  configGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActions.configGame),
      map(({ payload }) => {
        Object.keys(payload).forEach(
          (key: string) => (gameConfig[key] = payload[key])
        );
        return CoreActions.go({ path: ['game'] });
      })
    )
  );
}
