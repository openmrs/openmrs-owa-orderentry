import axios from 'axios';
import {
  LOAD_PAST_ORDERS_SUCCESS,
  LOAD_PAST_ORDERS_FAILURE,
  LOADING,
  PAST_ORDERS_PAGE_COUNT,
  PAST_ORDERS_RESULT_COUNT,
} from './actionTypes';
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

const pastOrdersPageCount = pageCount => ({
  type: PAST_ORDERS_PAGE_COUNT,
  pageCount,
});

const pastOrderResultCount = pastOrdersResultCount => ({
  type: PAST_ORDERS_RESULT_COUNT,
  pastOrdersResultCount,
});

export const getPastOrders = (limit, startIndex, patientUuid, careSetting, sort = 'desc') => (dispatch) => {
  dispatch(loading('LOAD_PAST_ORDERS', true));
  return axiosInstance.get(`/order?totalCount=true&sort=${sort}&status=inactive&limit=${limit}&startIndex=${startIndex}&careSetting=${careSetting}&patient=${patientUuid}&t=drugorder&v=full`)
    .then((response) => {
      const { results, totalCount } = response.data;
      const pageCount = Math.ceil(totalCount / limit);

      const startIndexLimit = startIndex + limit;
      const from = startIndex + 1;
      const to = startIndexLimit > totalCount ? totalCount : startIndexLimit;
      const showResultCount = `Showing ${from} to ${to} of ${totalCount} entries`;

      dispatch(loading('LOAD_PAST_ORDERS', false));
      dispatch(getPastOrdersSuccess(results));
      dispatch(pastOrdersPageCount(pageCount));
      dispatch(pastOrderResultCount(showResultCount));
    })
    .catch((err) => {
      dispatch(loading('LOAD_PAST_ORDERS', false));
      if (!err.response) {
        dispatch(networkError('Network error occurred'));
      } else {
        dispatch(dispatch(getPastOrdersFailure(err.response)));
      }
    });
};
