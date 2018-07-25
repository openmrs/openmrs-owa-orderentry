import {
  ADD_DRAFT_LAB_ORDER,
  DELETE_DRAFT_LAB_ORDER,
  DELETE_ALL_DRAFT_LAB_ORDERS,
  TOGGLE_DRAFT_LAB_ORDER_URGENCY,
} from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.draftLabOrderReducer, action) => {
  switch (action.type) {
    case ADD_DRAFT_LAB_ORDER: {
      let incomingActionOrder;
      if (state.draftLabOrders.length > 0) {
        state.draftLabOrders.map((draftOrder) => {
          incomingActionOrder = action.orders.filter(order => draftOrder.id !== order.id);
          return incomingActionOrder;
        });
        return {
          ...state,
          draftLabOrders: [...state.draftLabOrders, ...incomingActionOrder],
        };
      }
      return {
        ...state,
        draftLabOrders: [...state.draftLabOrders, ...action.orders],
      };
    }
    case DELETE_DRAFT_LAB_ORDER: {
      const isOrderIds = action.orders.map(order => order.id);
      return {
        ...state,
        draftLabOrders: state.draftLabOrders.filter((draftOrder, index) =>
          !isOrderIds.includes(draftOrder.id)),
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
    default: return state;
  }
};
