import {
  FETCH_ACTIVE_ORDER_SUCCESS,
  FETCH_ACTIVE_ORDER_ERROR,
  FETCH_ACTIVE_ORDER_LOADING,
  SET_ORDER_ACTION,
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
    case SET_ORDER_ACTION:
      return {
        ...state,
        activeOrders: state.activeOrders.map((order) => {
          if (action.action === 'EDIT' || action.action === 'DRAFT') {
            if (order.orderNumber === action.orderNumber) {
              return { ...order, status: action.action };
            } else if (order.status === 'EDIT') {
              return { ...order, status: 'NONE' };
            }
          } else if (action.action === 'DISCONTINUE') {
            if (order.orderNumber === action.orderNumber) {
              return { ...order, status: action.action };
            }
          } else if (action.action === 'DISCARD_ONE') {
            if (order.orderNumber === action.orderNumber) {
              return { ...order, status: action.action };
            }
          } else if (action.action === 'DISCARD_ALL') {
            if (order.status === 'EDIT') {
              return { ...order, status: 'EDIT' };
            }
            return { ...order, status: action.action };
          } else if (action.action === 'DISCARD_EDIT') {
            if (order.status === 'DISCONTINUE') {
              return { ...order, status: 'DISCONTINUE' };
            }
            return { ...order, status: action.action };
          }
          return order;
        }),
      };
    default:
      return state;
  }
};
