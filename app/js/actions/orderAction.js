import { SET_ORDER_ACTION, SET_SELECTED_ORDER } from './actionTypes';

export const orderAction = (action, orderNumber) => ({
  type: SET_ORDER_ACTION,
  action,
  orderNumber,
});

export const setOrderAction = (action, orderNumber) => (dispatch) => {
  dispatch(orderAction(action, orderNumber));
};

export const setSelectedOrder = orderDetails => ({
  type: SET_SELECTED_ORDER,
  ...orderDetails,
});
