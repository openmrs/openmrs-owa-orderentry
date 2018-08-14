import {
  getLabOrderablesSuccess,
  getLabOrderablesFailure,
  getLabOrderables,
} from '../../../app/js/actions/labOrders/settingLabOrderableAction';
import {
  GET_LAB_ORDERABLES_SUCCESS,
  GET_LAB_ORDERABLES_FAILURE,
  FETCH_LAB_ORDERABLES_LOADING,
  GET_LAB_ORDERABLES_LOADING,
  NETWORK_ERROR
} from '../../../app/js/actions/actionTypes';

describe ('Get the lab orderable uuid actions', () => {
  it('should create an action to store fetched lab Orderable uuid', () => {
    const value = 'rhga48376bewf467384b';
    const expectedAction = {
      type: GET_LAB_ORDERABLES_SUCCESS,
      value
    };
    expect(getLabOrderablesSuccess(value)).toEqual(expectedAction);
  });

  it('should create an action to log failure', () => {
    const error = 'No network connection';
    const expectedAction = {
      type: GET_LAB_ORDERABLES_FAILURE,
      error
    };
    expect(getLabOrderablesFailure(error)).toEqual(expectedAction);
  });

  describe ('Get setting for Lab orderable API call', () => {
    const uuid = 'rhga48376bewf467384b';
    beforeEach(() => {
        moxios.install();
    });

    it ('should dispatch `GET_LAB_ORDERABLES_SUCCESS` after sucessful fetching', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            results: uuid
          },
        });
      });

      const expectedActions = [
        GET_LAB_ORDERABLES_LOADING,
        GET_LAB_ORDERABLES_SUCCESS,
        FETCH_LAB_ORDERABLES_LOADING,
        GET_LAB_ORDERABLES_LOADING,
      ];
      
      const store = mockStore({ setting: {}});

      return store.dispatch(getLabOrderables()).then(() => {
          const dispatchedActions = store.getActions();
          const dispatchedActionTypes = dispatchedActions.map(action => action.type);
          expect(dispatchedActionTypes).toEqual(expectedActions);
      });
    });
    it ('should return a network error when reponse result is empty', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            data: {
              results: [],
            },
          },
        });
      });

      const expectedActions = [
        GET_LAB_ORDERABLES_LOADING,
        NETWORK_ERROR,
        GET_LAB_ORDERABLES_LOADING,
      ];
      
      const store = mockStore({ setting: {}});

      return store.dispatch(getLabOrderables()).then(() => {
          const dispatchedActions = store.getActions();
          const dispatchedActionTypes = dispatchedActions.map(action => action.type);
          expect(dispatchedActionTypes).toEqual(expectedActions);
      });
    });

    it ('should dispatch `GET_LAB_ORDERABLES_FAILURE` after an error', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
          response: {
            error: 'Not authorised'
          },
        });
      });

      const expectedActions = [
        GET_LAB_ORDERABLES_LOADING,
        GET_LAB_ORDERABLES_FAILURE,
        GET_LAB_ORDERABLES_LOADING,
      ];
      
      const store = mockStore({ setting: {}});

      return store.dispatch(getLabOrderables()).then(() => {
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
