import {
  ADD_PANEL_TO_DRAFT_LAB_ORDER,
  ADD_TEST_TO_DRAFT_LAB_ORDER,
  DELETE_TEST_FROM_DRAFT_LAB_ORDER,
  DELETE_PANEL_FROM_DRAFT_LAB_ORDER,
  DELETE_ALL_ITEMS_IN_DRAFT_LAB_ORDER,
  TOGGLE_DRAFT_LAB_ORDER_URGENCY,
} from './actionTypes';


export const deleteDraftLabOrder = () => ({
  type: DELETE_ALL_ITEMS_IN_DRAFT_LAB_ORDER,
});

export const addTestToDraft = order => ({
  type: ADD_TEST_TO_DRAFT_LAB_ORDER,
  order,
});

export const removeTestFromDraft = order => ({
  type: DELETE_TEST_FROM_DRAFT_LAB_ORDER,
  order,
});

export const removeTestPanelFromDraft = orders => ({
  type: DELETE_PANEL_FROM_DRAFT_LAB_ORDER,
  orders,
});

export const toggleDraftLabOrdersUgency = order => ({
  type: TOGGLE_DRAFT_LAB_ORDER_URGENCY,
  order,
});

export const addTestPanelToDraft = orders => ({
  type: ADD_PANEL_TO_DRAFT_LAB_ORDER,
  orders,
});

