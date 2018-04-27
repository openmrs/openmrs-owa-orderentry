import * as types from './actionTypes';
import axiosInstance from '../config';
import loading from './loading';

export const fetchConfigurationsSuccess = configurations => ({
  type: types.FETCH_ORDER_CONFIG_SUCCESS,
  configurations,
});

export const fetchConfigurationsFailure = error => ({
  type: types.FETCH_ORDER_CONFIG_FAILURE,
  error,
});

/**
 * @function
 * @returns {Object} - Object consisting drug order configurations from API resource
 * @throws {Object} - when an error occurs
 */
export const getOrderEntryConfigurations = () => (dispatch) => {
  dispatch(loading('FETCH_ORDER_CONFIG', true));
  return axiosInstance.get(`orderentryconfig?v=custom:(uuid,display)`)
    .then((response) => {
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      dispatch(loading('FETCH_ORDER_CONFIG', false));
      return response;
    })
    .then(response => dispatch(fetchConfigurationsSuccess(response.data)))
    .catch((error) => {
      dispatch(loading('FETCH_ORDER_CONFIG', false));
      dispatch(fetchConfigurationsFailure(error));
    });
};
