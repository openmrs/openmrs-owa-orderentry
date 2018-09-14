import createOrderReducer from '../../app/js/reducers/createOrderReducer';

describe('createOrder reducer test suite', () => {
  const initialState = {
    labOrderData: {},
    errorMessage: '',
    status: {
      error: false,
      added: true,
    },
  };

  it(`sets status key error to true and sets key errorMessage to
  error message from payload on action type SAVE_DRAFT_LAB_ORDER_FAILURE `, () => {
    const action = {
      type: 'SAVE_DRAFT_LAB_ORDER_FAILURE',
      payload: 'Invalid data',
    };
    expect(createOrderReducer(initialState, action)).toEqual({
      ...initialState,
      errorMessage: 'Invalid data',
      status: {
        added: false,
        error: true,
      },
    });
  });

  it(`parses data from payload to key labOrderData and sets staus key
  added to true on action type SAVE_DRAFT_LAB_ORDER_SUCCESS `, () => {
    const data = {
      id: 1,
      name: 'Lab order',
      description: 'amoxycillinn tests',
    };
    const action = {
      type: 'SAVE_DRAFT_LAB_ORDER_SUCCESS',
      data,
    };
    expect(createOrderReducer(initialState, action)).toEqual({
      ...initialState,
      labOrderData: action.data,
      status: {
        error: false,
        added: true,
      },
    });
  });

  it('returns initial state if action type is not handled', () => {
    const action = {
      type: 'SAVE_DRAFT_LAB_ORDER',
    };
    expect(createOrderReducer(initialState, action)).toEqual(initialState);
  });
  it('should handle SAVE_DRAFT_LAB_ORDER_LOADING', () => {
    const action = {
      type: 'SAVE_DRAFT_LAB_ORDER_LOADING',
    };
    const mockState = createOrderReducer(initialState, action)
    expect(mockState.status.loading).toEqual(true);
  });
});
