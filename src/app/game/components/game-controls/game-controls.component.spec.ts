import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GameControlsComponent } from './game-controls.component';
import { DirectionEnum } from '../../models';

describe('GameControlsComponent', () => {
  let component: GameControlsComponent;
  let fixture: ComponentFixture<GameControlsComponent>;
  const payload = DirectionEnum.LEFT;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameControlsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should emit on', () => {
    it('moveAction', () => {
      spyOn(component.move, 'emit');
      component.moveAction(payload);
      expect(component.move.emit).toHaveBeenCalledWith(payload);
    });

    it('shootAction', () => {
      spyOn(component.shoot, 'emit');
      component.shootAction(payload);
      expect(component.shoot.emit).toHaveBeenCalledWith(payload);
    });
  });
});
