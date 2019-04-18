import loading from './loading';
import axiosInstance from '../config';

import { SAVE_DRAFT_LAB_ORDER, DISCONTINUE_ORDER } from './actionTypes';

export const createOrder = OrderData => ({
  type: SAVE_DRAFT_LAB_ORDER,
  payload: axiosInstance.post(`encounter`, OrderData),
});

export const discontinueOrder = order => ({
  type: DISCONTINUE_ORDER,
  order,
});

export default createOrder;
