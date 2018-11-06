import { FETCH_ORDER_SETS } from '../actionTypes';
import orderSetData from '../../dummyData/orderSetData';

const fetchOrderSets = () => ({
  type: FETCH_ORDER_SETS,
  payload: orderSetData,
});

const fetchOrderSet = () => dispatch => dispatch((fetchOrderSets()));

export default fetchOrderSet;
