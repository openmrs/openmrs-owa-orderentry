import sessionReducer from '../../app/js/reducers/sessionReducer';

const currentSession = mockData.currentSession;

describe('Session Reducer', () => {
  describe('SET_CURRENT_SESSION', () => {
    it('set the patient with provided data', () => {
      const initialState = {
        currentLocation: {}
      };

      const action = {
        type: 'SET_CURRENT_SESSION',
        currentSession:{
          user:{
            display:'New User'
          },
          sessionLocation:{
            display:'Laboratory'
          }
        },
      }
      const newState = sessionReducer(initialState, action);
      expect(newState.currentUser).toEqual(action.currentSession.user.display);
      expect(newState.currentLocation).toEqual(action.currentSession.sessionLocation);
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
