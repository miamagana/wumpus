import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import { DirectionEnum } from '../../models';

@Component({
  selector: 'app-control-pad',
  templateUrl: './control-pad.component.html',
  styleUrls: ['./control-pad.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlPadComponent {
  @Input() disable = false;
  @Output() action = new EventEmitter<DirectionEnum>();
  directionEnum = DirectionEnum;
  constructor() {}

  emitAction(event: DirectionEnum): void {
    this.action.emit(event);
  }
}
