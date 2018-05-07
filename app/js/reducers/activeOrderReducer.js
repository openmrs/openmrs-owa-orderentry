import {
  FETCH_ACTIVE_ORDER_SUCCESS,
  FETCH_ACTIVE_ORDER_ERROR,
  FETCH_ACTIVE_ORDER_LOADING,
} from '../actions/actionTypes';
import mockData from '../../../__mocks__/mockData';

export default (state = mockData.defaultpatientActiveOrder, action) => {
  switch (action.type) {
    case FETCH_ACTIVE_ORDER_LOADING:
      return {
        ...state,
        loading: action.status,
      };
    case FETCH_ACTIVE_ORDER_SUCCESS:
      return {
        ...state,
        activeOrders: action.results,
        pageCount: action.pageCount,
        showResultCount: action.showResultCount,
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
