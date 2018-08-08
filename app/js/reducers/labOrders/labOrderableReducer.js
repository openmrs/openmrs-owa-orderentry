import {
  FETCH_LAB_ORDERABLES_LOADING,
  FETCH_LAB_ORDERABLES_SUCCESS,
  FETCH_LAB_ORDERABLES_FAILURE,
} from '../../actions/actionTypes';
import initialState from '../initialState';

export default (state = initialState.labOrderables, action) => {
  switch (action.type) {
    case FETCH_LAB_ORDERABLES_SUCCESS: {
      return {
        ...state,
        orderables: action.data.setMembers,
      };
    }
    case FETCH_LAB_ORDERABLES_LOADING: {
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
        },
      };
    }
    case FETCH_LAB_ORDERABLES_FAILURE: {
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
