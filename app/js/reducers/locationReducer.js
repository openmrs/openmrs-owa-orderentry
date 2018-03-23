import { SET_LOCATIONS } from '../actions/actionTypes';
import mockData from '../../../__mocks__/mockData';

export default (state = mockData.defaultLocations.results, action) => {
  switch (action.type) {
    case SET_LOCATIONS:
      return {
        ...state,
        locationTags: action.locationTags,
      };
    default: return state;
  }
};
