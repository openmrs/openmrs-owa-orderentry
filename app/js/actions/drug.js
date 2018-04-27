import axios from 'axios';
import {
  SEARCH_DRUGS_FAILURE,
  SEARCH_DRUGS_SUCCESS,
  SELECT_DRUG,
} from './actionTypes';
import apiBaseUrl from '../actions/apiBaseUrl';
import loading from './loading';

export const searchDrugSuccess = drugs => ({
  type: SEARCH_DRUGS_SUCCESS,
  drugs,
});

export const searchDrugFailure = error => ({
  type: SEARCH_DRUGS_FAILURE,
  error,
});

export const selectDrugSuccess = drugUuid => ({
  type: SELECT_DRUG,
  drug: drugUuid,
});

export const searchDrug = text => (dispatch) => {
  dispatch(loading('SEARCH_DRUGS', true));
  return axios.get(`${apiBaseUrl}/drug?q=${text}`)
    .then((response) => {
      dispatch(loading('SEARCH_DRUGS', false));
      dispatch(searchDrugSuccess(response.data.results));
    })
    .catch((error) => {
      dispatch(loading('SEARCH_DRUGS', false));
      if (error.response) {
        dispatch(searchDrugFailure(error.response));
      } else {
        dispatch(searchDrugFailure({ data: { message: "Network connection error" } }));
      }
    });
};

export const selectDrug = drugUuid => (dispatch) => {
  dispatch(selectDrugSuccess(drugUuid));
};
