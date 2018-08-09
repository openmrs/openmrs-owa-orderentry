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
/* Filters through two lists taking the first as a predicate */
/* Returns a copy of the first array with all elements of the second array found filtered oout */
const filterThrough = (from, to) => from.reduce((itemFrom, item) => {
  const check = to.map(i => i.uuid).includes(item.uuid);
  const filter = check ? itemFrom.filter(i => i.uuid !== item.uuid) : itemFrom;
  return filter;
}, from);

export default (state = initialState.draftLabOrderReducer, action) => {
  switch (action.type) {
    case ADD_PANEL_TO_DRAFT_LAB_ORDER: {
      const panelTests = action.orders.setMembers;
      const singleTests = filterThrough(state.singleTests, panelTests);
      const defaultTests = [...state.defaultTests, ...panelTests];
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
      return {
        ...state,
        draftLabOrders: [...state.draftLabOrders, action.order],
        singleTests: [...state.singleTests, action.order],
        selectedTests: [...state.selectedTests, action.order],
        selectedLabPanels: [...state.selectedLabPanels],
      };
    }
    case DELETE_TEST_FROM_DRAFT_LAB_ORDER: {
      const singleTests = state.singleTests.filter(test => test.uuid !== action.order.uuid);
      const selectedTests = state.selectedTests.filter(test => test.uuid !== action.order.uuid);
      const draftLabOrders = state.draftLabOrders.filter(order => order.uuid !== action.order.uuid);
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
      const panel = action.orders;
      const panelTests = action.orders.setMembers;
      const selectedTests = filterThrough(state.selectedTests, panelTests);
      const defaultTests = filterThrough(state.defaultTests, panelTests);
      const selectedLabPanels = filterThrough(state.selectedLabPanels, [panel]);
      return {
        ...state,
        selectedTests,
        defaultTests,
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
