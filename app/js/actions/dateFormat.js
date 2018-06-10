import {
  GET_DATE_SUCCESS,
  GET_DATE_FAILURE,
} from './actionTypes';
import axiosInstance from '../config';

export const getDateFormatSuccess = dateFormat => ({
  type: GET_DATE_SUCCESS,
  dateFormat,
});

export const getDateFormatFailure = error => ({
  type: GET_DATE_FAILURE,
  error,
});

export const getDateFormat = value => dispatch =>
  axiosInstance.get(`systemsetting?v=${value}&q=order.dateTimeFormat`)
    .then(({ data: { results } }) => {
      if (!results.length) {
        const DATE_FORMAT = 'DD-MMM-YYYY HH:mm';
        dispatch(getDateFormatSuccess(DATE_FORMAT));
      } else if (results.length && results[0].value === null) {
        throw Error('incomplete config');
      } else {
        dispatch(getDateFormatSuccess(results[0].value));
      }
    })
    .catch((error) => {
      dispatch(getDateFormatFailure(error.message));
    });
