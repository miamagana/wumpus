import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-game-controls',
  templateUrl: './game-controls.component.html',
  styleUrls: ['./game-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameControlsComponent {
  constructor() {}
}
