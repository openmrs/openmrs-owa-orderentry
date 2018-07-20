import {
  TOGGLE_DRAFT_LAB_ORDER_URGENCY,
  ADD_PANEL_TO_DRAFT_LAB_ORDER,
  ADD_TEST_TO_DRAFT_LAB_ORDER,
  DELETE_TEST_FROM_SELECTION,
  DELETE_PANEL_FROM_SELECTION,
  DELETE_TEST_IN_DRAFT,
} from '../actions/actionTypes';
import initialState from './initialState';

/* *Utility -> TODO: Move to utility folder */
const isValidList = list => (Array.isArray(list) && !!(list.length));

/* *Utility -> TODO: Move to utility folder */
const filterThrough = (from, to) => from.reduce((itemFrom, item) => {
  const check = to.map(i => i.id).includes(item.id);
  const filter = check ? itemFrom.filter(i => i.id !== item.id) : itemFrom;
  return filter;
}, from);

export default (state = initialState.draftLabOrderReducer, action) => {
  switch (action.type) {
    case ADD_PANEL_TO_DRAFT_LAB_ORDER: {
      let singleTests = []; /* tests not in panel but in draft anyway */
      let defaultTests = action.orders.tests; /* all tests in selected panel */

      const hasSingleTests = isValidList(state.singleTests);
      const hasDefaultTests = isValidList(state.defaultTests);

      /* NOTE: what we want is to only add tests if they are in the panel and
      remove those single test which are also part of a panel */

      if (hasSingleTests && !hasDefaultTests) {
        singleTests = filterThrough(state.draftLabOrders, defaultTests);
      } else if (hasDefaultTests) {
        singleTests = filterThrough(state.draftLabOrders, [...state.defaultTests, ...defaultTests]);
        defaultTests = [...state.defaultTests, ...defaultTests];
      }

      return {
        ...state,
        selectedTests: [...singleTests, ...defaultTests],
        defaultTests,
        selectedLabPanels: [...state.selectedLabPanels, action.orders],
        draftLabOrders: [...defaultTests, ...singleTests],
        singleTests,
      };
    }
    case ADD_TEST_TO_DRAFT_LAB_ORDER: {
      let isDefaultTest;
      let isSelectedTest;
      const hasValues = isValidList(state.defaultTests) && isValidList(state.selectedTests);
      if (hasValues) {
        isDefaultTest = state.defaultTests.includes(action.order.id);
        isSelectedTest = state.selectedTests.includes(action.order.id);
        if (isDefaultTest && isSelectedTest) return state;
      }
      return {
        ...state,
        draftLabOrders: [...state.draftLabOrders, action.order],
        singleTests: [...state.singleTests, action.order],
        selectedTests: [...state.selectedTests, action.order],
        selectedLabPanels: [...state.selectedLabPanels],
      };
    }
    case DELETE_TEST_FROM_SELECTION: {
      const newDraft = state.draftLabOrders.filter(order => order.id !== action.order.id);
      return {
        ...state,
        selectedTests: newDraft,
        selectedLabPanels: [...state.selectedLabPanels],
        singleTests: newDraft,
        draftLabOrders: newDraft,
      };
    }

    case TOGGLE_DRAFT_LAB_ORDER_URGENCY: {
      const { orderId, orderUrgency } = action.order;
      return {
        ...state,
        draftLabOrders: state.draftLabOrders.map(draftOrder => (draftOrder.id === orderId ?
          { ...draftOrder, urgency: orderUrgency }
          : draftOrder)),
      };
    }
    case DELETE_PANEL_FROM_SELECTION: {
      let selectedTests;
      let defaultTests;
      const selectedLabPanels = state.selectedLabPanels
        .filter(panel => panel.id !== action.orders.id);
      const hasValues = isValidList(selectedLabPanels);
      if (hasValues) {
        [defaultTests] = selectedLabPanels.map(item => item.tests);
        selectedTests = [...state.singleTests, ...defaultTests];
      } else {
        defaultTests = [];
        selectedTests = [...state.singleTests];
      }
      return {
        ...state,
        selectedTests,
        defaultTests: hasValues ? [...defaultTests] : [],
        selectedLabPanels,
        draftLabOrders: selectedTests,
      };
    }
    case DELETE_TEST_IN_DRAFT: {
      const singleTests = state.singleTests.filter(test => test.id !== action.order.id);
      const selectedTests = state.selectedTests.filter(test => test.id !== action.order.id);
      const draftLabOrders = state.draftLabOrders.filter(order => order.id !== action.order.id);
      return {
        ...state,
        selectedTests,
        draftLabOrders,
        singleTests,
      };
    }
    default: return state;
  }
};