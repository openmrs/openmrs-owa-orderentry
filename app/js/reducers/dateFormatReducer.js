import {
  GET_DATE_SUCCESS,
  GET_DATE_FAILURE,
} from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.dateFormatReducer, action) => {
  switch (action.type) {
    case GET_DATE_SUCCESS:
      return {
        ...state,
        dateFormat: action.dateFormat,
      };
    case GET_DATE_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default: return state;
  }
};
