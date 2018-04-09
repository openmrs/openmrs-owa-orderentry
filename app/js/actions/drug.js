import axios from 'axios';
import * as actionTypes from './actionTypes';

const contextPath = window.location.href.split('/')[3];
const apiBaseUrl = `/${contextPath}/ws/rest/v1`;

export const searchDrugSuccess = drugs => ({
  type: actionTypes.SEARCH_DRUGS_SUCCESS,
  drugs,
});

export const searchDrugFailure = error => ({
  type: actionTypes.SEARCH_DRUGS_FAILURE,
  error,
});

export const searchDrugLoading = status => ({
  type: actionTypes.SEARCH_DRUGS_LOADING,
  status,
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
