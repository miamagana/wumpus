import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-game-output',
  templateUrl: './game-output.component.html',
  styleUrls: ['./game-output.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameOutputComponent {
  @Input() perceptions: string[];
  constructor() {}
}
