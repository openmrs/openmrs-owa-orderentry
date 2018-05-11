import axios from 'axios';
import {
  FETCH_ENCOUNTER_ROLE_LOADING,
  FETCH_ENCOUNTER_ROLE_SUCCESS,
  FETCH_ENCOUNTER_ROLE_FAILURE,
} from './actionTypes';
import networkError from './networkError';
import loading from './loading';
import axiosInstance from '../config';

export const fetchEncounterRoleSuccess = encounterRole => ({
  type: FETCH_ENCOUNTER_ROLE_SUCCESS,
  encounterRole,
});
export const fetchEncounterRoleFailure = error => ({
  type: FETCH_ENCOUNTER_ROLE_FAILURE,
  error,
});
export const fetchEncounterRole = value => (dispatch) => {
  dispatch(loading('FETCH_ENCOUNTER_ROLE', true));
  return axiosInstance.get(`encounterrole?q=${value}`)
    .then((response) => {
      dispatch(fetchEncounterRoleSuccess(response.data.results));
    }).catch((error) => {
      dispatch(loading('FETCH_ENCOUNTER_ROLE', false));
      if (error.response) {
        dispatch(fetchEncounterRoleFailure(error));
      } else {
        dispatch(networkError('Network error occurred'));
      }
    });
};
