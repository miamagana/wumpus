import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerInfoComponent {
  constructor() {}
}
