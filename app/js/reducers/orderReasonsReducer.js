import {
    FETCH_ORDER_REASONS_GLOBAL_PROPERTY_SUCCESS,
    FETCH_ORDER_REASONS_GLOBAL_PROPERTY_FAILURE,
    FETCH_ORDER_REASONS_GLOBAL_PROPERTY_LOADING,
    FETCH_ORDER_REASONS_LOADING,
    FETCH_ORDER_REASONS_SUCCESS,
    FETCH_ORDER_REASONS_FAILURE,
} from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.orderReasons, action) => {
    switch (action.type) {
        case FETCH_ORDER_REASONS_GLOBAL_PROPERTY_SUCCESS: {
            return {
                ...state,
                orderReasonsMap: action.payload,
            };
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

            Object.keys(state.orderReasonsMap).forEach(
                (orderReason) => {
                    if (state.orderReasonsMap[orderReason].setUuid === action.payload.data.uuid) {
                        state.orderReasonsMap[orderReason].members = action.payload.data.setMembers;
                    }
                }
            )

            return {
                ...state
            };
        }

        case FETCH_ORDER_REASONS_LOADING: {
            return {
                ...state,
                loading: true,
            };
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
