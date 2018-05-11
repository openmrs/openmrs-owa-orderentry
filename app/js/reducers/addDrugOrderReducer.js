import {
  POST_DRUG_ORDER_SUCCESS,
  POST_DRUG_ORDER_FAILURE,
} from '../../../app/js/actions/actionTypes';

const initialState = {
  addedOrder: {},
  error: null,
};

const addDrugOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_DRUG_ORDER_SUCCESS:
      return {
        ...state,
        addedOrder: action.response,
      };
    case POST_DRUG_ORDER_FAILURE:
      return {
        ...state,
        error: action.error.response,
      };
    default:
      return state;
  }
};
export default addDrugOrderReducer;
