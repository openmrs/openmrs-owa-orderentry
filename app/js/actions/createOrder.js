import loading from './loading';
import axiosInstance from '../config';

import { SAVE_DRAFT_LAB_ORDER, DISCONTINUE_ORDER, DISCONTINUE_ORDER_SUCCEDED } from './actionTypes';

export const createOrder = OrderData => ({
  type: SAVE_DRAFT_LAB_ORDER,
  payload: axiosInstance.post(`encounter`, OrderData),
});

export const discontinueOrder = (order, orderNumber) => ({
  type: DISCONTINUE_ORDER,
  order,
  orderNumber,
});

export const discontinueOrderSucceeded = orderNumber => ({
  type: DISCONTINUE_ORDER_SUCCEDED,
  orderNumber,

});

export default createOrder;
