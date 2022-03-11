import axiosInstance from '../../config';

const fetchLabLocations = (  uri ) => ({
  type: 'FETCH_LAB_LOCATIONS',
  payload: axiosInstance
    .get(uri || `/location?tag=mCSD+Location`),
});

export default fetchLabOrders;
