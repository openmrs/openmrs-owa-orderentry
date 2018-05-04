import draftTableReducer from '../../app/js/reducers/draftTableReducer';
import {
  ADD_DRAFT_ORDER_SUCCESS,
  DELETE_DRAFT_ORDER_SUCCESS,
  DELETE_ALL_DRAFT_ORDERS_SUCCESS,
} from '../../app/js/actions/actionTypes';


describe('Draft Table Reducer', () => {
  it('should set the state of a successful added draft order', () => {
    const initialState = {
      draftOrders: []
    };

    const order = {
      action: 'DISCONTINUE',
      drugName: 'panadol',
      orderNumber: 3
    };

    const action = {
      type: ADD_DRAFT_ORDER_SUCCESS,
      order,
    }

    const newState = draftTableReducer(initialState, action);
    expect(newState.draftOrders).toEqual(
      expect.arrayContaining([action.order])
    );
  });

  it('should set the state of a successful deleted draft order', () => {
    const initialState = {
      draftOrders: [{
        action: 'DISCONTINUE',
        drugName: 'panadol',
        orderNumber: 3
      }]
    };

    const order = {
      action: 'DISCONTINUE',
      drugName: 'panadol',
      orderNumber: 3
    };

    const action = {
      type: DELETE_DRAFT_ORDER_SUCCESS,
      order,
    }

    const newState = draftTableReducer(initialState, action);
    expect(newState.draftOrders).toEqual(
      expect.arrayContaining([])
    )
  });

  it('should set the state of successful deleted draft orders', () => {
    const initialState = {
      draftOrders: [{
        action: 'DISCONTINUE',
        drugName: 'panadol',
        orderNumber: 3
      }]
    };

    const action = {
      type: DELETE_ALL_DRAFT_ORDERS_SUCCESS,
    }

    const newState = draftTableReducer(initialState, action);
    expect(newState.draftOrders).toEqual(
      expect.arrayContaining([])
    )
  });
});
