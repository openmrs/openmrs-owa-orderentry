import {
  GET_DATE_SUCCESS,
  GET_DATE_FAILURE,
} from './actionTypes';
import axiosInstance from '../config';

const getDateFormat = value => ({
  type: 'GET_DATE',
  payload: axiosInstance.get(`systemsetting?v=${value}&q=orderentryowa.dateAndTimeFormat`),
});

export default getDateFormat;
