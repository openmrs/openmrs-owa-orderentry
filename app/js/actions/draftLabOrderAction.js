import {
  ADD_PANEL_TO_DRAFT_LAB_ORDER,
  ADD_TEST_TO_DRAFT_LAB_ORDER,
  DELETE_TEST_FROM_SELECTION,
  DELETE_PANEL_FROM_SELECTION,
  DELETE_ALL_ITEMS_IN_DRAFT,
  TOGGLE_DRAFT_LAB_ORDER_URGENCY,
} from './actionTypes';


export const deleteDraftLabOrder = () => ({
  type: DELETE_ALL_ITEMS_IN_DRAFT,
});

export const addTestToDraft = order => ({
  type: ADD_TEST_TO_DRAFT_LAB_ORDER,
  order,
});

export const removeTestFromDraft = order => ({
  type: DELETE_TEST_FROM_SELECTION,
  order,
});

export const removeTestPanelFromDraft = orders => ({
  type: DELETE_PANEL_FROM_SELECTION,
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

