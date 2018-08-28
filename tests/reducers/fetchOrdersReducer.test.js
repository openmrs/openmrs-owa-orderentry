import fetchOrdersReducer from '../../app/js/reducers/fetchOrdersReducer';

import {
  FETCH_ORDERS_LOADING,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
} from '../../app/js/actions/actionTypes';

describe('fetchorders reducer test-suite', () => {
  const initialState = {
    orders: {},
    errorMessage: '',
    filteredOrders: [],
    status: {
      fetched: false,
      error: false,
      loading: false,
    },
  };
  it(`sets status key loading to true upon action type
  FETCH_ORDERS_LOADING`, () => {
    expect(fetchOrdersReducer(initialState, {
      type: FETCH_ORDERS_LOADING,
    })).toEqual({
      ...initialState,
      status: {
        ...initialState.status,
        loading: true,
      },
    });
  });

  it(`sets status key fetched to true and parses data from payload
  to Orders key on FETCH_ORDERS_SUCCESS`, () => {
    expect(fetchOrdersReducer(initialState, {
      type: FETCH_ORDERS_SUCCESS,
      data: {
        results: [1, 2, 3]
      },
    })).toEqual({
      ...initialState,
      orders: {
        results: [1, 2, 3]
      },
      filteredOrders: [1, 2, 3],
      status: {
        ...initialState.status,
        fetched: true,
      },
    });
  });

  it(`sets status key error to true and parses errormessage from
  payload to  key errorMessage on FETCH_ORDERS_FAILURE`, () => {
    expect(fetchOrdersReducer(initialState, {
      type: FETCH_ORDERS_FAILURE,
      payload: 'an error occured',
    })).toEqual({
      ...initialState,
      errorMessage: 'an error occured',
      status: {
        ...initialState.status,
        error: true,
        loading: false,
      },
    });
  });

  it('filters the data in the results array upon action type SORT_AND_FILTER', () => {
    expect(fetchOrdersReducer(
      {
        ...initialState,
        orders: {
          results: [
            {
              id: 1,
              type: 'drugorder',
            },
            {
              id: 2,
              type: 'testorder',
            },
          ],
        },
        filteredOrders: [
          {
            id: 1,
            type: 'drugorder',
          },
          {
            id: 2,
            type: 'testorder',
          },
        ],
      },
      {
        type: 'SORT_AND_FILTER',
        sortBy: 'type',
        value: 'drugorder',
      },
    )).toEqual({
      ...initialState,
      orders: {
        results: [
          {
            id: 1,
            type: 'drugorder',
          },
          {
            id: 2,
            type: 'testorder',
          },
        ],
      },
      filteredOrders: [
        {
          id: 1,
          type: 'drugorder',
        },
      ],
    });
  });

  it('filters from the original data if the filter array is empty', () => {
    expect(fetchOrdersReducer(
      {
        ...initialState,
        orders: {
          results: [
            {
              id: 1,
              type: 'drugorder',
            },
          ],
        },
        filteredOrders: [],
      },
      {
        type: 'SORT_AND_FILTER',
        sortBy: 'type',
        value: 'drugorder',
      },
    )).toEqual({
      ...initialState,
      orders: {
        results: [
          {
            id: 1,
            type: 'drugorder',
          },
        ],
      },
      filteredOrders: [
        {
          id: 1,
          type: 'drugorder',
        },
      ],
    })
  });

  it('returns all the data if sortQuery value is all and sortBy is type', () => {
    expect(fetchOrdersReducer(
      {
        ...initialState,
        orders: {
          results: [
            {
              id: 1,
              type: 'drugorder',
            },
            {
              id: 2,
              type: 'testorder',
            },
          ],
        },
        filteredOrders: [
          {
            id: 1,
            type: 'drugorder',
          },
        ],
      },
      {
        type: 'SORT_AND_FILTER',
        sortBy: 'type',
        value: 'all',
      },
    )).toEqual({
      ...initialState,
      orders: {
        results: [
          {
            id: 1,
            type: 'drugorder',
          },
          {
            id: 2,
            type: 'testorder',
          },
        ],
      },
      filteredOrders: [
        {
          id: 1,
          type: 'drugorder',
        },
        {
          id: 2,
          type: 'testorder',
        },
      ],
    });
  });

  it('returns initial state if action type is not handled', () => {
    expect(fetchOrdersReducer(initialState, {})).toEqual(initialState);
  });
  it('should remove a discontinued active order from the state', () => {
    expect(fetchOrdersReducer(
      {
        ...initialState,
        filteredOrders: [
          {
            orderNumber: 1,
            drugName: 'sabutamol',
          },
          {
            orderNumber: 2,
            drugName: 'paracetamol',
          },
        ],
      },
      {
        type: 'DISCONTINUE_ACTIVE_DRUG_ORDER',
        orderNumber: 1,
      },
    )).toEqual({
      ...initialState,
      filteredOrders: [
        {
          orderNumber: 2,
          drugName: 'paracetamol',
        },
      ],
    });
  })
});
