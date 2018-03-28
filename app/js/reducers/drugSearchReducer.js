import * as actionTypes from '../actions/actionTypes';

const initialState = {
  drugs: [], selected: {}, error: null, loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_DRUGS_SUCCESS:
      return {
        ...state,
        drugs: action.drugs,
        selected: action.drugs && action.drugs.length === 1 ? action.drugs[0] : {},
        error: null,
        loading: false,
      };
    case actionTypes.SEARCH_DRUGS_FAILURE:
      return {
        ...state,
        drugs: [],
        selected: {},
        error: action.error,
        loading: false,
      };
    case actionTypes.SEARCH_DRUGS_LOADING:
      return {
        ...state,
        drugs: [],
        selected: {},
        error: null,
        loading: action.status,
      };
    default: return state;
  }
};
