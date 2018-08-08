import initialState from '../initialState';
import {
  GET_LAB_ORDERABLES_SUCCESS,
  GET_LAB_ORDERABLES_FAILURE,
  GET_LAB_ORDERABLES_LOADING,
} from '../../../../app/js/actions/actionTypes';

const getLabOrderablesReducer = (
  state = initialState.defaultLabOrderable,
  action,
) => {
  switch (action.type) {
    case GET_LAB_ORDERABLES_SUCCESS:
      return { ...state, getLabOrderables: action.value };
    case GET_LAB_ORDERABLES_FAILURE:
      return { ...state, error: action.error };
    case GET_LAB_ORDERABLES_LOADING:
      return { ...state, isLoading: action.status };
    default:
      return state;
  }
};

export default getLabOrderablesReducer;
