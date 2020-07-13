import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, EMPTY } from 'rxjs';
import { concatMap, withLatestFrom, switchMap } from 'rxjs/operators';
import * as GameActions from '../actions';
import * as fromGame from '../reducers';
import * as GameSelectors from '../selectors';
import { Store, select } from '@ngrx/store';
import * as CoreActions from '../../../core/store';
import { DirectionEnum } from '../../models';

@Injectable()
export class GameEffects {
  move$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.move),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(GameSelectors.getBoardState)),
            this.store.pipe(select(GameSelectors.getPlayerState)),
            this.store.pipe(select(GameSelectors.getWumpusState))
          )
        )
      ),
      switchMap(([, board, player, wumpus]) => {
        const playerPosition = player.position;
        const cell = board[playerPosition.x][playerPosition.y];
        const dead = (cell.wumpus && wumpus.alive) || cell.pit;
        if (dead) {
          window.alert('You are dead!');
          return of(GameActions.resetGame());
        }
        return of(GameActions.checkPerceptions());
      })
    )
  );

  checkPerceptions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.checkPerceptions),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(GameSelectors.getBoardState)),
            this.store.pipe(select(GameSelectors.getPlayerState)),
            this.store.pipe(select(GameSelectors.getWumpusState))
          )
        )
      ),
      switchMap(([, board, player, wumpus]) => {
        const playerPosition = player.position;
        const cell = board[playerPosition.x][playerPosition.y];
        const dead = (cell.wumpus && wumpus.alive) || cell.pit;
        if (dead) {
          window.alert('You are dead!');
          return of(GameActions.resetGame());
        }
        if (cell.gold) {
          return of(GameActions.pickGold());
        }
        if (player.hasGold && cell.exit) {
          window.alert('You won!');
          return of(GameActions.resetGame());
        }
        return EMPTY;
      })
    )
  );

  shoot$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.shoot),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(GameSelectors.getPlayerState)),
            this.store.pipe(select(GameSelectors.getWumpusState))
          )
        )
      ),
      switchMap(([action, player, wumpus]) => {
        const playerPosition = player.position;
        let killed = wumpus.alive;
        switch (action.payload) {
          case DirectionEnum.LEFT:
            killed =
              killed &&
              wumpus.position.y === playerPosition.y &&
              wumpus.position.x < playerPosition.x;
            break;
          case DirectionEnum.RIGTH:
            killed =
              killed &&
              wumpus.position.y === playerPosition.y &&
              wumpus.position.x > playerPosition.x;
            break;
          case DirectionEnum.UP:
            killed =
              killed &&
              wumpus.position.x === playerPosition.x &&
              wumpus.position.y > playerPosition.y;
            break;

          default:
            killed =
              killed &&
              wumpus.position.x === playerPosition.x &&
              wumpus.position.y < playerPosition.y;
            break;
        }
        if (killed) {
          window.alert('You killed the Wumpus!');
          return of(GameActions.killWumpus());
        }
        return EMPTY;
      })
    )
  );

  resetGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.resetGame),
      switchMap(() => of(CoreActions.go({ path: ['config'] })))
    )
  );

  constructor(
    private actions$: Actions,
    private readonly store: Store<fromGame.GameState>
  ) {}
}
