import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IConfig } from '../../models';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store';

@Component({
  selector: 'app-game-config',
  templateUrl: './game-config.component.html',
  styleUrls: ['./game-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameConfigComponent {
  constructor(private readonly store: Store<fromRoot.CoreState>) {}

  playGame(payload: IConfig): void {
    this.store.dispatch(fromRoot.configGame({ payload }));
  }
}
