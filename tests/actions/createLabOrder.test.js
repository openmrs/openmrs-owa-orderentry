import createLabOrder from '../../app/js/actions/createLabOrder';

describe('createLabOrder action test-suite', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it(`creates CREATE_LAB_ORDER_LOADING and CREATE_LAB_ORDER_FAILURE
  action types upon error response from server`, async (done) => {
    const errorData = {
      error: {
        message: 'invalid submission',
      },
    };

    const request = moxios.requests.mostRecent();
    moxios.stubRequest(`${apiBaseUrl}/ordertype`, {
      status: 401,
      response: errorData,
    });

    const expectedActions = [
      {
        type: 'CREATE_LAB_ORDER_LOADING',
        status: true,
      },
      {
        type: 'CREATE_LAB_ORDER_LOADING',
        status: false,
      },
      {
        type: 'CREATE_LAB_ORDER_FAILURE',
        error: 'invalid submission',
      },
    ];

    const store = mockStore({});
    await store.dispatch(createLabOrder());
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it(`creates CREATE_LAB_ORDER_LOADING and CREATE_LAB_ORDER_SUCCESS
  action types upon successfull response from server`, async (done) => {
    const request = moxios.requests.mostRecent();
    moxios.stubRequest(`${apiBaseUrl}/ordertype`, {
      status: 201,
      response: 'lab order successfully created',
    });

    const expectedActions = [
      {
        type: 'CREATE_LAB_ORDER_LOADING',
        status: true,
      },
      {
        type: 'CREATE_LAB_ORDER_SUCCESS',
        data: 'lab order successfully created',
      },
      {
        type: 'CREATE_LAB_ORDER_LOADING',
        status: false,
      },
    ];

    const store = mockStore({});
    await store.dispatch(createLabOrder());
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });
});
