import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlPadComponent } from './control-pad.component';
import { DirectionEnum } from '../../models';

describe('ControlPadComponent', () => {
  let component: ControlPadComponent;
  let fixture: ComponentFixture<ControlPadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ControlPadComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit on emitAction', () => {
    spyOn(component.action, 'emit');
    const payload = DirectionEnum.LEFT;
    component.emitAction(payload);
    expect(component.action.emit).toHaveBeenCalledWith(payload);
  });
});
