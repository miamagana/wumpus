import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigFormComponent } from './config-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ConfigFormComponent', () => {
  let component: ConfigFormComponent;
  let fixture: ComponentFixture<ConfigFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      declarations: [ConfigFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.configForm).toBeTruthy();
  });

  it('should emit', () => {
    spyOn(component.play, 'emit');
    component.submitForm();
    expect(component.play.emit).toHaveBeenCalledWith(
      component.configForm.getRawValue()
    );
  });

  it('should disable button if form invalid', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    component.configForm.patchValue({
      ['boardLength']: 0,
      ['arrows']: 1,
      ['pits']: 1,
    });
    fixture.detectChanges();
    const button = nativeElement.querySelector('button');
    expect(button.disabled).toBeTrue();
  });
});
