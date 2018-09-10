import loading from './loading';
import axiosInstance from '../config';

import { SAVE_DRAFT_LAB_ORDER } from './actionTypes';

const createLabOrder = labOrderData => ({
  type: SAVE_DRAFT_LAB_ORDER,
  payload: axiosInstance.post(`encounter`, labOrderData),
});

export default createLabOrder;
