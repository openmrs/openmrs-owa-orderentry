import draftDrugOrderReducer from '../../../app/js/reducers/draftReducer/draftDrugOrderReducer';

import {
  ADD_DRAFT_DRUG_ORDER_SUCCESS,
  DELETE_DRAFT_DRUG_ORDER_SUCCESS,
  DELETE_ALL_DRAFT_DRUG_ORDERS_SUCCESS,
} from '../../../app/js/actions/actionTypes';


describe('Draft Table Reducer', () => {
  it('should set the state of a successful added draft order', () => {
    const initialState = {
      draftDrugOrders: []
    };

    const order = {
      action: 'DISCONTINUE',
      drugName: 'panadol',
      orderNumber: 3
    };

    const action = {
      type: ADD_DRAFT_DRUG_ORDER_SUCCESS,
      order,
    }

    const newState = draftDrugOrderReducer(initialState, action);
    expect(newState.draftDrugOrders).toEqual(
      expect.arrayContaining([action.order])
    );
  });

  it('should set the state of a successful deleted draft order', () => {
    const initialState = {
      draftDrugOrders: [{
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
      type: DELETE_DRAFT_DRUG_ORDER_SUCCESS,
      order,
    }

    const newState = draftDrugOrderReducer(initialState, action);
    expect(newState.draftDrugOrders).toEqual(
      expect.arrayContaining([])
    )
  });

  it('should set the state of successful deleted draft orders', () => {
    const initialState = {
      draftDrugOrders: [{
        action: 'DISCONTINUE',
        drugName: 'panadol',
        orderNumber: 3
      }]
    };

    const action = {
      type: DELETE_ALL_DRAFT_DRUG_ORDERS_SUCCESS,
    }

    const newState = draftDrugOrderReducer(initialState, action);
    expect(newState.draftDrugOrders).toEqual(
      expect.arrayContaining([])
    )
  });
});
