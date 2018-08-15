import fetchOrdersReducer from '../../app/js/reducers/fetchOrdersReducer';

import {
  FETCH_ORDERS_LOADING,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE
} from '../../app/js/actions/actionTypes';
describe('fetchorders reducer test-suite', () => {
  const initialState = {
    orders: {},
    errorMessage: '',
    status: {
      fetched: false,
      error: false,
      loading: false,
    },
  };
  it(`sets status key loading to true upon action type
  FETCH_ORDERS_LOADING`, () => {
    expect(fetchOrdersReducer(
      initialState,
      {
        type: FETCH_ORDERS_LOADING,
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
  to Orders key on FETCH_ORDERS_SUCCESS`, () => {
    expect(fetchOrdersReducer(
      initialState,
      {
        type: FETCH_ORDERS_SUCCESS,
        data: [ 1, 2, 3],
      }
    )).toEqual(
      {
        ...initialState,
        orders: [1, 2, 3],
        status: {
          ...initialState.status,
          fetched: true,
        }
      }
    )
  })

  it(`sets status key error to true and parses errormessage from
  payload to  key errorMessage on FETCH_ORDERS_FAILURE`, () => {
    expect(fetchOrdersReducer(
      initialState,
      {
        type: FETCH_ORDERS_FAILURE,
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
    expect(fetchOrdersReducer(initialState, {})).toEqual(initialState);
  })
})

