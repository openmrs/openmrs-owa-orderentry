import {
  FETCH_ACTIVE_ORDER_SUCCESS,
  FETCH_ACTIVE_ORDER_ERROR,
  FETCH_ACTIVE_ORDER_LOADING,
} from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.defaultpatientActiveOrder, action) => {
  switch (action.type) {
    case FETCH_ACTIVE_ORDER_LOADING:
      return {
        ...state,
        loading: action.status,
      };
    case FETCH_ACTIVE_ORDER_SUCCESS:
      return {
        ...state,
        activeOrders: action.activeOrders,
      };
    case FETCH_ACTIVE_ORDER_ERROR:
      return {
        ...state,
        error: action.error,
        activeOrders: [],
      };
    default:
      return state;
  }
};
