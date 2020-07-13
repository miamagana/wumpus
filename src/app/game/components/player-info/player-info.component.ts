import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { IPlayerState } from '../../models';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerInfoComponent {
  @Input() info: IPlayerState;
  constructor() {}
}
