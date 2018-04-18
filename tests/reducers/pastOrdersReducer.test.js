import pastOrdersReducer from '../../app/js/reducers/pastOrdersReducer';

const pastOrders = mockData.pastOrders;

describe('Past Orders Reducer', () => {
  it('set state to initial state when no new state is passed',
    () => {
      const action = {
        type: 'LOAD_PAST_ORDERS_SUCCESS',
        pastOrders,
      };
      const newState =pastOrdersReducer(undefined, action);
      expect(newState).toEqual({ pastOrders });
    });
});
