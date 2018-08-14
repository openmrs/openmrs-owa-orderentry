import loading from './loading';
import axiosInstance from '../config';

import {
  SAVE_DRAFT_LAB_ORDER,
  SAVE_DRAFT_LAB_ORDER_SUCCESS,
  SAVE_DRAFT_LAB_ORDER_FAILURE,
} from './actionTypes';


const createLabOrder = labOrderData => ({
  type: 'SAVE_DRAFT_LAB_ORDER',
  payload: axiosInstance.post(`encounter`, labOrderData),
});

export default createLabOrder;
