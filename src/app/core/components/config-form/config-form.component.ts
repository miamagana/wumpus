import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { IConfig } from '../../models';

@Component({
  selector: 'app-config-form',
  templateUrl: './config-form.component.html',
  styleUrls: ['./config-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigFormComponent implements OnInit {
  configForm: FormGroup;
  @Output() play = new EventEmitter<IConfig>();

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.configForm = this.formBuilder.group({
      boardLength: new FormControl(4, [Validators.required, Validators.min(4)]),
      arrows: new FormControl(0, [Validators.required, Validators.min(0)]),
      pits: new FormControl(1, [Validators.required, Validators.min(1)]),
    });
  }

  submitForm(): void {
    this.play.emit(this.configForm.getRawValue());
  }
}
