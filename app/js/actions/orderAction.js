import * as types from './actionTypes';

export const orderAction = (action, orderNumber) => ({
  type: types.SET_ORDER_ACTION,
  action,
  orderNumber,
});

export const setOrderAction = (action, orderNumber) => (dispatch) => {
  dispatch(orderAction(action, orderNumber));
};

export const setSelectedOrder = args => ({
  type: types.SET_SELECTED_ORDER,
  ...args,
});
