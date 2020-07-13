import { Observable, of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import * as CoreActions from '../actions';
import { RouterEffects } from './router.effects';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('RouterEffects', () => {
  let actions$: Observable<any>;
  let effects: RouterEffects;
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        RouterEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
        { provide: Location, useValue: {} },
      ],
    });
    effects = TestBed.inject(RouterEffects);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('navigate$', () => {
    actions$ = of(
      CoreActions.go({
        path: ['game'],
      })
    );
    spyOn(router, 'navigate');
    effects.navigate$.subscribe();
    expect(router.navigate).toHaveBeenCalledWith(
      ['game'],
      Object({ queryParams: undefined })
    );
  });
});
