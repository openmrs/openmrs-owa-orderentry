import axiosInstance from '../config';
import loading from "./loading";
import networkError from "./networkError";
import {
    FETCH_ORDER_REASONS_GLOBAL_PROPERTY_FAILURE,
    FETCH_ORDER_REASONS_GLOBAL_PROPERTY_SUCCESS,
} from "./actionTypes";
import fetchOrderReasons from "./fetchOrderReasons";


export const fetchOrderReasonsGlobalPropertySuccess = value => ({
    type: FETCH_ORDER_REASONS_GLOBAL_PROPERTY_SUCCESS,
    payload: value,
});

export const fetchOrderReasonsGlobalPropertyFailure = error => ({
    type: FETCH_ORDER_REASONS_GLOBAL_PROPERTY_FAILURE,
    payload: error,
});


export const fetchOrderReasonsGlobalProperty = () => (dispatch) => {
    dispatch(loading('FETCH_ORDER_REASONS_GLOBAL_PROPERTY', true));
    return axiosInstance.get(`systemsetting?v=custom:(value)&q=orderentryowa.orderReasonsMap`)
        .then((response) => {

            const orderReasonsMap = {};
            const reasonSetUuids = [];

            if (response.data.results.length > 0) {

                response.data.results[0].value.split('|').map((element) => {
                    const orderables = element.split('=')[0];
                    const reasonSetUuid = element.split('=')[1];
                    orderables.split(',').map((orderable) => {
                        orderReasonsMap[orderable] = {
                            setUuid: reasonSetUuid,
                            members: [],
                        }
                    })
                    if (!reasonSetUuids.includes(reasonSetUuid)) {
                        reasonSetUuids.push(reasonSetUuid);
                    }
                })

                dispatch(fetchOrderReasonsGlobalPropertySuccess(orderReasonsMap));

                reasonSetUuids.map((uuid) => {
                    dispatch(fetchOrderReasons(uuid));
                })

                dispatch(loading('FETCH_ORDER_REASON_GLOBAL_PROPERTY', false));
            }
        }).
        catch((error) => {
            if (!error.response) dispatch(networkError('Network error occurred'));
            else dispatch(fetchOrderReasonsGlobalPropertyFailure(error));
            dispatch(loading('FETCH_ORDER_REASONS_GLOBAL_PROPERTY', false));
        });
};


export default fetchOrderReasonsGlobalProperty;