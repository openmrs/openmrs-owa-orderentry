import axios from 'axios';
import {
  SETTING_ENCOUNTER_TYPE_SUCCESS,
  SETTING_ENCOUNTER_TYPE_FAILURE,
} from './actionTypes';
import axiosInstance from '../config';
import loading from './loading';

export const settingEncounterTypeSuccess = configuration => ({
  type: SETTING_ENCOUNTER_TYPE_SUCCESS,
  configuration,
});

export const settingEncounterTypeFailure = error => ({
  type: SETTING_ENCOUNTER_TYPE_FAILURE,
  error,
});

export const getSettingEncounterType = () => (dispatch) => {
  dispatch(loading('SETTING_ENCOUNTER_TYPE', true));
  return axiosInstance.get(`systemsetting?v=custom:(value)&q=order.encounterType`)
    .then((response) => {
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      dispatch(loading('SETTING_ENCOUNTER_TYPE', false));
      return response;
    })
    .then(response => dispatch(settingEncounterTypeSuccess(response.data.results[0].value)))
    .catch((error) => {
      dispatch(loading('SETTING_ENCOUNTER_TYPE', false));
      dispatch(settingEncounterTypeFailure(error));
    });
};
