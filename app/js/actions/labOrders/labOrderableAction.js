import * as types from '../actionTypes';
import axiosInstance from '../../config';
import loading from '../loading';
import constants from '../../constants';

export const fetchLabOrderablesSuccess = orderables => ({
  type: types.FETCH_LAB_ORDERABLES_SUCCESS,
  orderables,
});

export const fetchLabOrderablesFailure = error => ({
  type: types.FETCH_LAB_ORDERABLES_FAILURE,
  error,
});

/**
 * @function
 * @returns {function} - Object consisting lab orderables from API resource
 * @throws {string} - when an error occurs
 */
export const getLabOrderable = () => (dispatch) => {
  dispatch(loading('FETCH_LAB_ORDERABLES', true));
  return axiosInstance.get(`/concept/${constants.LAB_ORDERABLES_UUID}?v=full`)
    .then((response) => {
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      dispatch(loading('FETCH_LAB_ORDERABLES', false));
      return dispatch(fetchLabOrderablesSuccess(response.data));
    })
    .catch((error) => {
      dispatch(loading('FETCH_LAB_ORDERABLES', false));
      dispatch(fetchLabOrderablesFailure(error));
    });
};
