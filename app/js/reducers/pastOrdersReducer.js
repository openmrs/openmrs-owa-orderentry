import {
  LOAD_PAST_ORDERS_SUCCESS,
  LOAD_PAST_ORDERS_FAILURE,
  LOADING,
  PAST_ORDERS_PAGE_COUNT,
  PAST_ORDERS_RESULT_COUNT,
  LOAD_PAST_ORDERS_LOADING,
} from '../actions/actionTypes';
import mockData from '../../../__mocks__/mockData';

export default (state = mockData.pastOrders, action) => {
  switch (action.type) {
    case LOAD_PAST_ORDERS_LOADING:
      return {
        ...state,
        loading: action.status,
      };
    case LOAD_PAST_ORDERS_SUCCESS:
      return {
        ...state,
        pastOrders: action.pastOrders,
      };
    case LOAD_PAST_ORDERS_FAILURE:
      return {
        ...state,
        error: action.error,
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
