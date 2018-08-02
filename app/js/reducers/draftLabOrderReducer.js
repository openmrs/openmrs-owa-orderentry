import {
  TOGGLE_DRAFT_LAB_ORDER_URGENCY,
  ADD_PANEL_TO_DRAFT_LAB_ORDER,
  ADD_TEST_TO_DRAFT_LAB_ORDER,
  DELETE_TEST_FROM_DRAFT_LAB_ORDER,
  DELETE_PANEL_FROM_DRAFT_LAB_ORDER,
  DELETE_ALL_ITEMS_IN_DRAFT_LAB_ORDER,
} from '../actions/actionTypes';
import initialState from './initialState';

/* *Utility -> TODO: Move to utility folder */
const isValidList = list => (Array.isArray(list) && !!(list.length));

/* *Utility -> TODO: Move to utility folder */
/* Filters through two lists taking the first as a predicate */
/* Returns a copy of the first array with all elements of the second array found filtered oout */
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

      const selectedLabPanels = [...state.selectedLabPanels, action.orders];

      return {
        ...state,
        selectedTests: [...singleTests, ...defaultTests],
        defaultTests,
        selectedLabPanels,
        draftLabOrders: [...selectedLabPanels, ...singleTests],
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
    case DELETE_TEST_FROM_DRAFT_LAB_ORDER: {
      const singleTests = state.singleTests.filter(test => test.id !== action.order.id);
      const selectedTests = state.selectedTests.filter(test => test.id !== action.order.id);
      const draftLabOrders = state.draftLabOrders.filter(order => order.id !== action.order.id);
      return {
        ...state,
        selectedTests,
        singleTests,
        draftLabOrders,
      };
    }

    case TOGGLE_DRAFT_LAB_ORDER_URGENCY: {
      const { orderId, orderUrgency } = action.order;
      return {
        ...state,
        draftLabOrders: state.draftLabOrders.map((draftOrder) => {
          let order;
          if (draftOrder.id === orderId) {
            if (draftOrder.tests) {
              order = {
                ...draftOrder,
                urgency: orderUrgency,
                tests: draftOrder.tests.map(test => ({
                  ...test, urgency: orderUrgency,
                })),
              };
            } else {
              order = { ...draftOrder, urgency: orderUrgency };
            }
          } else {
            order = draftOrder;
          }
          return order;
        }),
      };
    }

    case DELETE_PANEL_FROM_DRAFT_LAB_ORDER: {
      let selectedTests;
      let defaultTests;
      let selectedLabPanels;
      const draftedPanels = state.selectedLabPanels
        .filter(panel => panel.id !== action.orders.id);
      const hasValues = isValidList(draftedPanels);
      if (hasValues) {
        selectedLabPanels = draftedPanels.filter(item => item.id !== action.orders.id);
        [defaultTests] = selectedLabPanels.map(item => item.tests);
        selectedTests = [...state.singleTests, ...defaultTests];
      } else {
        defaultTests = [];
        selectedTests = [...state.singleTests];
        selectedLabPanels = [];
      }
      return {
        ...state,
        selectedTests,
        defaultTests: hasValues ? [...defaultTests] : [],
        selectedLabPanels,
        draftLabOrders: [...selectedLabPanels, ...state.singleTests],
      };
    }
    case DELETE_ALL_ITEMS_IN_DRAFT_LAB_ORDER: {
      return initialState.draftLabOrderReducer;
    }
    default: return state;
  }
};
