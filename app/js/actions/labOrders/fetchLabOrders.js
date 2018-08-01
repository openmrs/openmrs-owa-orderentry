import 'babel-polyfill';
import axiosInstance from '../../config';

import {
  FETCH_LAB_ORDERS_SUCCESS,
  FETCH_LAB_ORDERS_FAILURE,
  FETCH_LAB_ORDERS_LOADING,
} from '../actionTypes';

const fetchLabOrdersSuccess = orders => ({
  orders,
  type: FETCH_LAB_ORDERS_SUCCESS,
});

const fetchLabOrdersFailure = error => ({
  error,
  type: FETCH_LAB_ORDERS_FAILURE,
});

const fetchLabOrdersLoading = status => ({
  status,
  type: FETCH_LAB_ORDERS_LOADING,
});

const fetchLabOrders = (uri, limit = 5, patient) => async (dispatch) => {
  dispatch(fetchLabOrdersLoading(true));
  try {
    const url = uri || `/order?totalCount=true&sort=desc&status=active&patient=${patient}&limit=${limit}&t=testorder&v=full`;
    const response = await axiosInstance.get(url);
    dispatch(fetchLabOrdersSuccess(response.data));
  } catch (err) {
    dispatch(fetchLabOrdersFailure(err.response.data.error.message));
  }
};

export default fetchLabOrders;
