import axios from 'axios';
import { LOAD_PAST_ORDERS_SUCCESS, LOAD_PAST_ORDERS_FAILURE, LOADING } from './actionTypes';
import networkError from './networkError';
import loading from './loading';

const contextPath = window.location.href.split('/')[3];
const apiBaseUrl = `/${contextPath}/ws/rest/v1`;

export const getPastOrdersSuccess = pastOrders => ({
  type: LOAD_PAST_ORDERS_SUCCESS,
  pastOrders,
});

export const getPastOrdersFailure = error => ({
  type: LOAD_PAST_ORDERS_FAILURE,
  error,
});

export const getPastOrders = (patientUuid, careSetting) => (dispatch) => {
  dispatch(loading(true));
  return axios.get(`${apiBaseUrl}/order?careSetting=${careSetting}&patient=${patientUuid}&status=inactive&t=drugorder&v=full`)
    .then((response) => {
      dispatch(loading(false));
      dispatch(getPastOrdersSuccess(response.data.results));
    })
    .catch((err) => {
      if (!err.response) {
        dispatch(loading(false));
        dispatch(networkError('Network error occurred'));
      } else {
        dispatch(loading(false));
        dispatch(dispatch(getPastOrdersFailure(err.response)));
      }
    });
};
