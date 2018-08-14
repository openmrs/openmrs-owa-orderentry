import 'babel-polyfill';
import axiosInstance from '../../config';

const fetchLabOrders = (
  uri,
  patient,
  limit = 5,
) => ({
  type: 'FETCH_LAB_ORDERS',
  payload: axiosInstance
    .get(uri || `/order?totalCount=true&sort=desc&status=active&patient=${patient}&limit=${limit}&t=testorder&v=full`),
});

export default fetchLabOrders;
