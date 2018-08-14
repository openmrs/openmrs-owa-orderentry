import {
  SEARCH_DRUGS_LOADING,
  SEARCH_DRUGS_FAILURE,
  SEARCH_DRUGS_SUCCESS,
  SELECT_DRUG,
} from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.drugSearchReducer, action) => {
  switch (action.type) {
    case SEARCH_DRUGS_SUCCESS: {
      const drugs = action.data.results;
      return {
        ...state,
        drugs,
      };
    }
    case SEARCH_DRUGS_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        status: {
          ...state.status,
          error: true,
          loading: false,
        },
      };
    case SEARCH_DRUGS_LOADING:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
        },
      };
    case SELECT_DRUG:
      return {
        ...state,
        selected: state.drugs.filter(drug => drug.uuid === action.drug)[0] || '',
      };
    default: return state;
  }
};
