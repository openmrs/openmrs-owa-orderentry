import {
  FETCH_ENCOUNTER_TYPE_LOADING,
  FETCH_ENCOUNTER_TYPE_SUCCESS,
  FETCH_ENCOUNTER_TYPE_FAILURE,
} from '../actions/actionTypes';
import initialState from './initialState';

const encounterType = (state = initialState.encounterReducer, action) => {
  switch (action.type) {
    case FETCH_ENCOUNTER_TYPE_LOADING:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
        },
      };
    case FETCH_ENCOUNTER_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        encounterType: action.data,
        error: null,
      };
    case FETCH_ENCOUNTER_TYPE_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        error: true,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default encounterType;
