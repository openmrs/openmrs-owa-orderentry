import createLabOrderReducer from '../../app/js/reducers/createLabOrderReducer';

describe('createLabOrder reducer test suite', () => {
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
      error: 'Invalid data',
    };
    expect(createLabOrderReducer(initialState, action)).toEqual({
      ...initialState,
      errorMessage: action.error,
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
    expect(createLabOrderReducer(initialState, action)).toEqual({
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
    expect(createLabOrderReducer(initialState, action)).toEqual(initialState);
  });
});
