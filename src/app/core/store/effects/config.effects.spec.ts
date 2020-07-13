import { Observable, of } from 'rxjs';
import { ConfigEffects } from './config.effects';
import { provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';
import { gameConfig } from '../../config';
import { provideMockActions } from '@ngrx/effects/testing';
import * as CoreActions from '../actions';

describe('ConfigEffects', () => {
  let actions$: Observable<any>;
  let effects: ConfigEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfigEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.inject(ConfigEffects);
  });

  it('configGame$', () => {
    actions$ = of(
      CoreActions.configGame({
        payload: { arrows: 5, boardLength: 5, pits: 5 },
      })
    );
    const expected = CoreActions.go({ path: ['game'] });
    effects.configGame$.subscribe((action) => {
      expect(action).toEqual(expected);
      expect(gameConfig.arrows).toEqual(5);
      expect(gameConfig.boardLength).toEqual(5);
      expect(gameConfig.pits).toEqual(5);
    });
  });
});
