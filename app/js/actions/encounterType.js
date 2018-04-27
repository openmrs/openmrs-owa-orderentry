import {
  FETCH_ENCOUNTER_TYPE_LOADING,
  FETCH_ENCOUNTER_TYPE_SUCCESS,
  FETCH_ENCOUNTER_TYPE_FAILURE,
} from './actionTypes';
import networkError from './networkError';
import axiosInstance from '../config';

export const fetchencounterTypeLoading = status => ({
  type: FETCH_ENCOUNTER_TYPE_LOADING,
  status,
});
export const fetchencounterTypeSuccess = encounterType => ({
  type: FETCH_ENCOUNTER_TYPE_SUCCESS,
  encounterType,
});
export const fetchencounterTypeFailure = error => ({
  type: FETCH_ENCOUNTER_TYPE_FAILURE,
  error,
});
export const fetchencounterType = value => (dispatch) => {
  dispatch(fetchencounterTypeLoading(true));
  return axiosInstance.get(`encountertype?q=${value}`)
    .then((response) => {
      dispatch(fetchencounterTypeSuccess(response));
    }).catch((error) => {
      dispatch(fetchencounterTypeLoading(false));
      if (error.response) {
        dispatch(fetchencounterTypeFailure(error));
      } else {
        dispatch(networkError('Network error occurred'));
      }
    });
};
