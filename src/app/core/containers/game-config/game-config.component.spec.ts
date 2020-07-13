import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { GameConfigComponent } from './game-config.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as fromCore from '../../store';
import { Store } from '@ngrx/store';

describe('GameConfigComponent', () => {
  let component: GameConfigComponent;
  let fixture: ComponentFixture<GameConfigComponent>;
  let store: Store<fromCore.CoreState>;
  let spy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameConfigComponent],
      providers: [provideMockStore()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameConfigComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    spy = spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should dispatch an action on', () => {
    it('playGame', () => {
      const payload = { arrows: 0, pits: 1, boardLength: 5 };
      const action = fromCore.configGame({ payload });
      component.playGame(payload);
      expect(spy).toHaveBeenCalledWith(action);
    });
  });
});
