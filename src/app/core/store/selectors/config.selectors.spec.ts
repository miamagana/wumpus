import * as ConfigSelectors from './config.selectors';
import * as configReducer from '../reducers/config.reducer';

describe('ConfigSelectors', () => {
  it('getConfigState should return default config state', () => {
    expect(
      ConfigSelectors.getConfigState.projector({
        config: { ...configReducer.initialState },
      })
    ).toEqual(configReducer.initialState);
  });

  describe('getConfigured', () => {
    it('should be false', () => {
      expect(
        ConfigSelectors.getConfigured.projector({
          ...configReducer.initialState,
        })
      ).toBeFalse();
    });
    it('should be true', () => {
      expect(
        ConfigSelectors.getConfigured.projector({
          ...configReducer.initialState,
          configured: true,
        })
      ).toBeTrue();
    });
  });
});
