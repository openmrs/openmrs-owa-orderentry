import { SET_NOTE } from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.defaultNote.results, action) => {
  switch (action.type) {
    case SET_NOTE:
      return {
        ...state,
        note: action.note,
      };
    default: return state;
  }
};
