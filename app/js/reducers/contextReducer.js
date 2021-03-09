import { SET_CONTEXT } from '../actions/actionTypes';

// used to restrict the app to only work with a single order type (ie Test Orders or Drug Orders)
// default (orderType == null) is to not restrict (ie, use all)

const initialState = {
  orderType: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTEXT:
      return {
        ...state,
        orderType: action.orderType,
      };
    default: return state;
  }
};
