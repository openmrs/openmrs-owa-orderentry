import {
  ADD_DRAFT_DRUG_ORDER_SUCCESS,
  DELETE_DRAFT_DRUG_ORDER_SUCCESS,
  DELETE_ALL_DRAFT_DRUG_ORDERS_SUCCESS,
} from '../../actions/actionTypes';
import initialState from '../initialState';

export default (state = initialState.draftReducer, action) => {
  switch (action.type) {
    case ADD_DRAFT_DRUG_ORDER_SUCCESS:
      return {
        ...state,
        draftDrugOrders: [...state.draftDrugOrders, action.order],
      };
    case DELETE_DRAFT_DRUG_ORDER_SUCCESS:
      return {
        ...state,
        draftDrugOrders: state.draftDrugOrders.filter((_, index) =>
          index !== state.draftDrugOrders.indexOf(action.order)),
      };
    case DELETE_ALL_DRAFT_DRUG_ORDERS_SUCCESS:
      return {
        ...state,
        draftDrugOrders: [],
      };
    default: return state;
  }
};
