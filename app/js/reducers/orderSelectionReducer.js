import { SET_SELECTED_ORDER } from '../actions/actionTypes';
import initialState from './initialState';

const orderSelectionReducer = (state = initialState.orderSelection, action) => {
  switch (action.type) {
    case SET_SELECTED_ORDER: {
      const { currentOrderType, order, activity } = action;
      return {
        ...state,
        currentOrderType,
        selectedOrder: order,
        activity,
      };
    }
    default:
      return state;
  }
};

export default orderSelectionReducer;
