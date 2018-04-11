import { LOAD_PAST_ORDERS_SUCCESS, LOAD_PAST_ORDERS_FAILURE, LOADING } from '../actions/actionTypes';
import mockData from '../../../__mocks__/mockData';

export default (state = mockData.pastOrders, action) => {
  switch (action.type) {
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
    case LOADING:
      return {
        ...state,
        loading: action.status,
      };
    default: return state;
  }
};
