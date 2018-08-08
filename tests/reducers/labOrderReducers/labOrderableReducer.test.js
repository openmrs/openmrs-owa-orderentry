import {
  FETCH_LAB_ORDERABLES_FAILURE,
  FETCH_LAB_ORDERABLES_SUCCESS,
} from "../../../app/js/actions/actionTypes";
import labOrderableReducer from '../../../app/js/reducers/labOrders/labOrderableReducer';

describe('laborderable reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      orderables: [],
      loading: false,
      error: '',
    };
  });

  it('should handle `FETCH_LAB_ORDERABLES_SUCCESS`', () => {
    const data = {
        setMembers: [{ id: 1, display: 'outpatient' }]
    };
    const expectedState = {
      orderables: [{ id: 1, display: 'outpatient' }],
      loading: false,
      error: "",
    };
    const mockAction = {
      type: FETCH_LAB_ORDERABLES_SUCCESS,
      data
    };
    const actualState = labOrderableReducer(initialState, mockAction);
    expect(actualState).toEqual(expectedState);
  });

  it('should handle `FETCH_LAB_ORDERABLES_FAILURE`', () => {
    const error = {
      message: 'Error in connections',
    };
    const expectedState = {
      errorMessage: 'Error in connections',
      orderables: [],
      loading: false,
      error: true,
    };
    const mockAction = {
      type: FETCH_LAB_ORDERABLES_FAILURE,
      payload: 'Error in connections',
    };
    const actualState = labOrderableReducer(initialState, mockAction);
    expect(actualState).toEqual(expectedState);
  });
  it('should handle FETCH_LAB_ORDERABLES_LOADING', () => {
    const action = {
      type: 'FETCH_LAB_ORDERABLES_LOADING',
    };
    const mockState = labOrderableReducer(initialState, action)
    expect(mockState.status.loading).toEqual(true);
  });
});
