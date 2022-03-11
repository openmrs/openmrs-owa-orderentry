const initialState = {
  labOrders: {},
  errorMessage: '',
  status: {
    fetched: false,
    error: false,
    loading: false,
  },
};

const fetchLabOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_LAB_LOCATIONS_SUCCESS':
      return {
        ...state,
        labLocations: action.data,
        status: {
          ...state.status,
          fetched: true,
          loading: false,
        },
      };
    case 'FETCH_LAB_LOCATIONS_FAILURE':
      return {
        ...state,
        errorMessage: action.payload,
        status: {
          ...state.status,
          error: true,
          loading: false,
        },
      };
    case 'FETCH_LAB_LOCATIONS_LOADING': {
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

export default fetchLabOrderReducer;
