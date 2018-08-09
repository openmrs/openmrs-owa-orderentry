import * as types from '../actionTypes';
import axiosInstance from '../../config';
import loading from '../loading';

export const labOrderablesConceptSetSuccess = orderables => ({
  type: types.FETCH_LAB_ORDERABLES_SUCCESS,
  orderables,
});

export const labOrderablesConceptSetFailure = error => ({
  type: types.FETCH_LAB_ORDERABLES_FAILURE,
  error,
});

/**
 * @function
 * @returns {function} - Object consisting lab orderables from API resource
 * @throws {string} - when an error occurs
 */
export const getLabOrderablesConceptSet = value => (dispatch) => {
  dispatch(loading('FETCH_LAB_ORDERABLES', true));
  return axiosInstance.get(`/concept/${value}?v=full`)
    .then((response) => {
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      dispatch(loading('FETCH_LAB_ORDERABLES', false));
      return dispatch(labOrderablesConceptSetSuccess(response.data));
    })
    .catch((error) => {
      dispatch(loading('FETCH_LAB_ORDERABLES', false));
      dispatch(labOrderablesConceptSetFailure(error));
    });
};
