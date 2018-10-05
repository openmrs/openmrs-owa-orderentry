import axiosInstance from '../config';

import { FETCH_ORDERS } from './actionTypes';

const fetchAllOrders = (
  uri,
  patient,
) => ({
  type: FETCH_ORDERS,
  payload: axiosInstance
    .get(uri ? uri.substr(uri.indexOf('v1') + 2) : `/order?totalCount=true&sort=desc&status=active&patient=${patient}&v=full`),
});

export default fetchAllOrders;
