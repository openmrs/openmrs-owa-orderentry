import activeOrderReducer from '../../app/js/reducers/activeOrderReducer';
import {
  FETCH_ACTIVE_ORDER_SUCCESS,
  SET_ORDER_ACTION,
  FETCH_ACTIVE_ORDER_ERROR,
  FETCH_ACTIVE_ORDER_LOADING
} from '../../app/js/actions/actionTypes';

const activeOrders = mockData.defaultpatientActiveOrder;

describe('Active Order Reducer', () => {
  it('should set the state for active order', () => {
    const initialState = {};
    const action = {
      type: FETCH_ACTIVE_ORDER_SUCCESS,
      results: [],
      pageCount: 1,
      showResultCount: '',
    };
    const newState = activeOrderReducer(initialState, action);
    expect(newState.activeOrders).toEqual(action.results);
    expect(newState.pageCount).toEqual(action.pageCount);
    expect(newState.showResultCount).toEqual(action.showResultCount);
  });
  it('should set active order fetch error', () => {
    const initialState = {};
    const action = {
      type: FETCH_ACTIVE_ORDER_ERROR,
      error: 'An error occured',
      activeOrders: [],
    };
    const newState = activeOrderReducer(initialState, action);
    expect(newState.activeOrders).toEqual(action.activeOrders);
    expect(newState.error).toEqual(action.error);
  });

  it('should set active order loading status', () => {
    const initialState = {};
    const action = {
      type: FETCH_ACTIVE_ORDER_LOADING,
      status: true
    };
    const newState = activeOrderReducer(initialState, action);
    expect(newState.loading).toEqual(action.status);
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
