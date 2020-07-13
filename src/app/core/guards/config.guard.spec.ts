import { TestBed } from '@angular/core/testing';
import { ConfigGuard } from './config.guard';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as fromCore from '../store';
import { Store } from '@ngrx/store';
describe('ConfigGuard', () => {
  let guard: ConfigGuard;
  let store: MockStore<fromCore.CoreState>;
  let spy: jasmine.Spy;
  const action = fromCore.go({ path: ['config'] });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore<fromCore.CoreState>({
          initialState: undefined,
          selectors: [{ selector: fromCore.getConfigured, value: false }],
        }),
      ],
    });
    guard = TestBed.inject(ConfigGuard);
    store = TestBed.get(Store);
    spy = spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return false', () => {
    guard.canActivate().subscribe((val) => {
      expect(val).toBeFalse();
      expect(spy).toHaveBeenCalledWith(action);
    });
  });

  it('should return true', () => {
    store.overrideSelector(fromCore.getConfigured, true);
    store.refreshState();
    guard.canActivate().subscribe((val) => {
      expect(val).toBeTrue();
      expect(spy).not.toHaveBeenCalledWith(action);
    });
  });
});
