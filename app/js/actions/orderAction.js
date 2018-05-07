import { SET_ORDER_ACTION } from './actionTypes';

export const orderAction = (action, orderNumber) => ({
  type: SET_ORDER_ACTION,
  action,
  orderNumber,
});

export const setOrderAction = (action, orderNumber) => (dispatch) => {
  dispatch(orderAction(action, orderNumber));
};
