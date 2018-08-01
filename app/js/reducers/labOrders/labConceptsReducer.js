import {
  FETCH_LAB_CONCEPTS_LOADING,
  FETCH_LAB_CONCEPTS_SUCCESS,
  FETCH_LAB_CONCEPTS_FAILURE,
} from '../../actions/actionTypes';
import initialState from '../initialState';

export default (state = initialState.labConcepts, action) => {
  switch (action.type) {
    case FETCH_LAB_CONCEPTS_SUCCESS:
      return {
        ...state,
        concepts: [...action.payload.data.setMembers],
        loading: false,
        error: null,
      };
    case FETCH_LAB_CONCEPTS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_LAB_CONCEPTS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
