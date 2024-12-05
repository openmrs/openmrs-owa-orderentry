import {
    FETCH_ORDER_REASONS_GLOBAL_PROPERTY_SUCCESS,
    FETCH_ORDER_REASONS_GLOBAL_PROPERTY_FAILURE,
    FETCH_ORDER_REASONS_GLOBAL_PROPERTY_LOADING, FETCH_ORDER_REASONS_LOADING,
} from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.orderReasons, action) => {
    switch (action.type) {
        case FETCH_ORDER_REASONS_GLOBAL_PROPERTY_SUCCESS: {
            if (action.payload.data && action.payload.data.results &&  action.payload.data.results.length > 0) {

                const orderReasonsMap = {};

                action.payload.data.results[0].value.split('|').map((element) => {
                    const orderables = element.split('=')[0];
                    const reasons = element.split('=')[1];
                    orderables.split(',').map((orderable) => {
                        orderReasonsMap[orderable] = reasons;
                    })
                })

                return {
                    ...state,
                    orderReasonsMap,
                };
            }
            return state;
        }
        case FETCH_ORDER_REASONS_GLOBAL_PROPERTY_LOADING: {
            return {
                ...state,
                loading: true,
            };
        }
        case FETCH_ORDER_REASONS_GLOBAL_PROPERTY_FAILURE: {
            return {
                ...state,
                errorMessage: action.payload,
                error: true,
                loading: false,
            };
        }

        case FETCH_ORDER_REASONS_SUCCESS: {

        }

        case FETCH_ORDER_REASONS_LOADING: {

        }

        case FETCH_ORDER_REASONS_FAILURE : {
            return {
                ...state,
                errorMessage: action.payload,
                error: true,
                loading: false,
            };
        }


        default:
            return state;
    }
};
