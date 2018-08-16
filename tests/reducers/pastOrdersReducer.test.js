import pastOrdersReducer from '../../app/js/reducers/pastOrdersReducer';
import {
  LOAD_PAST_ORDERS_SUCCESS,
  LOAD_PAST_ORDERS_FAILURE,
  PAST_ORDERS_PAGE_COUNT,
  PAST_ORDERS_RESULT_COUNT,
  LOAD_PAST_ORDERS_LOADING
} from '../../app/js/actions/actionTypes';

const pastOrders = mockData.pastOrders;

describe('Past Orders Reducer', () => {
  it('set state to initial state when no new state is passed',() => {
      const action = {
        type: 'LOAD_PAST_ORDERS_SUCCESS',
        pastOrders,
      };
      const newState =pastOrdersReducer(undefined, action);
      expect(newState).toEqual({ pastOrders, loading: false });
    });

  it('should set past orders fetch error',() => {
    const initialState = {};
    const action = {
      type: 'LOAD_PAST_ORDERS_FAILURE',
      payload:'An error occured',
    };
    const newState =pastOrdersReducer(initialState, action);
    expect(newState.error).toEqual(action.payload);
  });

  it('should set past orders page count',() => {
    const initialState = {};
    const action = {
      type: 'PAST_ORDERS_PAGE_COUNT',
      pageCount: 1
    };
    const newState =pastOrdersReducer(initialState, action);
    expect(newState.pageCount).toEqual(action.pageCount);
  });

  it('should set past orders page count',() => {
    const initialState = {};
    const action = {
      type: 'PAST_ORDERS_RESULT_COUNT',
      pastOrdersResultCount:1
    };
    const newState =pastOrdersReducer(initialState, action);
    expect(newState.pastOrdersResultCount).toEqual(action.pastOrdersResultCount);
  });

  it('should set the loading status for fetching past orders',() => {
    const initialState = {};
    const action = {
      type: 'LOAD_PAST_ORDERS_LOADING',
      status:true
    };
    const newState =pastOrdersReducer(initialState, action);
    expect(newState.loading).toEqual(action.status);
  });
});
