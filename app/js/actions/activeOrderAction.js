import axiosInstance from '../config';

const activeOrderAction = (
  limit,
  startIndex,
  patientUuid,
  careSetting,
  sort = 'desc',
) => dispatch => dispatch({
  type: 'FETCH_ACTIVE_ORDER',
  payload: axiosInstance.get(`/order?totalCount=true&sort=${sort}&status=active&limit=${limit}&startIndex=${startIndex}&careSetting=${careSetting}&patient=${patientUuid}&t=drugorder&v=full`),
  meta: {
    limit,
    startIndex,
  },
});

export default activeOrderAction;

