import * as types from './actionTypes';
import axiosInstance from '../config';

export const fetchConfigurationsSuccess = configurations => ({
  type: types.FETCH_ORDER_CONFIG_SUCCESS,
  configurations,
});

export const fetchConfigurationsFailure = error => ({
  type: types.FETCH_ORDER_CONFIG_FAILURE,
  error,
});

export const fetchConfigurationsLoading = status => ({
  type: types.FETCH_ORDER_CONFIG_LOADING,
  status,
});

/**
 * @function
 * @returns {Object} - Object consisting drug order configurations from API resource
 * @throws {Object} - when an error occurs
 */
export const getOrderEntryConfigurations = () => (dispatch) => {
  dispatch(fetchConfigurationsLoading(true));
  return axiosInstance.get(`orderentryconfig?v=custom:(uuid,display)`)
    .then((response) => {
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      dispatch(fetchConfigurationsLoading(false));
      return response;
    })
    .then(response => dispatch(fetchConfigurationsSuccess(response.data)))
    .catch((error) => {
      dispatch(fetchConfigurationsLoading(false));
      dispatch(fetchConfigurationsFailure(error));
    });
};
