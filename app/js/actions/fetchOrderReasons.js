import axiosInstance from '../config';

const fetchOrderReasons = conceptUUID => ({
    type: 'FETCH_ORDER_REASONS',
    payload: axiosInstance.get(`/concept/${conceptUUID}`),

});

export default fetchOrderReasons;
