import axios from 'axios';
import {
  SETTING_ENCOUNTER_TYPE_SUCCESS,
  SETTING_ENCOUNTER_TYPE_FAILURE,
} from './actionTypes';
import axiosInstance from '../config';
import loading from './loading';
import fetchEncounterType from './encounterType';

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
  return axiosInstance.get(`systemsetting?v=custom:(value)&q=orderentryowa.encounterType`)
    .then((response) => {
      if (response.data.results.length === 0) {
        throw Error("config not found");
      }
      const { value } = response.data.results[0];
      dispatch(settingEncounterTypeSuccess(value));
      dispatch(fetchEncounterType(value));
      dispatch(loading('SETTING_ENCOUNTER_TYPE', false));
    })
    .catch((error) => {
      dispatch(settingEncounterTypeFailure(error.message));
      dispatch(loading('SETTING_ENCOUNTER_TYPE', false));
    });
};
