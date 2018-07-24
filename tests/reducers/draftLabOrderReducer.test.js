import draftLabOrderReducer from '../../app/js/reducers/draftLabOrderReducer';
import {
  ADD_DRAFT_LAB_ORDER,
  DELETE_DRAFT_LAB_ORDER
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
});
