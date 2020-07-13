import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import * as fromGame from '../../store';
import { Store, select } from '@ngrx/store';
import { DirectionEnum } from '../../models';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameScreenComponent implements OnInit {
  playerInfo$ = this.store.pipe(select(fromGame.getPlayerState));
  arrows$ = this.store.pipe(select(fromGame.getArrows));
  constructor(private readonly store: Store<fromGame.GameState>) {}

  ngOnInit(): void {
    this.store.dispatch(fromGame.initGame());
    this.store.dispatch(fromGame.checkPerceptions());
  }

  move(payload: DirectionEnum): void {
    this.store.dispatch(fromGame.move({ payload }));
  }

  shoot(payload: DirectionEnum): void {
    this.store.dispatch(fromGame.shoot({ payload }));
  }
}
