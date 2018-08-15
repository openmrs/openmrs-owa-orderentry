const initialState = {
  orders: {},
  errorMessage: '',
  status: {
    fetched: false,
    error: false,
    loading: false,
  },
};

const fetchOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ORDERS_SUCCESS':
      return {
        ...state,
        orders: action.data,
        status: {
          ...state.status,
          fetched: true,
          loading: false,
        },
      };

    case 'FETCH_ORDERS_FAILURE':
      return {
        ...state,
        errorMessage: action.payload,
        status: {
          ...state.status,
          error: true,
          loading: false,
        },
      };

    case 'FETCH_ORDERS_LOADING': {
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
        },
      };
    }

    default:
      return state;
  }
};

export default fetchOrdersReducer;
