import {
  FETCH_ACTIVE_ORDER_SUCCESS,
  FETCH_ACTIVE_ORDER_ERROR,
} from './actionTypes';
import axiosInstance from '../config';
import networkError from './networkError';
import loading from './loading';

export const activeOrderActionCreator = (results, pageCount, showResultCount) => ({
  type: FETCH_ACTIVE_ORDER_SUCCESS,
  results,
  pageCount,
  showResultCount,
});

export const activeOrderActionError = error => ({
  type: FETCH_ACTIVE_ORDER_ERROR,
  error,
});

export const activeOrderAction = (limit, startIndex, patientUuid, careSetting, sort = 'desc') => (dispatch) => {
  dispatch(loading('FETCH_ACTIVE_ORDER', true));
  return axiosInstance.get(`/order?totalCount=true&sort=${sort}&status=active&limit=${limit}&startIndex=${startIndex}&careSetting=${careSetting}&patient=${patientUuid}&t=drugorder&v=full`, {
  })
    .then((response) => {
      const { results, totalCount } = response.data;
      const pageCount = Math.ceil(totalCount / limit);
      const startIndexLimit = startIndex + limit;
      const from = startIndex + 1;
      const to = startIndexLimit > totalCount ? totalCount : startIndexLimit;
      const showResultCount = `Showing ${from} to ${to} of ${totalCount} entries`;

      dispatch(loading('FETCH_ACTIVE_ORDER', false));
      dispatch(activeOrderActionCreator(results, pageCount, showResultCount));
    })
    .catch((error) => {
      dispatch(loading('FETCH_ACTIVE_ORDER', false));
      if (!error.response) {
        dispatch(networkError('Network error occurred'));
      } else {
        dispatch(activeOrderActionError(error));
      }
    });
};

export default activeOrderAction;
