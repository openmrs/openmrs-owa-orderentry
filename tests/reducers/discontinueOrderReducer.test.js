import discontinueOrderReducer from '../../app/js/reducers/discontinueOrderReducer';
import {
  DISCONTINUE_ORDER_FAILURE,
  DISCONTINUE_ORDER_SUCCESS
} from '../../app/js/actions/actionTypes';

const activeOrders = mockData.defaultpatientActiveOrder.activeOrders;
const pastOrders = mockData.pastOrders;
const error = mockData.defaultSettingEncounterType.error;

describe('Discontinue Order Reducer', () => {
  it('should set the state of a successful discontinued order', () => {
    const initialState = {
      activeOrders: [],
      pastOrders: {}
    };

    const action = {
      type: DISCONTINUE_ORDER_SUCCESS,
      activeOrders,
      pastOrders,
      status: false
    }

    const newState = discontinueOrderReducer(initialState, action);
    expect(newState.activeOrders).toEqual(activeOrders);
    expect(newState.pastOrders).toEqual(pastOrders);
  });

  it('should set the state of a failed discontinued order', () => {
    const initialState = {};

    const action = {
      type: DISCONTINUE_ORDER_FAILURE,
      error: ''
    }

    const newState = discontinueOrderReducer(initialState, action);
    expect(newState.error).toEqual(error);
  });
});
