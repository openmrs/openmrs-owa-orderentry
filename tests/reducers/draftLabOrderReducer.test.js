import draftLabOrderReducer from '../../app/js/reducers/draftLabOrderReducer';
import {
  ADD_DRAFT_LAB_ORDER,
  DELETE_DRAFT_LAB_ORDER,
  TOGGLE_DRAFT_LAB_ORDER_URGENCY
} from '../../app/js/actions/actionTypes';


describe('Draft Lab Order Reducer', () => {
  it('should set the state of a successful added draft lab order', () => {
    const initialState = {
      draftLabOrders: []
    };

    const orders = [
      { id: 1, test: 'Hemoglobin' },
      { id: 2, test: 'Hematocrit' },
      { id: 3, test: 'blood' },
    ];

    const action = {
      type: ADD_DRAFT_LAB_ORDER,
      orders,
    }

    const newState = draftLabOrderReducer(initialState, action);
    expect(newState.draftLabOrders.length).toEqual(3);
  });

  it('should eliminate a value that already exists in the store', () => {
    const initialState = {
      draftLabOrders: [
        { id: 1, test: 'Hemoglobin' },
        { id: 2, test: 'Hematocrit' },
        { id: 3, test: 'blood' },
      ]
    };

    const orders = [
      { id: 1, test: 'Hemoglobin' },
    ];

    const action = {
      type: ADD_DRAFT_LAB_ORDER,
      orders
    }

    const newState = draftLabOrderReducer(initialState, action);
    expect(newState.draftLabOrders.length).toEqual(4);
  });

  it('should set the state of successful deleted draft orders', () => {
    const initialState = {
      draftLabOrders: [
        { id: 1, test: 'Hemoglobin' },
        { id: 2, test: 'Hematocrit' },
        { id: 3, test: 'blood' },
      ]
    };

    const orders = [
      { id: 1, test: 'Hemoglobin' },
    ];

    const action = {
      type: DELETE_DRAFT_LAB_ORDER,
      orders
    }

    const newState = draftLabOrderReducer(initialState, action);
    expect(newState.draftLabOrders.length).toEqual(2)
  });

  it('should set the toggle of the urgency of a draft order to "routine"', () => {
    const initialState = {
      draftLabOrders: [
        { id: 1, test: 'Hemoglobin', urgency: 'STAT'},
        { id: 2, test: 'Hematocrit', urgency: 'routine'},
        { id: 3, test: 'blood', urgency: 'routine' },
      ]
    };

    const order = { orderId: 1, orderUrgency: 'routine' };

    const action = {
      type: TOGGLE_DRAFT_LAB_ORDER_URGENCY,
      order
    }

    const newState = draftLabOrderReducer(initialState, action);
    expect(newState.draftLabOrders[0]).toEqual({ id: 1, test: 'Hemoglobin', urgency: 'routine'})
  });

  it('should set the toggle of the urgency of a draft order to "STAT"', () => {
    const initialState = {
      draftLabOrders: [
        { id: 1, test: 'Hemoglobin', urgency: 'STAT'},
        { id: 2, test: 'Hematocrit', urgency: 'routine'},
        { id: 3, test: 'blood' },
      ]
    };

    const order = { orderId: 2, orderUrgency: 'STAT' };
    

    const action = {
      type: TOGGLE_DRAFT_LAB_ORDER_URGENCY,
      order
    }

    const newState = draftLabOrderReducer(initialState, action);
    expect(newState.draftLabOrders[1]).toEqual({ id: 2, test: 'Hematocrit', urgency: 'STAT'})
  });
});
