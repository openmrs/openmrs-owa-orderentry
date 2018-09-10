import axiosInstance from '../config';
import activeOrderAction from './activeOrderAction';
import getPastOrders from './pastOrders';

const addDrugOrder = (actions, dispatch) => actions.map(action => dispatch(action));

export const postDrugOrders = (ordersPayload, meta) => ({
  type: 'POST_DRUG_ORDER',
  payload: axiosInstance.post(`encounter`, ordersPayload),
  meta,
});

export const postDrugOrder = (
  ordersPayload,
  limit,
  startIndex,
  patientUuid,
  careSetting,
  meta = {},
) =>
  dispatch => addDrugOrder(
    [
      postDrugOrders(ordersPayload, meta),
      activeOrderAction(limit, startIndex, patientUuid, careSetting),
      getPastOrders(limit, startIndex, patientUuid, careSetting),
    ],
    dispatch,
  );
