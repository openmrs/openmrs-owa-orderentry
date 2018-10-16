import fetchAllOrders from '../../app/js/actions/fetchAllOrders';

import {
  FETCH_ORDERS_LOADING,
  FETCH_ORDERS_SUCCESS
} from '../../app/js/actions/actionTypes';
describe('fetchOrders action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const patient = '761d8414-6cb4-4456-be4f-232e6f819e06';
  const uri = 'http://localhost:8081/openmrs-standalone/ws/rest/v1/order?totalCount=true&sort=desc&status=active&patient=82af813c-5118-4ae9-938c-927284453957&v=full&startIndex=10'

  it(`creates FETCH_LAB_ORDERS_LOADING and FETCH_ORDERS_SUCCESS
  action types upon success response from server when uri is passed with no limits`, async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(
        {
          status: 201,
          response: [{}],
        },
      );
    })
    const expectedTypes = [
      FETCH_ORDERS_LOADING,
      FETCH_ORDERS_SUCCESS,
    ];
    const store = mockStore({});
    await store.dispatch(fetchAllOrders(uri, patient));
    const dispatchedActions = store.getActions();
    const actionTypes = dispatchedActions.map(action => action.type);
    expect(actionTypes).toEqual(expectedTypes);
    done();
  });
});

