import {
  FETCH_ACTIVE_ORDER_SUCCESS,
  FETCH_ACTIVE_ORDER_FAILURE,
  FETCH_ACTIVE_ORDER_LOADING,
  SET_ORDER_ACTION,
} from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.defaultpatientActiveOrder, action) => {
  switch (action.type) {
    case FETCH_ACTIVE_ORDER_LOADING:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
        },
      };
    case FETCH_ACTIVE_ORDER_SUCCESS: {
      const { results, totalCount } = action.data;
      const { limit, startIndex } = action.meta;
      const pageCount = Math.ceil(totalCount / limit);
      const startIndexLimit = startIndex + limit;
      const from = startIndex + 1;
      const to = startIndexLimit > totalCount ? totalCount : startIndexLimit;
      const showResultCount = `Showing ${from} to ${to} of ${totalCount} entries`;

      return {
        ...state,
        status: {
          loading: false,
        },
        activeOrders: results,
        pageCount,
        showResultCount,
      };
    }
    case FETCH_ACTIVE_ORDER_FAILURE:
      return {
        ...state,
        activeOrders: [],
        errorMessage: action.payload,
        status: {
          ...state.status,
          error: true,
          loading: false,
        },
      };
    case SET_ORDER_ACTION:
      return {
        ...state,
        activeOrders: state.activeOrders.map((order) => {
          if (action.action === 'DISCARD_ALL') {
            if (order.status === 'EDIT') {
              return { ...order, status: 'EDIT' };
            }
            return { ...order, status: action.action };
          } else if (action.action === 'EDIT' || action.action === 'DRAFT_EDIT') {
            if (order.orderNumber === action.orderNumber) {
              return { ...order, status: action.action };
            } else if (order.status === 'EDIT') {
              return { ...order, status: 'NONE' };
            }
          } else if (action.action === 'DRAFT') {
            if (order.status === 'DRAFT_EDIT' || order.status === 'DISCONTINUE') {
              return { ...order, status: order.status };
            }
            return { ...order, status: action.action };
          } else if (action.action === 'DISCONTINUE') {
            if (order.orderNumber === action.orderNumber) {
              return { ...order, status: action.action };
            }
          } else if (action.action === 'DISCARD_ONE') {
            if (order.orderNumber === action.orderNumber) {
              return { ...order, status: action.action };
            }
          } else if (action.action === 'DISCARD_EDIT') {
            if (order.status === 'DISCONTINUE') {
              return { ...order, status: 'DISCONTINUE' };
            } if (order.orderNumber === action.orderNumber) {
              return { ...order, status: action.action };
            }
          }
          return order;
        }),
      };
    default:
      return state;
  }
};
