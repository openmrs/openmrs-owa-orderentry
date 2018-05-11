import {
  POST_DRUG_ORDER_LOADING,
  POST_DRUG_ORDER_SUCCESS,
  POST_DRUG_ORDER_FAILURE,
} from './actionTypes';
import axiosInstance from '../config';
import networkError from './networkError';
import loading from './loading';
import activeOrderAction from './activeOrderAction';

export const postDrugOrderSuccess = response => ({
  type: POST_DRUG_ORDER_SUCCESS,
  response,
});

export const postDrugOrderFailure = error => ({
  type: POST_DRUG_ORDER_FAILURE,
  error,
});

export const postDrugOrder = (ordersPayload, limit, startIndex, patientUuid, careSetting) =>
  (dispatch) => {
    dispatch(loading('POST_DRUG_ORDER', true));
    return axiosInstance.post(`encounter`, ordersPayload)
      .then((response) => {
        dispatch(postDrugOrderSuccess(response));
        dispatch(activeOrderAction(limit, startIndex, patientUuid, careSetting));
      }).catch((error) => {
        dispatch(loading('POST_DRUG_ORDER', false));
        if (error.response) {
          dispatch(postDrugOrderFailure(error));
        } else {
          dispatch(networkError('Network error occurred'));
        }
      });
  };
