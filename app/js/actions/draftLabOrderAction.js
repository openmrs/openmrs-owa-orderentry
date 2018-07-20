import {
  ADD_DRAFT_LAB_ORDER,
  DELETE_DRAFT_LAB_ORDER,
} from './actionTypes';

export const addDraftLabOrdersSuccess = orders => ({
  type: ADD_DRAFT_LAB_ORDER,
  orders,
});

export const deleteDraftLabOrderSuccess = orders => ({
  type: DELETE_DRAFT_LAB_ORDER,
  orders,
});

export const addDraftLabOrders = orders => (dispatch) => {
  dispatch(addDraftLabOrdersSuccess(orders));
};

export const deleteDraftLabOrder = order => (dispatch) => {
  dispatch(deleteDraftLabOrderSuccess(order));
};
