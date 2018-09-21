import { SET_PATIENT, SET_NOTE, SET_PATIENT_FAILED } from './actionTypes';
import axiosInstance from '../config';

const contextPath = window.location.href.split('/')[3];
export function fetchPatientRecord(patientUuid) {
  return dispatch => axiosInstance.get(`patient/${patientUuid}?v=custom:(patientId,uuid,patientIdentifier:(uuid,identifier),person:(gender,age,birthdate,birthdateEstimated,personName,preferredAddress),attributes:(value,attributeType:(name)))`)
    .then((response) => {
      dispatch({
        type: SET_PATIENT,
        patient: response.data,
      });
    })
    .catch((error) => {
      if (error.response) {
        dispatch({
          type: SET_PATIENT_FAILED,
        });
        window.location.href = `/${contextPath}`;
      }
    });
}

export function fetchPatientNote(patientUuid) {
  return dispatch => axiosInstance.get(`obs?concept=162169AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA&patient=${patientUuid}&v=full`)
    .then((response) => {
      dispatch({
        type: SET_NOTE,
        note: response.data.results,
      });
    });
}
