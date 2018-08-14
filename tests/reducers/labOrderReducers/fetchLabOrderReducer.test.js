import fetchLabOrderReducer from '../../../app/js/reducers/labOrders/fetchLabOrderReducer';

describe('fetchlaborder reducer test-suite', () => {
  const initialState = {
    labOrders: {},
    errorMessage: '',
    status: {
      fetched: false,
      error: false,
      loading: false,
    },
  };
  it(`sets status key loading to true upon action type
  FETCH_LAB_ORDERS_LOADING`, () => {
    expect(fetchLabOrderReducer(
      initialState,
      {
        type: 'FETCH_LAB_ORDERS_LOADING',
      }
    )).toEqual(
      {
        ...initialState,
        status: {
          ...initialState.status,
          loading: true,
        }
      }
    )
  });

  it(`sets status key fetched to true and parses data from payload
  to labOrders key on FETCH_LAB_ORDERS_SUCCESS`, () => {
    expect(fetchLabOrderReducer(
      initialState,
      {
        type: 'FETCH_LAB_ORDERS_SUCCESS',
        data: [ 1, 2, 3],
      }
    )).toEqual(
      {
        ...initialState,
        labOrders: [1, 2, 3],
        status: {
          ...initialState.status,
          fetched: true,
        }
      }
    )
  })

  it(`sets status key error to true and parses errormessage from
  payload to  key errorMessage on FETCH_LAB_ORDERS_FAILURE`, () => {
    expect(fetchLabOrderReducer(
      initialState,
      {
        type: 'FETCH_LAB_ORDERS_FAILURE',
        payload: 'an error occured',
      },
    )).toEqual(
      {
        ...initialState,
        errorMessage: 'an error occured',
        status: {
          ...initialState.status,
          error: true,
          loading: false,
        }
      }
    )
  })

  it('returns initial state if action type is not handled', () => {
    expect(fetchLabOrderReducer(initialState, {})).toEqual(initialState);
  })
})

