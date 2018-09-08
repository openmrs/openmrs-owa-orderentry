import {
  POST_DRUG_ORDER_SUCCESS,
  POST_DRUG_ORDER_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  addedOrder: {},
  errorMessage: '',
  status: {
    error: false,
    added: false,
  },
};

const addDrugOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_DRUG_ORDER_SUCCESS:
      return {
        ...state,
        addedOrder: action.data,
        errorMessage: '',
        status: {
          error: false,
          added: true,
        },
      };
    case POST_DRUG_ORDER_FAILURE:
      return {
        ...state,
        errorMessage: action.payload.response.data.error.message,
        status: {
          error: true,
          added: false,
        },
      };
    default:
      return state;
  }
};
export default addDrugOrderReducer;
