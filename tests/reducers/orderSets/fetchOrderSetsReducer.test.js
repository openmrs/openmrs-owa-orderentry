import fetchOrderSetsReducer from '../../../app/js/reducers/orderSets/fetchOrderSetsReducer';

describe('fetchOrderSetsReducer reducer test-suite', () => {
  const initialState = {
    orderSets: [],
    status: {
      fetched: false,
      error: false,
      loading: false,
    },
  };
     
  it(`sets status key fetched to true and passes data from payload
  to orderSets key on FETCH_ORDER_SETS`, () => {
    expect(fetchOrderSetsReducer(
      initialState,
      {
        type: 'FETCH_ORDER_SETS',
        payload: [ 1, 2, 3],
      }
    )).toEqual(
      {
        ...initialState,
        orderSets: [1, 2, 3],
        status: {
          ...initialState.status,
          fetched: true,
        }
      }
    )
  })

  it('returns initial state if action type is not handled', () => {
    expect(fetchOrderSetsReducer(initialState, {})).toEqual(initialState);
  })
})

