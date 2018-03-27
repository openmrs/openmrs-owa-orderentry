import * as types from '../../../app/js/actions/actionTypes';

const orderEntryConfigurations = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_ORDER_CONFIG_SUCCESS:
      return { ...state, configurations: action.configurations };
    case types.FETCH_ORDER_CONFIG_LOADING:
      return { ...state, isLoading: action.status };
    case types.FETCH_ORDER_CONFIG_FAILURE:
      return { ...state, hasError: action.error };
    default:
      return state;
  }
};

export default orderEntryConfigurations;
