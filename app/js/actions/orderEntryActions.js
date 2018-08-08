import axiosInstance from '../config';

const getOrderEntryConfigurations = () => ({
  type: 'FETCH_ORDER_CONFIG',
  payload: axiosInstance.get(`orderentryconfig?v=custom:(uuid,display)`),
});

export default getOrderEntryConfigurations;
