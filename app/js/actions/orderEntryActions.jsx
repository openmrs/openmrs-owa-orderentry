import axios from 'axios';
import * as types from './actionTypes';

const contextPath = window.location.href.split('/')[3];
const apiBaseUrl = `/${contextPath}/ws/rest/v1`;

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
  return axios.get(`${apiBaseUrl}/orderentryconfig?v=custom:(uuid,display)`, { headers: { accept: 'application/json' } })
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
