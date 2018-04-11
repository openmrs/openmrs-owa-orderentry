import {
  FETCH_ENCOUNTER_TYPE_LOADING,
  FETCH_ENCOUNTER_TYPE_SUCCESS,
  FETCH_ENCOUNTER_TYPE_FAILURE,
} from '../../../app/js/actions/actionTypes';

const initialState = {
  isLoading: false,
  encounterType: {},
  error: null,
};
const encounterType = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ENCOUNTER_TYPE_LOADING:
      return {
        ...state,
        isLoading: action.status,
        encounterType: {},
        error: null,
      };
    case FETCH_ENCOUNTER_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        encounterType: action.encounterType,
        error: null,
      };
    case FETCH_ENCOUNTER_TYPE_FAILURE:
      return {
        ...state,
        isLoading: false,
        encounterType: {},
        error: action.error,
      };
    default:
      return state;
  }
};

export default encounterType;
