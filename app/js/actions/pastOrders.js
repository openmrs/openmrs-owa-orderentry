import { LOAD_PAST_ORDERS_SUCCESS, LOAD_PAST_ORDERS_FAILURE, LOADING } from './actionTypes';
import networkError from './networkError';
import axiosInstance from '../config';
import loading from './loading';

export const getPastOrdersSuccess = pastOrders => ({
  type: LOAD_PAST_ORDERS_SUCCESS,
  pastOrders,
});

export const getPastOrdersFailure = error => ({
  type: LOAD_PAST_ORDERS_FAILURE,
  error,
});

export const getPastOrders = (patientUuid, careSetting) => (dispatch) => {
  dispatch(loading('LOAD_PAST_ORDERS', true));
  return axiosInstance.get(`/order?careSetting=${careSetting}&patient=${patientUuid}&status=inactive&t=drugorder&v=full`)
    .then((response) => {
      dispatch(loading('LOAD_PAST_ORDERS', false));
      dispatch(getPastOrdersSuccess(response.data.results));
    })
    .catch((err) => {
      if (!err.response) {
        dispatch(loading('LOAD_PAST_ORDERS', false));
        dispatch(networkError('Network error occurred'));
      } else {
        dispatch(loading('LOAD_PAST_ORDERS', false));
        dispatch(dispatch(getPastOrdersFailure(err.response)));
      }
    });
};
