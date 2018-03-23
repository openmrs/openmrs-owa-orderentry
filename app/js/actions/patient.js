import axios from 'axios';
import { SET_PATIENT, SET_NOTE } from './actionTypes';

const contextPath = window.location.href.split('/')[3];
const apiBaseUrl = `/${contextPath}/ws/rest/v1`;

export function fetchPatientRecord(patientUuid) {
  return dispatch => axios.get(`${apiBaseUrl}/patient/${patientUuid}?v=custom:(patientId,uuid,patientIdentifier:(uuid,identifier),person:(gender,age,birthdate,birthdateEstimated,personName,preferredAddress),attributes:(value,attributeType:(name)))`)
    .then((response) => {
      dispatch({
        type: SET_PATIENT,
        patient: response.data,
      });
    })
    .catch((error) => {
      if (error.response) {
        window.location.href = `/${contextPath}`;
      }
    });
}

export function fetchPatientNote(patientUuid) {
  return dispatch => axios.get(`${apiBaseUrl}/obs?concept=162169AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA&patient=${patientUuid}&v=full`)
    .then((response) => {
      dispatch({
        type: SET_NOTE,
        note: response.data.results,
      });
    });
}
