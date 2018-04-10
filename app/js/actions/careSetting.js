import axios from 'axios';
import {
  PATIENT_CARESETTING,
  PATIENT_CARESETTING_ERROR,
} from './actionTypes';
import networkError from './networkError';

const contextPath = window.location.href.split('/')[3];
const apiBaseUrl = `/${contextPath}/ws/rest/v1`;

const fetchPatientCareSetting = () => dispatch =>
  axios.get(`${apiBaseUrl}/caresetting`)
    .then((response) => {
      dispatch({
        type: PATIENT_CARESETTING,
        patientCareSetting: response.data.results,
      });
    })
    .catch((error) => {
      if (!error.response) {
        dispatch(networkError('Network error occurred'));
      } else {
        dispatch({
          type: PATIENT_CARESETTING_ERROR,
          error: error.response,
        });
      }
    });
export default fetchPatientCareSetting;
