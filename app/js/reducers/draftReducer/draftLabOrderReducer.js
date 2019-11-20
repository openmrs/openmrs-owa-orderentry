import {
  TOGGLE_DRAFT_LAB_ORDER_URGENCY,
  ADD_PANEL_TO_DRAFT_LAB_ORDER,
  ADD_TEST_TO_DRAFT_LAB_ORDER,
  DELETE_TEST_FROM_DRAFT_LAB_ORDER,
  DELETE_PANEL_FROM_DRAFT_LAB_ORDER,
  DELETE_ALL_ITEMS_IN_DRAFT_LAB_ORDER,
} from '../../actions/actionTypes';
import initialState from '../initialState';


/* *Utility -> TODO: Move to utility folder */
/* Filters through two lists taking the first as a predicate */
/* Returns a copy of the first array with all elements of the second array found filtered oout */
const filterThrough = (from, to) => from.reduce((itemFrom, item) => {
  const check = to.map(i => i.uuid).includes(item.uuid);
  const filter = check ? itemFrom.filter(i => i.uuid !== item.uuid) : itemFrom;
  return filter;
}, from);

export default (state = initialState.draftReducer, action) => {
  switch (action.type) {
    case ADD_PANEL_TO_DRAFT_LAB_ORDER: {
      const panelTests = action.orders.setMembers;
      const singleTests = filterThrough(state.draftLabOrders.singleTests, panelTests);
      const defaultTests = [...state.draftLabOrders.defaultTests, ...panelTests];
      const selectedLabPanels = [...state.draftLabOrders.selectedLabPanels, action.orders];
      return {
        ...state,
        draftLabOrders: {
          ...state.draftLabOrders,
          orders: [...selectedLabPanels, ...singleTests],
          selectedTests: [...singleTests, ...defaultTests],
          defaultTests,
          selectedLabPanels,
          singleTests,
        },
      };
    }
    case ADD_TEST_TO_DRAFT_LAB_ORDER: {
      return {
        ...state,
        draftLabOrders: {
          ...state.draftLabOrders,
          orders: [...state.draftLabOrders.orders, action.order],
          singleTests: [...state.draftLabOrders.singleTests, action.order],
          selectedTests: [...state.draftLabOrders.selectedTests, action.order],
        },
      };
    }
    case DELETE_TEST_FROM_DRAFT_LAB_ORDER: {
      const singleTests = state.draftLabOrders.singleTests
        .filter(test => test.uuid !== action.order.uuid);
      const selectedTests = state.draftLabOrders.selectedTests
        .filter(test => test.uuid !== action.order.uuid);
      const orders = state.draftLabOrders.orders
        .filter(order => order.uuid !== action.order.uuid);
      return {
        ...state,
        draftLabOrders: {
          ...state.draftLabOrders,
          orders,
          singleTests,
          selectedTests,
        },
      };
    }

    case TOGGLE_DRAFT_LAB_ORDER_URGENCY: {
      const { orderUuid, orderUrgency } = action.order;
      return {
        ...state,
        draftLabOrders: {
          ...state.draftLabOrders,
          orders: state.draftLabOrders.orders.map((draftOrder) => {
            let order;
            if (draftOrder.uuid === orderUuid) {
              order = { ...draftOrder, urgency: orderUrgency };
            } else {
              order = draftOrder;
            }
            return order;
          }),
          defaultTests: state.draftLabOrders.defaultTests.map((defaultTest) => {
            let test;
            if (defaultTest.uuid === orderUuid) {
              test = { ...defaultTest, urgency: orderUrgency };
            } else {
              test = defaultTest;
            }
            return test;
          }),
          selectedTests: state.draftLabOrders.selectedTests.map((selectedTest) => {
            let test;
            if (selectedTest.uuid === orderUuid) {
              test = { ...selectedTest, urgency: orderUrgency };
            } else {
              test = selectedTest;
            }
            return test;
          }),
          singleTests: state.draftLabOrders.singleTests.map((singleTest) => {
            let test;
            if (singleTest.uuid === orderUuid) {
              test = { ...singleTest, urgency: orderUrgency };
            } else {
              test = singleTest;
            }
            return test;
          }),
          selectedLabPanels: state.draftLabOrders.selectedLabPanels.map((labPanel) => {
            let test;
            if (labPanel.uuid === orderUuid) {
              test = { ...labPanel, urgency: orderUrgency };
            } else {
              test = labPanel;
            }
            return test;
          }),
        },
      };
    }

    case DELETE_PANEL_FROM_DRAFT_LAB_ORDER: {
      const panel = action.orders;
      const panelTests = action.orders.setMembers;
      const selectedTests = filterThrough(state.draftLabOrders.selectedTests, panelTests);
      const defaultTests = filterThrough(state.draftLabOrders.defaultTests, panelTests);
      const selectedLabPanels = filterThrough(state.draftLabOrders.selectedLabPanels, [panel]);
      return {
        ...state,
        draftLabOrders: {
          ...state.draftLabOrders,
          orders: [...selectedLabPanels, ...state.draftLabOrders.singleTests],
          selectedTests,
          defaultTests,
          selectedLabPanels,
        },
      };
    }
    case DELETE_ALL_ITEMS_IN_DRAFT_LAB_ORDER: {
      return {
        ...state,
        draftLabOrders: {
          ...initialState.draftReducer.draftLabOrders,
        },
      };
    }
    default: return state;
  }
};
