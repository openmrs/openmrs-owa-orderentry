import axiosInstance from '../config';

const fetchOrderReasonsGlobalProperty = conceptUUID => ({
    type: 'FETCH_ORDER_REASONS_GLOBAL_PROPERTY',
    payload: axiosInstance.get(`systemsetting?v=custom:(value)&q=orderentryowa.orderReasonsMap`),

});

export default fetchOrderReasonsGlobalProperty;