import {
  FETCH_ACTIVE_ORDER_SUCCESS,
  FETCH_ACTIVE_ORDER_ERROR,
  LOADING,
} from '../actions/actionTypes';
import mockData from '../../../__mocks__/mockData';

export default (state = mockData.defaultpatientActiveOrder, action) => {
  switch (action.type) {
    case LOADING:
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
