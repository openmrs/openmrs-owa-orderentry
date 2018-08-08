import {
  GET_LAB_ORDERABLES_SUCCESS,
  GET_LAB_ORDERABLES_FAILURE,
  GET_LAB_ORDERABLES_LOADING
}
from '../../../app/js/actions/actionTypes';

import loading from '../../../app/js/actions/loading';
import getLabOrderablesReducer from '../../../app/js/reducers/labOrders/settingLabOrderableReducer';

describe('getting Lab Orderable reducer', () => {
    let initialState;
    beforeEach(() => {
      initialState = {
        getLabOrderables: '',
        isLoading: false,
        error: '',
      };
    });

    it('should return the initial state', () => {
      const expectedState = getLabOrderablesReducer(initialState, {});
      expect(initialState).toEqual(expectedState);
    });

    it('should handle `GET_LAB_ORDERABLES_LOADING`', () => {
      const status = true;
      const expectedState = {
        getLabOrderables: '',
        isLoading: true,
        error: ''
      };
      const actualState = getLabOrderablesReducer(
        initialState,
        {
          type: GET_LAB_ORDERABLES_LOADING,
          status: true,
        }
      );
      expect(actualState).toEqual(expectedState);
    });

    it('should handle `GET_LAB_ORDERABLES_SUCCESS`', () => {
      const value = 'GYUEwieyfu3894762343';
      const expectedState = {
        getLabOrderables: value,
        isLoading: false,
        error: ''
      };
      const actualState = getLabOrderablesReducer(
        initialState,
        {
          type: GET_LAB_ORDERABLES_SUCCESS,
          value,
        }
      );
      expect(actualState).toEqual(expectedState);
    });

    it('should handle `GET_LAB_ORDERABLES_FAILURE`', () => {
      initialState.isLoading = false;
      const expectedState = {
        getLabOrderables: '',
        isLoading: false,
        error: 'Lab Orderable property not found.'
      };
      const actualState = getLabOrderablesReducer(
        initialState,
        {
          type: GET_LAB_ORDERABLES_FAILURE,
          error: 'Lab Orderable property not found.',
        }
      );
      expect(actualState).toEqual(expectedState);
    });
});
