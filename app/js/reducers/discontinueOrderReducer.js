import {
  DISCONTINUE_ORDER_FAILURE,
  DISCONTINUE_ORDER_SUCCESS,
  DISCONTINUE_ORDER,
} from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.discontinueOrderReducer, action) => {
  switch (action.type) {
    case 'DISCONTINUE_ORDER_LOADING':
      return {
        ...state,
        loading: action.status,
      };
    case DISCONTINUE_ORDER_SUCCESS:
      return {
        ...state,
        success: true,
      };
    case DISCONTINUE_ORDER_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
