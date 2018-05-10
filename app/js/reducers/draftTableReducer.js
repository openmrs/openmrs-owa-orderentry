import {
  ADD_DRAFT_ORDER_SUCCESS,
  DELETE_DRAFT_ORDER_SUCCESS,
  DELETE_ALL_DRAFT_ORDERS_SUCCESS,
} from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.draftTableReducer, action) => {
  switch (action.type) {
    case ADD_DRAFT_ORDER_SUCCESS:
      return {
        ...state,
        draftOrders: [...state.draftOrders, action.order],
      };
    case DELETE_DRAFT_ORDER_SUCCESS:
      return {
        ...state,
        draftOrders: state.draftOrders.filter((_, index) =>
          index !== state.draftOrders.indexOf(action.order)),
      };
    case DELETE_ALL_DRAFT_ORDERS_SUCCESS:
      return {
        ...state,
        draftOrders: [],
      };
    default: return state;
  }
};
