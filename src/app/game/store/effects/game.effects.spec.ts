import { Observable, of, EMPTY } from 'rxjs';
import { GameEffects } from './game.effects';
import { provideMockStore, MockSelector, MockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import * as GameActions from '../actions';
import * as GameSelectors from '../selectors';
import * as fromGame from '../reducers';
import { generateGameBoard } from '../../utils';
import { gameConfig } from '../../../core/config';
import { DirectionEnum } from '../../models';
import { Store } from '@ngrx/store';

describe('GameEffects', () => {
  let actions$: Observable<any>;
  let effects: GameEffects;
  let store: MockStore<fromGame.GameState>;
  let spy: jasmine.Spy;
  const { board, wumpus } = generateGameBoard();
  const playerInitial = {
    position: { x: 0, y: 0 },
    perceptions: [],
    arrows: gameConfig.arrows,
    hasGold: false,
    wallHit: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameEffects,
        provideMockStore({
          selectors: [
            { selector: GameSelectors.getBoardState, value: board },
            {
              selector: GameSelectors.getPlayerState,
              value: playerInitial,
            },
            { selector: GameSelectors.getWumpusState, value: wumpus },
          ],
        }),
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.inject(GameEffects);
    store = TestBed.get(Store);
    spy = spyOn(window, 'alert');
  });

  afterEach(() => {
    spy.calls.reset();
  });

  describe('move$', () => {
    it('dead by wumpus', () => {
      const expected = GameActions.resetGame();
      const newBoard = board;
      newBoard[0][0] = { wumpus: true };
      store.overrideSelector(GameSelectors.getBoardState, newBoard);
      store.refreshState();
      actions$ = of(GameActions.move({ payload: DirectionEnum.LEFT }));
      effects.move$.subscribe((action) => {
        expect(action).toEqual(expected);
        expect(spy).toHaveBeenCalled();
      });
    });
    it('dead by pit', () => {
      const expected = GameActions.resetGame();
      const newBoard = board;
      newBoard[0][0] = { pit: true };
      store.overrideSelector(GameSelectors.getBoardState, newBoard);
      store.refreshState();
      actions$ = of(GameActions.move({ payload: DirectionEnum.LEFT }));
      effects.move$.subscribe((action) => {
        expect(action).toEqual(expected);
        expect(spy).toHaveBeenCalled();
      });
    });
    it('checkPerceptions', () => {
      const expected = GameActions.checkPerceptions();
      const newBoard = board;
      newBoard[0][0] = { exit: true };
      store.overrideSelector(GameSelectors.getBoardState, newBoard);
      store.refreshState();
      actions$ = of(
        GameActions.move({
          payload: DirectionEnum.LEFT,
        })
      );
      effects.move$.subscribe((action) => {
        expect(action).toEqual(expected);
        expect(spy).not.toHaveBeenCalled();
      });
    });
  });

  describe('checkPerceptions$', () => {
    it('pick gold', () => {
      const expected = GameActions.pickGold();
      const newBoard = board;
      newBoard[0][0] = { gold: true };
      store.overrideSelector(GameSelectors.getBoardState, newBoard);
      store.refreshState();
      actions$ = of(GameActions.checkPerceptions());
      effects.checkPerceptions$.subscribe((action) => {
        expect(action).toEqual(expected);
        expect(spy).not.toHaveBeenCalled();
      });
    });
    it('win', () => {
      const expected = GameActions.resetGame();
      const newBoard = board;
      newBoard[0][0] = { exit: true };
      store.overrideSelector(GameSelectors.getBoardState, newBoard);
      store.overrideSelector(GameSelectors.getPlayerState, {
        ...playerInitial,
        hasGold: true,
      });
      store.refreshState();
      actions$ = of(GameActions.checkPerceptions());
      effects.checkPerceptions$.subscribe((action) => {
        expect(action).toEqual(expected);
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
