import { all } from 'redux-saga/effects';

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
  if (value === 'all' && sortBy === 'type') {
    return allResults;
  }
  if (allResults.length > 0 && newFilter.length === 0) {
    return allResults.filter(each => each[sortBy] === value);
  }
  return newFilter;
};

const toggleUrgency = (previousOrderId, newOrderId, urgency, orders) => {
  const toggledUrgencyOrders = orders.map(order =>
    (order.uuid === previousOrderId ?
      { ...order, uuid: newOrderId, urgency } : order));
  return toggledUrgencyOrders;
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

    case 'TOGGLE_URGENCY': {
      const { previousOrderId, newOrderId, newUrgency } = action;
      return {
        ...state,
        filteredOrders: toggleUrgency(
          previousOrderId,
          newOrderId,
          newUrgency,
          state.filteredOrders,
        ),
        orders: {
          ...state.orders,
          results: toggleUrgency(previousOrderId, newOrderId, newUrgency, state.orders.results),
        },
      };
    }

    default:
      return state;
  }
};

export default fetchOrdersReducer;
