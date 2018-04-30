import axios from 'axios';
import {
  DISCONTINUE_ORDER_FAILURE,
  DISCONTINUE_ORDER_SUCCESS,
  DISCONTINUE_ORDER,
} from './actionTypes';
import networkError from './networkError';
import loading from './loading';
import axiosInstance from '../config';

export const discontinueOrderSuccess = () => ({
  type: DISCONTINUE_ORDER_SUCCESS,
});

export const discontinueOrderFailure = error => ({
  type: DISCONTINUE_ORDER_FAILURE,
  error,
});


export const discontinueOrder = ordersPayload => (dispatch) => {
  dispatch(loading(DISCONTINUE_ORDER, true));
  return axiosInstance.post(`encounter`, ordersPayload)
    .then(() => {
      dispatch(
        discontinueOrderSuccess(),
        loading(DISCONTINUE_ORDER, false),
      );
    }).catch((error) => {
      dispatch(loading(DISCONTINUE_ORDER, false));

      if (error.response) {
        dispatch(discontinueOrderFailure(error.response));
      } else {
        dispatch(networkError('Network error occurred'));
      }
    });
};
