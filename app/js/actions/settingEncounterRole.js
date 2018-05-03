import axios from 'axios';
import {
  SETTING_ENCOUNTER_ROLE_SUCCESS,
  SETTING_ENCOUNTER_ROLE_FAILURE,
} from './actionTypes';
import axiosInstance from '../config';
import loading from './loading';
import networkError from './networkError';

export const settingEncounterRoleSuccess = configuration => ({
  type: SETTING_ENCOUNTER_ROLE_SUCCESS,
  configuration,
});

export const settingEncounterRoleFailure = error => ({
  type: SETTING_ENCOUNTER_ROLE_FAILURE,
  error,
});

export const getSettingEncounterRole = () => (dispatch) => {
  dispatch(loading('SETTING_ENCOUNTER_ROLE', true));
  return axiosInstance.get(`systemsetting?v=custom:(value)&q=order.encounterRole`)
    .then((response) => {
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      dispatch(loading('SETTING_ENCOUNTER_ROLE', false));
      return response;
    })
    .then(response => dispatch(settingEncounterRoleSuccess(response.data.results[0].value)))
    .catch((error) => {
      dispatch(loading('SETTING_ENCOUNTER_ROLE', false));
      if (error.response) {
        dispatch(settingEncounterRoleFailure(error));
      } else {
        dispatch(networkError('Network error occurred'));
      }
    });
};
