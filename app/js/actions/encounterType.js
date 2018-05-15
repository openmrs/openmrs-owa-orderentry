import {
  FETCH_ENCOUNTER_TYPE_SUCCESS,
  FETCH_ENCOUNTER_TYPE_FAILURE,
} from './actionTypes';
import networkError from './networkError';
import { settingEncounterTypeFailure } from '../actions/settingEncounterType';

import axiosInstance from '../config';
import loading from './loading';

export const fetchEncounterTypeSuccess = encounterType => ({
  type: FETCH_ENCOUNTER_TYPE_SUCCESS,
  encounterType,
});
export const fetchEncounterTypeFailure = error => ({
  type: FETCH_ENCOUNTER_TYPE_FAILURE,
  error,
});

export const fetchEncounterType = value => (dispatch) => {
  dispatch(loading('FETCH_ENCOUNTER_TYPE', true));
  return axiosInstance.get(`encountertype?q=${value}`)
    .then(({ data: { results } }) => {
      if (results.length === 0) {
        throw Error("incomplete config");
      }
      dispatch(fetchEncounterTypeSuccess(results[0]));
      dispatch(loading('FETCH_ENCOUNTER_TYPE', false));
    }).catch((error) => {
      dispatch(settingEncounterTypeFailure(error.message));
      dispatch(loading('FETCH_ENCOUNTER_TYPE', false));
    });
};
