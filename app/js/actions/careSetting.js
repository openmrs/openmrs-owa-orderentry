import axios from 'axios';
import {
  INPATIENT_CARESETTING,
  INPATIENT_CARESETTING_ERROR,
  OUTPATIENT_CARESETTING,
  OUTPATIENT_CARESETTING_ERROR,
} from './actionTypes';
import networkError from './networkError';

const contextPath = window.location.href.split('/')[3];
const apiBaseUrl = `/${contextPath}/ws/rest/v1`;

export function fetchInpatientCareSetting() {
  return dispatch => axios.get(`${apiBaseUrl}/caresetting?q=inpatient`)
    .then((response) => {
      dispatch({
        type: INPATIENT_CARESETTING,
        inpatientCareSetting: response.data.results[0],
      });
    })
    .catch((error) => {
      if (!error.response) {
        dispatch(networkError('Network error occurred'));
      } else {
        dispatch({
          type: INPATIENT_CARESETTING_ERROR,
          error: error.response,
        });
      }
    });
}

export function fetchOutpatientCareSetting() {
  return dispatch => axios.get(`${apiBaseUrl}/caresetting?q=outpatient`)
    .then((response) => {
      dispatch({
        type: OUTPATIENT_CARESETTING,
        outpatientCareSetting: response.data.results[0],
      });
    })
    .catch((error) => {
      if (!error.response) {
        dispatch(networkError('Network error occurred'));
      } else {
        dispatch({
          type: OUTPATIENT_CARESETTING_ERROR,
          error: error.response,
        });
      }
    });
}
