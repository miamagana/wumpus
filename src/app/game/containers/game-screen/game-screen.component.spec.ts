import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GameScreenComponent } from './game-screen.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as fromGame from '../../store';
import { Store } from '@ngrx/store';
import { DirectionEnum } from '../../models';

describe('GameScreenComponent', () => {
  let component: GameScreenComponent;
  let fixture: ComponentFixture<GameScreenComponent>;
  let store: MockStore<fromGame.GameState>;
  let spy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameScreenComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: fromGame.getGameState, value: {} },
            { selector: fromGame.getArrows, value: 0 },
            { selector: fromGame.getPlayerState, value: {} },
            { selector: fromGame.getWumpusState, value: {} },
          ],
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameScreenComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spy = spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should dispatch on ', () => {
    it('ngOnInit', () => {
      const init = fromGame.initGame();
      const check = fromGame.checkPerceptions();
      component.ngOnInit();
      expect(spy).toHaveBeenCalledWith(init);
      expect(spy).toHaveBeenCalledWith(check);
    });

    it('move', () => {
      const payload = DirectionEnum.LEFT;
      const action = fromGame.move({ payload });
      component.move(payload);
      expect(spy).toHaveBeenCalledWith(action);
    });

    it('shoot', () => {
      const payload = DirectionEnum.LEFT;
      const action = fromGame.shoot({ payload });
      component.shoot(payload);
      expect(spy).toHaveBeenCalledWith(action);
    });
  });
});
