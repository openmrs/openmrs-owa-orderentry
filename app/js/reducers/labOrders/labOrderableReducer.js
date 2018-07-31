import {
  FETCH_LAB_ORDERABLES_SUCCESS,
  FETCH_LAB_ORDERABLES_FAILURE,
} from '../../actions/actionTypes';
import initialState from '../initialState';

export default (state = initialState.labOrderables, action) => {
  switch (action.type) {
    case FETCH_LAB_ORDERABLES_SUCCESS:
      return {
        ...state,
        orderables: action.orderables.setMembers,
      };
    case FETCH_LAB_ORDERABLES_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    default:
      return state;
  }
};
