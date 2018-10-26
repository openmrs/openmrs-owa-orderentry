import {
  LOAD_PAST_ORDERS_SUCCESS,
  LOAD_PAST_ORDERS_FAILURE,
  PAST_ORDERS_PAGE_COUNT,
  PAST_ORDERS_RESULT_COUNT,
  LOAD_PAST_ORDERS_LOADING,
} from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.pastOrders, action) => {
  switch (action.type) {
    case LOAD_PAST_ORDERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOAD_PAST_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        pastOrders: action.pastOrders,
      };
    case LOAD_PAST_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PAST_ORDERS_PAGE_COUNT:
      return {
        ...state,
        pageCount: action.pageCount,
      };
    case PAST_ORDERS_RESULT_COUNT:
      return {
        ...state,
        pastOrdersResultCount: action.pastOrdersResultCount,
      };
    default: return state;
  }
};
