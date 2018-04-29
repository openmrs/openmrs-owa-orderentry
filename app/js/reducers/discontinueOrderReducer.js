import {
  DISCONTINUE_ORDER_FAILURE,
  DISCONTINUE_ORDER_SUCCESS,
  DISCONTINUE_ORDER,
} from '../actions/actionTypes';
import mockData from '../../../__mocks__/mockData';

const initialState = [
  mockData.defaultpatientActiveOrder,
  mockData.pastOrders,
  mockData.loading,
];

export default (state = initialState, action) => {
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
