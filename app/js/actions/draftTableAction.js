import {
  ADD_DRAFT_DRUG_ORDER_SUCCESS,
  DELETE_DRAFT_DRUG_ORDER_SUCCESS,
  DELETE_ALL_DRAFT_DRUG_ORDERS_SUCCESS,
} from './actionTypes';

export const addDraftOrderSuccess = order => ({
  type: ADD_DRAFT_DRUG_ORDER_SUCCESS,
  order,
});

export const deleteDraftOrderSuccess = order => ({
  type: DELETE_DRAFT_DRUG_ORDER_SUCCESS,
  order,
});

export const deleteAllDraftOrdersSuccess = () => ({
  type: DELETE_ALL_DRAFT_DRUG_ORDERS_SUCCESS,
});

export const addDraftOrder = order => (dispatch) => {
  dispatch(addDraftOrderSuccess(order));
};

export const deleteDraftOrder = order => (dispatch) => {
  dispatch(deleteDraftOrderSuccess(order));
};

export const deleteAllDraftOrders = () => (dispatch) => {
  dispatch(deleteAllDraftOrdersSuccess());
};
