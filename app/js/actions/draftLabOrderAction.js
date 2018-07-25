import {
  ADD_DRAFT_LAB_ORDER,
  DELETE_DRAFT_LAB_ORDER,
  TOGGLE_DRAFT_LAB_ORDER_URGENCY,
} from './actionTypes';

export const addDraftLabOrdersSuccess = orders => ({
  type: ADD_DRAFT_LAB_ORDER,
  orders,
});

export const deleteDraftLabOrderSuccess = orders => ({
  type: DELETE_DRAFT_LAB_ORDER,
  orders,
});

export const toggleDraftLabOrdersUgencySuccess = order => ({
  type: TOGGLE_DRAFT_LAB_ORDER_URGENCY,
  order,
});

export const addDraftLabOrders = orders => (dispatch) => {
  dispatch(addDraftLabOrdersSuccess(orders));
};

export const deleteDraftLabOrder = order => (dispatch) => {
  dispatch(deleteDraftLabOrderSuccess(order));
};

export const toggleDraftLabOrdersUgency = order => (dispatch) => {
  dispatch(toggleDraftLabOrdersUgencySuccess(order));
};
