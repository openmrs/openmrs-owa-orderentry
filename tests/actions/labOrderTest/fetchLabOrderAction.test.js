import fetchLabOrders from '../../../app/js/actions/labOrders/fetchLabOrders';

describe('fetchLabOrders action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const limit = 10;
  const startIndex = 0;
  const patient = '761d8414-6cb4-4456-be4f-232e6f819e06';

  it(`creates FETCH_LAB_ORDERS_LOADING and FETCH_LAB_ORDERS_SUCCESS
  action types upon success response from server when nouri ispassed but with given limits`, async (done) => {
    moxios.stubRequest(
      `${apiBaseUrl}/order?totalCount=true&sort=desc&status=active&patient=${patient}&limit=${limit}&t=testorder&v=full`,
      {
        status: 201,
        response: [{}],
      },
    );
    const expectedTypes = [
      'FETCH_LAB_ORDERS_LOADING',
      'FETCH_LAB_ORDERS_SUCCESS',
    ];
    const store = mockStore({});
    return store.dispatch(fetchLabOrders(null, patient, limit)).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedTypes);
      done();
    });
  });
  it(`creates FETCH_LAB_ORDERS_LOADING and FETCH_LAB_ORDERS_SUCCESS
  action types upon success response from server when uri is passed with no limits`, async (done) => {
    const uri = `${apiBaseUrl}/order?totalCount=true&sort=desc&status=active&patient=${patient}&limit=${limit}&t=testorder&v=full`
    moxios.stubRequest(
      uri,
      {
        status: 201,
        response: [{}],
      },
    );
    const expectedTypes = [
      'FETCH_LAB_ORDERS_LOADING',
      'FETCH_LAB_ORDERS_SUCCESS',
    ];
    const store = mockStore({});
    return store.dispatch(fetchLabOrders(uri, patient)).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedTypes);
      done();
    });
  });
});

