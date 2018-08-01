import createLabOrder from '../../app/js/actions/createLabOrder';

describe('createLabOrder action test-suite', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it(`creates SAVE_DRAFT_LAB_ORDER_LOADING and SAVE_DRAFT_LAB_ORDER_FAILURE
  action types upon error response from server`, async (done) => {
    const errorData = {
      error: {
        message: 'invalid submission',
      },
    };

    const request = moxios.requests.mostRecent();
    moxios.stubRequest(`${apiBaseUrl}/encounter`, {
      status: 401,
      response: errorData,
    });

    const order = {
      order: 'testorder',
      concept: 'fkhfffkfjhf'
    }

    const expectedActions = [
      {
        type: 'SAVE_DRAFT_LAB_ORDER_LOADING',
        status: true,
      },
      {
        type: 'SAVE_DRAFT_LAB_ORDER_LOADING',
        status: false,
      },
      {
        type: 'SAVE_DRAFT_LAB_ORDER_FAILURE',
        error: 'invalid submission',
      },
    ];

    const store = mockStore({});
    await store.dispatch(createLabOrder(order));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it(`creates SAVE_DRAFT_LAB_ORDER_LOADING and SAVE_DRAFT_LAB_ORDER_SUCCESS
  action types upon successfull response from server`, async (done) => {
    const request = moxios.requests.mostRecent();
    moxios.stubRequest(`${apiBaseUrl}/encounter`, {
      status: 201,
      response: 'lab order successfully created',
    });

    const expectedActions = [
      {
        type: 'SAVE_DRAFT_LAB_ORDER_LOADING',
        status: true,
      },
      {
        type: 'SAVE_DRAFT_LAB_ORDER_SUCCESS',
        data: 'lab order successfully created',
      },
      {
        type: 'SAVE_DRAFT_LAB_ORDER_LOADING',
        status: false,
      },
    ];

    const order = {
      order: 'testorder',
      concept: 'fkhfffkfjhf'
    }

    const store = mockStore({});
    await store.dispatch(createLabOrder(order));
    expect(store.getActions()).toEqual(expectedActions);
    done()
  });
});
