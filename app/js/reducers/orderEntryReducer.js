import * as types from '../actions/actionTypes';

const orderEntryConfigurations = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_ORDER_CONFIG_SUCCESS:
      return { ...state, configurations: action.data };
    case types.FETCH_ORDER_CONFIG_LOADING:
      return { ...state, isLoading: true };
    case types.FETCH_ORDER_CONFIG_FAILURE:
      return { ...state, hasError: action.payload };
    default:
      return state;
  }
};

export default orderEntryConfigurations;
