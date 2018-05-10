import { SET_LOCATIONS } from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.defaultLocations.results, action) => {
  switch (action.type) {
    case SET_LOCATIONS:
      return {
        ...state,
        locationTags: action.locationTags,
      };
    default: return state;
  }
};
