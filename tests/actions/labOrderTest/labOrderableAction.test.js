import {
  getLabOrderable,
  fetchLabOrderablesFailure
} from '../../../app/js/actions/labOrders/labOrderableAction';
import {
  FETCH_LAB_ORDERABLES_SUCCESS,
  FETCH_LAB_ORDERABLES_FAILURE,
  FETCH_LAB_ORDERABLES_LOADING,
} from '../../../app/js/actions/actionTypes';

describe ('Getting Lab orderables action', () => {
  it('should create an action to log failure', () => {
    const error = 'No network connection';
    const expectedAction = {
      type: FETCH_LAB_ORDERABLES_FAILURE,
      error
    };
    expect(fetchLabOrderablesFailure(error)).toEqual(expectedAction);
  });

  describe ('Lab Orderable API call', () => {
    beforeEach(() => {
      moxios.install();
    });

    it ('should dispatch `FETCH_LAB_ORDERABLE_SUCCESS` after sucessfull fetching', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            data: []
          },
        });
      });

      const expectedActions = [
        FETCH_LAB_ORDERABLES_LOADING,
        FETCH_LAB_ORDERABLES_LOADING,
        FETCH_LAB_ORDERABLES_SUCCESS
      ];

      const store = mockStore({ configurations: []});

      return store.dispatch(getLabOrderable()).then(() => {
        const dispatchedActions = store.getActions();
        const dispatchedActionTypes = dispatchedActions.map(action => action.type);
        expect(dispatchedActionTypes).toEqual(expectedActions);
      });
    });

    it ('should dispatch `FETCH_LAB_ORDERABLE_FAILURE` after throwing an error', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 201,
          response: {
            data: []
          },
          statusText: 'Error in connection',
        });
      });

      const expectedActions = [
        FETCH_LAB_ORDERABLES_LOADING,
        FETCH_LAB_ORDERABLES_LOADING,
        FETCH_LAB_ORDERABLES_FAILURE
      ];

        const store = mockStore({ configurations: []});

        return store.dispatch(getLabOrderable()).then(() => {
          const dispatchedActions = store.getActions();
          const dispatchedActionTypes = dispatchedActions.map(action => action.type);
          expect(dispatchedActionTypes).toEqual(expectedActions);
        });
    });

    it ('should dispatch `FETCH_LAB_ORDERABLE_FAILURE` when unauthorized', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({
          status: 401,
          response: {
            message: 'Not authorised',
          },
          statusText: 'unauthorised'
        });
      });

      const expectedActions = [
        FETCH_LAB_ORDERABLES_LOADING,
        FETCH_LAB_ORDERABLES_LOADING,
        FETCH_LAB_ORDERABLES_FAILURE
      ];

      const store = mockStore({ configurations: []});

      return store.dispatch(getLabOrderable()).then(() => {
        const dispatchedActions = store.getActions();
        const dispatchedActionTypes = dispatchedActions.map(action => action.type);
        expect(dispatchedActionTypes).toEqual(expectedActions);
      });
    });

    afterEach(() => {
      moxios.uninstall();
    });
  });
});
