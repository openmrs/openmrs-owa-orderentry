import fetchLabOrders from '../../../app/js/actions/labOrders/fetchLabOrders';

describe('fetch lab order action test-suite', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const limit = 10;
  const startIndex = 0;
  const patient = '761d8414-6cb4-4456-be4f-232e6f819e06';

  it(`creates FETCH_LAB_ORDERS_LOADING and FETCH_LAB_ORDERS_SUCCESS
  action types upon success response from server`, async (done) => {
    moxios.stubRequest(
      `${apiBaseUrl}/order?totalCount=true&sort=desc&status=active&patient=${patient}&limit=${limit}&t=testorder&v=full`,
      {
        status: 201,
        response: [{}],
      },
    );
    const expectedAction = [
      {
        type: 'FETCH_LAB_ORDERS_LOADING',
        status: true,
      },
      {
        type: 'FETCH_LAB_ORDERS_SUCCESS',
        orders: [{}],
      },
    ];
    const store = mockStore({});
    await store.dispatch(fetchLabOrders(null, limit, patient));
    expect(store.getActions()).toEqual(expectedAction);
    done();
  });

  it(`creates FETCH_LAB_ORDERS_LOADING and FECTH_LAB_ORDERS_FAILURE
  action types upon error response from server`, async (done) => {
    const errorData = {
      error: {
        message: 'an error occured'
      }
    }
    moxios.stubRequest(
      `${apiBaseUrl}/order?totalCount=true&sort=desc&status=active&patient=${patient}&limit=${limit}&t=testorder&v=full`,
      {
        status: 401,
        response: errorData,
      },
    );

    const expectedAction = [
      {
        type: 'FETCH_LAB_ORDERS_LOADING',
        status: true,
      },
      {
        type: 'FETCH_LAB_ORDERS_FAILURE',
        error: 'an error occured',
      },
    ];

    const store = mockStore({});
    await store.dispatch(fetchLabOrders(null, limit, patient));
    expect(store.getActions()).toEqual(expectedAction);
    done();
  })
});

