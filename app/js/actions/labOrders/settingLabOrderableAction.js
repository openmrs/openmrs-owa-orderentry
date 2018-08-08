import {
  GET_LAB_ORDERABLES_SUCCESS,
  GET_LAB_ORDERABLES_FAILURE,
} from '../actionTypes';
import axiosInstance from '../../config';
import loading from '../loading';
import networkError from '../networkError';
import getLabOrderablesConceptSet from './labOrderableAction';

export const getLabOrderablesSuccess = value => ({
  type: GET_LAB_ORDERABLES_SUCCESS,
  value,
});

export const getLabOrderablesFailure = error => ({
  type: GET_LAB_ORDERABLES_FAILURE,
  error,
});

const NotFoundException = message => ({
  response: message,
});

export const getLabOrderables = () => (dispatch) => {
  dispatch(loading('GET_LAB_ORDERABLES', true));
  return axiosInstance.get(`systemsetting?v=custom:(value)&q=orderentryowa.labOrderablesConceptSet`)
    .then((response) => {
      if (response.data.results.length > 0) {
        const { value } = response.data.results[0];
        dispatch(getLabOrderablesSuccess(value));
        dispatch(getLabOrderablesConceptSet(value));
        dispatch(loading('GET_LAB_ORDERABLES', false));
      } else throw NotFoundException('Property not found');
    })
    .catch((error) => {
      if (!error.response) dispatch(networkError('Network error occurred'));
      else dispatch(getLabOrderablesFailure(error));
      dispatch(loading('GET_LAB_ORDERABLES', false));
    });
};
