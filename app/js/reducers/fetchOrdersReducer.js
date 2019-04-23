const initialState = {
  orders: {
    results: [],
  },
  filteredOrders: [],
  errorMessage: '',
  status: {
    fetched: false,
    error: false,
    loading: false,
  },
};

const filter = (allResults, filteredResults, sortBy, value) => {
  const newFilter = filteredResults.filter(each => each[sortBy] === value);
  if (value === 'all' && sortBy === "type") {
    return allResults;
  }
  if (allResults.length > 0 && newFilter.length === 0) {
    return allResults.filter(each => each[sortBy] === value);
  }
  return newFilter;
};

const fetchOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ORDERS_SUCCESS':
      return {
        ...state,
        orders: action.data,
        filteredOrders: action.data.results,
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

    case 'SORT_AND_FILTER': {
      const { results } = state.orders;
      const { filteredOrders } = state;
      return {
        ...state,
        filteredOrders: filter(results, filteredOrders, action.sortBy, action.value),
      };
    }

    case 'DISCONTINUE_ACTIVE_DRUG_ORDER': {
      return {
        ...state,
        filteredOrders: state.filteredOrders
          .filter(order => order.orderNumber !== action.orderNumber),
      };
    }

    case 'DISCONTINUE_ORDER_SUCCEDED': {
      return {
        ...state,
        filteredOrders: state.filteredOrders
          .filter(order => order.orderNumber !== action.orderNumber),
      };
    }

    default:
      return state;
  }
};

export default fetchOrdersReducer;
