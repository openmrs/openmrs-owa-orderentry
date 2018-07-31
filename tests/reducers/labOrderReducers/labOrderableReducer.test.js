import {
  FETCH_LAB_ORDERABLES_FAILURE,
  FETCH_LAB_ORDERABLES_SUCCESS,
} from "../../../app/js/actions/actionTypes";
import labOrderableReducer from '../../../app/js/reducers/labOrders/labOrderableReducer';

describe('Lab order reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      orderables: [],
      loading: false,
      error: '',
    };
  });

  it('should handle `FETCH_LAB_ORDERABLES_SUCCESS`', () => {
    const orderables = {
      setMembers: [{ id: 1, display: 'outpatient' }]
    };
    const expectedState = {
      orderables: [{ id: 1, display: 'outpatient' }],
      loading: false,
      error: '',
    };
    const mockAction = {
      type: FETCH_LAB_ORDERABLES_SUCCESS,
      orderables
    };
    const actualState = labOrderableReducer(initialState, mockAction);
    expect(actualState).toEqual(expectedState);
  });

  it('should handle `FETCH_LAB_ORDERABLES_FAILURE`', () => {
    const error = {
      message: 'Error in connections',
    };
    const expectedState = {
      orderables: [],
      loading: false,
      error: {
        message: 'Error in connections',
      },
    };
    const mockAction = {
      type: FETCH_LAB_ORDERABLES_FAILURE,
      error
    };
    const actualState = labOrderableReducer(initialState, mockAction);
    expect(actualState).toEqual(expectedState);
  });
});
