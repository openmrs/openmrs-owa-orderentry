import {
  FETCH_LAB_CONCEPTS_SUCCESS,
  FETCH_LAB_CONCEPTS_FAILURE,
} from '../actionTypes';
import axiosInstance from '../../config';
import loading from '../loading';

export const fetchLabConceptsSuccess = response => ({
  type: FETCH_LAB_CONCEPTS_SUCCESS,
  payload: response,
});

export const fetchLabConceptsFailure = error => ({
  type: FETCH_LAB_CONCEPTS_FAILURE,
  payload: error,
});

export const fetchLabConcepts = conceptUUID => (dispatch) => {
  dispatch(loading('FETCH_LAB_CONCEPTS', true));
  return axiosInstance.get(`/concept/${conceptUUID}`)
    .then((response) => {
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      dispatch(loading('FETCH_LAB_CONCEPTS', false));
      dispatch(fetchLabConceptsSuccess(response));
      return response;
    })
    .catch((error) => {
      dispatch(loading('FETCH_LAB_CONCEPTS', false));
      dispatch(fetchLabConceptsFailure(error));
    });
};
