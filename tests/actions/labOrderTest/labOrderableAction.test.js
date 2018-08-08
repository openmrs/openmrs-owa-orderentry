import getLabOrderablesConceptSet from '../../../app/js/actions/labOrders/labOrderableAction';
import {
  FETCH_LAB_ORDERABLES_SUCCESS,
  FETCH_LAB_ORDERABLES_FAILURE,
  FETCH_LAB_ORDERABLES_LOADING,
} from '../../../app/js/actions/actionTypes';

describe('getLabOrderable Action', () => {
  beforeEach(() => {
    moxios.install();
  });
  it(`creates FETCH_LAB_ORDERABLES_LOADING and FETCH_LAB_ORDERABLES_SUCCESS
  action types upon success response from server`, () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: []
        }
      });
    });

    const expectedActions = [
      'FETCH_LAB_ORDERABLES_LOADING',
      'FETCH_LAB_ORDERABLES_SUCCESS',
    ];
    const store = mockStore({ labConcepts: [] });
    return store.dispatch(getLabOrderablesConceptSet()).then(() => {
      const dispatchedActions = store.getActions();
      const dispatchedActionTypes = dispatchedActions.map(action => action.type);
      expect(dispatchedActionTypes).toEqual(expectedActions);
    });
  });
  
  afterEach(() => {
    moxios.uninstall();
  });

});
