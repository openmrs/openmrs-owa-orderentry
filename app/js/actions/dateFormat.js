import axiosInstance from '../config';

const getDateFormat = value => ({
  type: 'GET_DATE',
  payload: axiosInstance.get(`systemsetting?v=${value}&q=orderentryowa.dateAndTimeFormat`),
});

export default getDateFormat;
