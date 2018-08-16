import * as types from '../actions/actionTypes';
import initialState from './initialState';

const orderSelectionReducer = (state = initialState.orderSelection, action) => {
  switch (action.type) {
    case types.SET_SELECTED_ORDER:
      return {
        ...state,
        currentOrderType: action.currentOrderType,
        selectedOrder: action.order,
        activity: action.activity,
      };
    default:
      return state;
  }
};

export default orderSelectionReducer;
