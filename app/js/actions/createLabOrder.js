import loading from './loading';
import axiosInstance from '../config';

import {
  SAVE_DRAFT_LAB_ORDER,
  SAVE_DRAFT_LAB_ORDER_SUCCESS,
  SAVE_DRAFT_LAB_ORDER_FAILURE,
} from './actionTypes';

const createLabOrderFailure = error => ({
  type: SAVE_DRAFT_LAB_ORDER_FAILURE,
  error,
});

const createLabOrderSuccess = data => ({
  type: SAVE_DRAFT_LAB_ORDER_SUCCESS,
  data,
});

const createLabOrder = labOrderData => async (dispatch) => {
  try {
    dispatch(loading(SAVE_DRAFT_LAB_ORDER, true));
    const response = await axiosInstance.post(`encounter`, labOrderData);
    const { data } = response;
    dispatch(createLabOrderSuccess(data));
    dispatch(loading(SAVE_DRAFT_LAB_ORDER, false));
  } catch (error) {
    dispatch(loading(SAVE_DRAFT_LAB_ORDER, false));
    dispatch(createLabOrderFailure(error.response.data.error.message));
  }
};

export default createLabOrder;
