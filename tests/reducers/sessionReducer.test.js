import expect from 'expect';
import sessionReducer from '../../app/js/reducers/sessionReducer';
import mockData from '../../__mocks__/mockData';

const currentSession = mockData.currentSession;

describe('Session Reducer', () => {
  describe('SET_CURRENT_SESSION', () => {
    it('set the patient with provided data', () => {
      const initialState = {
        currentLocation: {}
      };

      const action = {
        type: 'SET_CURRENT_SESSION',
        currentSession,
      };
      const newState = sessionReducer(initialState, action);
      expect(newState.currentUser).toEqual("");
      expect(newState.currentLocation).toEqual(currentSession.sessionLocation);
    });
  });

  it('set state to initial state when no new state is passed',
    () => {
      const action = {
        type: 'SET_CURRENT_SESSION',
        currentSession,
      };
      const newState = sessionReducer(undefined, action);
      expect(newState.currentUser).toEqual("");
      expect(newState.currentLocation).toEqual(currentSession.sessionLocation);
    });
});
