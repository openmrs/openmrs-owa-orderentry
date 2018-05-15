import {
  PATIENT_CARESETTING_SUCCESS,
  PATIENT_CARESETTING_ERROR,
} from './actionTypes';
import axiosInstance from '../config';
import networkError from './networkError';
import loading from './loading';

export const fetchPatientCareSettingActionCreator = patientCareSetting => ({
  type: PATIENT_CARESETTING_SUCCESS,
  patientCareSetting,
});

export const fetchPatientCareSettingError = error => ({
  type: PATIENT_CARESETTING_ERROR,
  error,
});

export const fetchPatientCareSetting = () => (dispatch) => {
  dispatch(loading('PATIENT_CARESETTING', true));
  return axiosInstance.get(`caresetting`)
    .then((response) => {
      dispatch(fetchPatientCareSettingActionCreator(response.data.results));
      dispatch(loading('PATIENT_CARESETTING', false));
    })
    .catch((error) => {
      dispatch(loading('PATIENT_CARESETTING', false));
      if (!error.response) {
        dispatch(networkError('Network error occurred'));
      } else {
        dispatch(fetchPatientCareSettingError(error.response));
      }
    });
};
export default fetchPatientCareSetting;
