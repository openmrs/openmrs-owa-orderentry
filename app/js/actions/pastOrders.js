
import axiosInstance from '../config';

const getPastOrders = (
  limit,
  startIndex,
  patientUuid,
  careSetting,
  sort = 'desc',
) => ({
  type: 'LOAD_PAST_ORDERS',
  payload: axiosInstance.get(`/order?totalCount=true&sort=${sort}&status=inactive&limit=${limit}&startIndex=${startIndex}&careSetting=${careSetting}&patient=${patientUuid}&t=drugorder&v=full`),
  meta: {
    limit,
    startIndex,
  },
});

export default getPastOrders;
