import {
  FETCH_ENCOUNTER_TYPE_SUCCESS,
  FETCH_ENCOUNTER_TYPE_FAILURE,
} from './actionTypes';
import networkError from './networkError';

import axiosInstance from '../config';
import loading from './loading';

export const fetchencounterTypeSuccess = encounterType => ({
  type: FETCH_ENCOUNTER_TYPE_SUCCESS,
  encounterType,
});
export const fetchencounterTypeFailure = error => ({
  type: FETCH_ENCOUNTER_TYPE_FAILURE,
  error,
});

export const fetchencounterType = value => (dispatch) => {
  dispatch(loading('FETCH_ENCOUNTER_TYPE', true));
  return axiosInstance.get(`encountertype?q=${value}`)
    .then((response) => {
      dispatch(fetchencounterTypeSuccess(response));
    }).catch((error) => {
      dispatch(loading('FETCH_ENCOUNTER_TYPE', false));
      if (error.response) {
        dispatch(fetchencounterTypeFailure(error));
      } else {
        dispatch(networkError('Network error occurred'));
      }
    });
};
