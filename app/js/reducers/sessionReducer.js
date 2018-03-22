import { SET_CURRENT_SESSION } from '../actions/actionTypes';
import mockData from '../../../__mocks__/mockData';

export default (state = mockData.defaultSession, action) => {
  switch (action.type) {
    case SET_CURRENT_SESSION:
      return {
        ...state,
        currentUser: action.currentSession.user ? action.currentSession.user.display : '',
        currentLocation: action.currentSession.sessionLocation,
      };
    default: return state;
  }
};
