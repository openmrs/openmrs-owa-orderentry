import {
  FETCH_ENCOUNTER_ROLE_LOADING,
  FETCH_ENCOUNTER_ROLE_SUCCESS,
  FETCH_ENCOUNTER_ROLE_FAILURE,
} from '../actions/actionTypes';
import initialState from './initialState';

const encounterRole = (state = initialState.encounterRoleReducer, action) => {
  switch (action.type) {
    case FETCH_ENCOUNTER_ROLE_LOADING:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
        },
      };
    case FETCH_ENCOUNTER_ROLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        encounterRole: action.data,
        error: null,
      };
    case FETCH_ENCOUNTER_ROLE_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        status: {
          ...state.status,
          error: true,
          loading: false,
        },
      };
    default:
      return state;
  }
};

export default encounterRole;
