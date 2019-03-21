import loading from './loading';
import axiosInstance from '../config';

import { SAVE_DRAFT_LAB_ORDER } from './actionTypes';

const createOrder = (OrderData, returnUrl) => ({
  type: SAVE_DRAFT_LAB_ORDER,
  payload: axiosInstance.post(`encounter`, OrderData),
  meta: { returnUrl },
});

export default createOrder;
