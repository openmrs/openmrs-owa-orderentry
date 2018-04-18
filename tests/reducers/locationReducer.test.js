import locationReducer from '../../app/js/reducers/locationReducer';

const locationTags = mockData.defaultLocations.results;

describe('Location Reducer', () => {
  describe('SET_LOCATIONS', () => {
    it('set the app locations with provided data', () => {
      const initialState = {
        locationTags: []
      };

      const action = {
        type: 'SET_LOCATIONS',
        locationTags,
      };
      const newState = locationReducer(initialState, action);
      expect(newState.locationTags).toEqual(locationTags);
    });
  });

  it('set state to initial state when no new state is passed',
    () => {
      const action = {
        type: 'SET_CURRENT_USER',
        locationTags,
      };
      const newState = locationReducer(undefined, action);
      expect(newState).toEqual({
        locationTags: []
      });
    });
});
