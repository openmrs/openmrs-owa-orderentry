import { SET_NOTE } from '../actions/actionTypes';
import mockData from '../../../__mocks__/mockData';

export default (state = mockData.defaultNote.results, action) => {
  switch (action.type) {
    case SET_NOTE:
      return {
        ...state,
        note: action.note,
      };
    default: return state;
  }
};
