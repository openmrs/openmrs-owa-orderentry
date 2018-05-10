import activeOrderReducer from '../../app/js/reducers/activeOrderReducer';
import { FETCH_ACTIVE_ORDER_SUCCESS } from '../../app/js/actions/actionTypes';

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
});
