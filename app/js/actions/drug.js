import axios from 'axios';
import {
  SEARCH_DRUGS_LOADING,
  SEARCH_DRUGS_FAILURE,
  SEARCH_DRUGS_SUCCESS,
  SELECT_DRUG,
} from './actionTypes';
import apiBaseUrl from '../actions/apiBaseUrl';

export const searchDrugSuccess = drugs => ({
  type: SEARCH_DRUGS_SUCCESS,
  drugs,
});

export const searchDrugFailure = error => ({
  type: SEARCH_DRUGS_FAILURE,
  error,
});

export const searchDrugLoading = status => ({
  type: SEARCH_DRUGS_LOADING,
  status,
});

export const selectDrugSuccess = drugUuid => ({
  type: SELECT_DRUG,
  drug: drugUuid,
});

export const searchDrug = text => (dispatch) => {
  dispatch(searchDrugLoading(true));
  return axios.get(`${apiBaseUrl}/drug?q=${text}`)
    .then((response) => {
      dispatch(searchDrugLoading(false));
      dispatch(searchDrugSuccess(response.data.results));
    })
    .catch((error) => {
      dispatch(searchDrugLoading(false));
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
