import fetchOrderSet from '../../../app/js/actions/orderSet/fetchOrderSet';

describe('fetchOrderSet action', () => {
  it('creates FETCH_ORDER_SETS', () => {
    const expectedTypes = [
      'FETCH_ORDER_SETS'
    ];
    const store = mockStore({});
    store.dispatch(fetchOrderSet());
    const dispatchedActions = store.getActions();
    const actionTypes = dispatchedActions.map(action => action.type);
    expect(actionTypes).toEqual(expectedTypes);
  });
});

