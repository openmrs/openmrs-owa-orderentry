import activeOrderReducer from '../../app/js/reducers/activeOrderReducer';
import {
  FETCH_ACTIVE_ORDER_SUCCESS,
  SET_ORDER_ACTION,
  FETCH_ACTIVE_ORDER_FAILURE,
  FETCH_ACTIVE_ORDER_LOADING
} from '../../app/js/actions/actionTypes';

const activeOrders = mockData.defaultpatientActiveOrder;

describe('Active Order Reducer', () => {
  it('should set the state for active order', () => {
    const initialState = {};
    const results = [{}, {}];
    const action = {
      type: FETCH_ACTIVE_ORDER_SUCCESS,
      data: {
        results,
        totalCount: 2,
      },
      meta: {
        limit: 5,
        startIndex: 0
      }
    };
    const newState = activeOrderReducer(initialState, action);
    expect(newState.activeOrders).toEqual(results);
  });
  it('should set active order fetch error', () => {
    const initialState = {};
    const action = {
      type: FETCH_ACTIVE_ORDER_FAILURE,
      payload: 'An error occured',
    };
    const newState = activeOrderReducer(initialState, action);
    expect(newState.status.error).toEqual(true);
    expect(newState.errorMessage).toEqual('An error occured');
  });

  it('should set active order loading status', () => {
    const initialState = {};
    const action = {
      type: FETCH_ACTIVE_ORDER_LOADING,
    };
    const newState = activeOrderReducer(initialState, action);
    expect(newState.status.loading).toEqual(true);
  });

  it('should set the DISCONTINUE action for an order', () => {
    const initialState = {
      activeOrders: [{
        drugName: 'panadol',
        orderNumber: '3'
      }]
    };

    const action = {
      type: SET_ORDER_ACTION,
      action: 'DISCONTINUE',
      orderNumber: '3',
    }
    const newState = activeOrderReducer(initialState, action);
    expect(newState.activeOrders[0].status).toEqual(action.action);
  })

  it('should set the EDIT order action', () => {
    const initialState = {
      activeOrders: [{
        action: 'EDIT',
        drugName: 'panadol',
        orderNumber: '3'
      }]
    };

    const action = {
      type: SET_ORDER_ACTION,
      action: 'EDIT',
      orderNumber: '3',
    };
    const newState = activeOrderReducer(initialState, action);
    expect(newState.activeOrders[0].status).toEqual(action.action);
  });

  it('should set order status to NONE', () => {
    const initialState = {
      activeOrders: [{
        status: 'EDIT',
        drugName: 'panadol',
        orderNumber: '3'
      }]
    };

    const action = {
      type: SET_ORDER_ACTION,
      action: 'EDIT',
    };
    const newState = activeOrderReducer(initialState, action);
    expect(newState.activeOrders[0].status).toEqual('NONE');
  });

  it('should set order status to DRAFT', () => {
    const initialState = {
      activeOrders: [{
        status: 'EDIT',
        drugName: 'panadol',
        orderNumber: '3'
      }]
    };

    const action = {
      type: SET_ORDER_ACTION,
      action: 'DRAFT',
    };
    const newState = activeOrderReducer(initialState, action);
    expect(newState.activeOrders[0].status).toEqual(action.action);
  });

  it('should set order status to DRAFT_EDIT', () => {
    const initialState = {
      activeOrders: [{
        status: 'DRAFT_EDIT',
        drugName: 'panadol',
        orderNumber: '3'
      }]
    };

    const action = {
      type: SET_ORDER_ACTION,
      action: 'DRAFT',
    };
    const newState = activeOrderReducer(initialState, action);
    expect(newState.activeOrders[0].status).toEqual(initialState.activeOrders[0].status);
  });

  it('should set the DISCARD_ONE order action', () => {
    const initialState = {
      activeOrders: [{
        drugName: 'panadol',
        orderNumber: '3',
      }]
    };

    const action = {
      type: SET_ORDER_ACTION,
      action: 'DISCARD_ONE',
      orderNumber: '3',
    };
    const newState = activeOrderReducer(initialState, action);
    expect(newState.activeOrders[0].status).toEqual(action.action);
  });

  it('should set the DISCARD_ALL order action', () => {
    const initialState = {
      activeOrders: [{
        drugName: 'panadol',
        status: 'EDIT'
      }]
    };

    const action = {
      type: SET_ORDER_ACTION,
      action: 'DISCARD_ALL',
    };
    const newState = activeOrderReducer(initialState, action);
    expect(newState.activeOrders[0].status).toEqual(initialState.activeOrders[0].status);
  });

  it('should set the DISCARD_ALL order action for other actions', () => {
    const initialState = {
      activeOrders: [{
        drugName: 'panadol',
        status: 'DISCONTINUE'
      }]
    };

    const action = {
      type: SET_ORDER_ACTION,
      action: 'DISCARD_ALL',
    };
    const newState = activeOrderReducer(initialState, action);
    expect(newState.activeOrders[0].status).toEqual(action.action);
  });

  it('should set the DISCARD_EDIT order action', () => {
    const initialState = {
      activeOrders: [{
        drugName: 'panadol',
        status: 'DISCONTINUE'
      }]
    };

    const action = {
      type: SET_ORDER_ACTION,
      action: 'DISCARD_EDIT',
    };
    const newState = activeOrderReducer(initialState, action);
    expect(newState.activeOrders[0].status).toEqual(initialState.activeOrders[0].status);
  });

  it('should set the DISCARD_EDIT order action for other actions', () => {
    const initialState = {
      activeOrders: [{
        drugName: 'panadol',
        status: 'EDIT'
      }]
    };

    const action = {
      type: SET_ORDER_ACTION,
      action: 'DISCARD_EDIT',
    };
    const newState = activeOrderReducer(initialState, action);
    expect(newState.activeOrders[0].status).toEqual(action.action);
  });

  it('should return the previous state if no order action is fired', () => {
    const initialState = {
      activeOrders: [{
        drugName: 'panadol',
        status: 'EDIT'
      }]
    };

    const action = {
      type: SET_ORDER_ACTION,
    }
    const newState = activeOrderReducer(initialState, action);
    expect(newState.activeOrders).toEqual(initialState.activeOrders);
  });


});
