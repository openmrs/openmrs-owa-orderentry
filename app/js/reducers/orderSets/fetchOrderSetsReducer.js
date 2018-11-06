import { FETCH_ORDER_SETS } from '../../actions/actionTypes';

const initialState = {
  orderSets: [],
  status: {
    fetched: false,
    error: false,
    loading: false,
  },
};

const fetchOrderSetReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDER_SETS:
      return {
        ...state,
        orderSets: action.payload,
        status: {
          ...state.status,
          fetched: true,
        },
      };
    default:
      return state;
  }
};

export default fetchOrderSetReducer;
