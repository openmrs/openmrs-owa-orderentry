import axios from 'axios';
import {
  FETCH_ACTIVE_ORDER_SUCCESS,
  FETCH_ACTIVE_ORDER_ERROR,
} from './actionTypes';
import apiBaseUrl from './apiBaseUrl';
import networkError from './networkError';
import loading from './loading';

const activeOrderActionCreator = activeOrders => ({
  type: FETCH_ACTIVE_ORDER_SUCCESS,
  activeOrders,
});

const activeOrderActionError = error => ({
  type: FETCH_ACTIVE_ORDER_ERROR,
  error,
});

const activeOrderAction = (careSetting, patientUuid) => (dispatch) => {
  dispatch(loading(true));
  return axios.get(`${apiBaseUrl}/order?careSetting=${careSetting}&patient=${patientUuid}&t=drugorder&v=full`, {
  })
    .then((response) => {
      const activeOrders = response.data.results;

      dispatch(loading(false));
      dispatch(activeOrderActionCreator(activeOrders));
    })
    .catch((error) => {
      if (!error.response) {
        dispatch(networkError('Network error occurred'));
      } else {
        dispatch(loading(false));
        dispatch(activeOrderActionError(error));
      }
    });
};

export default activeOrderAction;
