import loading from './loading';
import axiosInstance from '../config';

import { SAVE_DRAFT_LAB_ORDER } from './actionTypes';

const createOrder = OrderData => ({
  type: SAVE_DRAFT_LAB_ORDER,
  payload: axiosInstance.post(`encounter`, OrderData),
});

export default createOrder;
