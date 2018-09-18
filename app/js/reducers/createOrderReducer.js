const initialState = {
  labOrderData: {},
  errorMessage: '',
  status: {
    error: false,
    added: false,
  },
};

const createOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_DRAFT_LAB_ORDER_SUCCESS': {
      const labOrderData = action.data;
      return {
        ...state,
        labOrderData,
        status: {
          added: true,
          error: false,
        },
      };
    }
    case 'SAVE_DRAFT_LAB_ORDER_FAILURE': {
      return {
        ...state,
        errorMessage: action.payload,
        status: {
          error: true,
          added: false,
        },
      };
    }
    case 'SAVE_DRAFT_LAB_ORDER_LOADING': {
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default createOrderReducer;
