import axios from 'axios';
import {
  POST_DRUG_ORDER_LOADING,
  POST_DRUG_ORDER_SUCCESS,
  POST_DRUG_ORDER_FAILURE,
} from './actionTypes';
import networkError from './networkError';
import loading from './loading';

const contextPath = window.location.href.split('/')[3];
const apiBaseUrl = `/${contextPath}/ws/rest/v1`;

export const postDrugOrderSuccess = () => ({
  type: POST_DRUG_ORDER_SUCCESS,
});
export const postDrugOrderFailure = error => ({
  type: POST_DRUG_ORDER_FAILURE,
  error,
});
export const postDrugOrder = (ordersPayload, patientUuid, careSetting) => (dispatch) => {
  dispatch(loading('POST_DRUG_ORDER', true));
  return axios.post(`${apiBaseUrl}/encounter`, ordersPayload)
    .then(() => {
      dispatch(postDrugOrderSuccess());
    }).catch((error) => {
      dispatch(loading('POST_DRUG_ORDER', false));
      if (error.response) {
        dispatch(postDrugOrderFailure(error));
      } else {
        dispatch(networkError('Network error occurred'));
      }
    });
};
