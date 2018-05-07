import activeOrderReducer from '../../app/js/reducers/activeOrderReducer';
import { FETCH_ACTIVE_ORDER_SUCCESS, SET_ORDER_ACTION } from '../../app/js/actions/actionTypes';

const activeOrders = mockData.defaultpatientActiveOrder;

describe('Active Order Reducer', () => {
  it('should set the state for active order', () => {
    const initialState = {};

    const action = {
      type: FETCH_ACTIVE_ORDER_SUCCESS,
      results:{}
    };

    const newState = activeOrderReducer(initialState, action);
    expect(newState.activeOrders).toEqual(action.results);
  });

  it('should set the action for an order', () => {
    const initialState = {
      activeOrders: [{
        action: 'DISCONTINUE',
        drugName: 'panadol',
        orderNumber: '3'
      }]
    };

    const action = {
      SET_ORDER_ACTION,
      action: 'NONE',
      orderNumber: '3',
    }

    const newState = activeOrderReducer(initialState, action);
    expect(newState.activeOrders).toEqual(expect.arrayContaining([
      expect.objectContaining({ orderNumber: action.orderNumber })
    ]));
  })
});
