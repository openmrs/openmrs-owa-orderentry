const initialState = {
  labOrderData: {},
  errorMessage: '',
  status: {
    error: false,
    added: false,
  },
};

const createLabOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_DRAFT_LAB_ORDER_SUCCESS': {
      return {
        ...state,
        labOrderData: action.data,
        status: {
          added: true,
          error: false,
        },
      };
    }

    case 'SAVE_DRAFT_LAB_ORDER_FAILURE': {
      return {
        ...state,
        errorMessage: action.error,
        status: {
          error: true,
          added: false,
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default createLabOrderReducer;
