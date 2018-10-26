import {
  SETTING_ENCOUNTER_ROLE_SUCCESS,
  SETTING_ENCOUNTER_ROLE_FAILURE,
} from './actionTypes';
import axiosInstance from '../config';
import loading from './loading';
import networkError from './networkError';
import fetchEncounterRole from './encounterRole';

export const settingEncounterRoleSuccess = configuration => ({
  type: SETTING_ENCOUNTER_ROLE_SUCCESS,
  configuration,
});

export const settingEncounterRoleFailure = error => ({
  type: SETTING_ENCOUNTER_ROLE_FAILURE,
  error,
});

const NotFoundException = message => ({
  response: message,
});

export const getSettingEncounterRole = () => (dispatch) => {
  dispatch(loading('SETTING_ENCOUNTER_ROLE', true));
  return axiosInstance.get(`systemsetting?v=custom:(value)&q=orderentryowa.encounterRole`)
    .then((response) => {
      if (response.data.results.length > 0) {
        const { value } = response.data.results[0];
        dispatch(settingEncounterRoleSuccess(value));
        dispatch(fetchEncounterRole(value));
        dispatch(loading('SETTING_ENCOUNTER_ROLE', false));
      } else throw NotFoundException('Property not found');
    })
    .catch((error) => {
      if (!error.response) dispatch(networkError('Network error occurred'));
      else dispatch(settingEncounterRoleFailure(error));
      dispatch(loading('SETTING_ENCOUNTER_ROLE', false));
    });
};
