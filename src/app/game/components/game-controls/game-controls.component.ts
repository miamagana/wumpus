import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { DirectionEnum } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-controls',
  templateUrl: './game-controls.component.html',
  styleUrls: ['./game-controls.component.scss'],
})
export class GameControlsComponent {
  @Input() arrows: number;
  @Output() move = new EventEmitter<DirectionEnum>();
  @Output() shoot = new EventEmitter<DirectionEnum>();
  constructor() {}

  moveAction(event: DirectionEnum): void {
    this.move.emit(event);
  }

  shootAction(event: DirectionEnum): void {
    this.shoot.emit(event);
  }
}
