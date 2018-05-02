import {
  FETCH_ENCOUNTER_ROLE_LOADING,
  FETCH_ENCOUNTER_ROLE_SUCCESS,
  FETCH_ENCOUNTER_ROLE_FAILURE,
} from '../../../app/js/actions/actionTypes';

const initialState = {
  isLoading: false,
  encounterRole: {},
  error: null,
};

const encounterRole = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ENCOUNTER_ROLE_LOADING:
      return {
        ...state,
        isLoading: action.status,
      };
    case FETCH_ENCOUNTER_ROLE_SUCCESS:
      return {
        ...state,
        encounterRole: action.encounterRole,
      };
    case FETCH_ENCOUNTER_ROLE_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default encounterRole;
