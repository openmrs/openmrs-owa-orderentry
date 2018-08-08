import axiosInstance from '../config';
import activeOrderAction from './activeOrderAction';
import getPastOrders from './pastOrders';

const addDrugOrder = (actions, dispatch) => actions.map(action => dispatch(action));

export const postDrugOrders = ordersPayload => ({
  type: 'POST_DRUG_ORDER',
  payload: axiosInstance.post(`encounter`, ordersPayload),
});

export const postDrugOrder = (ordersPayload, limit, startIndex, patientUuid, careSetting) =>
  dispatch => addDrugOrder(
    [
      postDrugOrders(ordersPayload),
      activeOrderAction(limit, startIndex, patientUuid, careSetting),
      getPastOrders(limit, startIndex, patientUuid, careSetting),
    ],
    dispatch,
  );
