import { SET_REDIRECT_TO_ADD_RESULTS } from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.defaultAddResults, action) => {
    switch (action.type) {
        case SET_REDIRECT_TO_ADD_RESULTS:
            return {
                ...state,
                redirectToAddResults: action.redirectToAddResults,
            };
        default: return state;
    }
};
