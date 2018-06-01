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
  axiosInstance.get(`systemsetting?v=${value}&q=orderentryowa.dateAndTimeFormat`)
    .then(({ data: { results } }) => {
      if (results.length > 0 && results[0].value === null) {
        throw Error("incomplete config");
      }

      dispatch(getDateFormatSuccess(results[0].value));
    })
    .catch((error) => {
      dispatch(getDateFormatFailure(error.message));
    });
