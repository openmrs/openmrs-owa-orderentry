import axios from 'axios';
import {
  FETCH_ENCOUNTER_ROLE_LOADING,
  FETCH_ENCOUNTER_ROLE_SUCCESS,
} from './actionTypes';
import networkError from './networkError';
import loading from './loading';
import axiosInstance from '../config';
import { settingEncounterRoleFailure } from './settingEncounterRole';

export const fetchEncounterRoleSuccess = encounterRole => ({
  type: FETCH_ENCOUNTER_ROLE_SUCCESS,
  encounterRole,
});

export const fetchEncounterRole = value => (dispatch) => {
  dispatch(loading('FETCH_ENCOUNTER_ROLE', true));
  return axiosInstance.get(`encounterrole?q=${value}`)
    .then(({ data: { results } }) => {
      if (results.length === 0) {
        throw Error("incomplete config");
      }

      dispatch(fetchEncounterRoleSuccess(results[0]));
      dispatch(loading('FETCH_ENCOUNTER_ROLE', false));
    }).catch((error) => {
      dispatch(settingEncounterRoleFailure(error.message));
      dispatch(loading('FETCH_ENCOUNTER_ROLE', false));
    });
};
