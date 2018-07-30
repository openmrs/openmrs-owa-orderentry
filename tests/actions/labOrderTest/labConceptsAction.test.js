import {
  fetchLabConceptsSuccess,
  fetchLabConceptsFailure,
  fetchLabConcepts
} from '../../../app/js/actions/labOrders/labConceptsAction';
import {
  FETCH_LAB_CONCEPTS_SUCCESS,
  FETCH_LAB_CONCEPTS_FAILURE,
  FETCH_LAB_CONCEPTS_LOADING,
} from '../../../app/js/actions/actionTypes';

describe('Getting Lab Concepts action', () => {
  it('should create an action of type `FETCH_LAB_CONCEPTS_FAILURE` ', () => {
    const error = 'No network connection';
    const expectedAction = {
      type: FETCH_LAB_CONCEPTS_FAILURE,
      payload: error
    };
    expect(fetchLabConceptsFailure(error)).toEqual(expectedAction);
  });

  describe('Lab Concepts API call', () => {
    beforeEach(() => {
      moxios.install();
    });
    it('should dispatch `FETCH_LAB_CONCEPTS_SUCCESS` after sucessfull fetching', () => {
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
        FETCH_LAB_CONCEPTS_LOADING,
        FETCH_LAB_CONCEPTS_LOADING,
        FETCH_LAB_CONCEPTS_SUCCESS,
      ];
      const store = mockStore({ labConcepts: [] });
      return store.dispatch(fetchLabConcepts()).then(() => {
        const dispatchedActions = store.getActions();
        const dispatchedActionTypes = dispatchedActions.map(action => action.type);
        expect(dispatchedActionTypes).toEqual(expectedActions);
      });
    });
    it('should dispatch `FETCH_ORDER_CONFIG_FAILURE` when unauthorized', () => {
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
        FETCH_LAB_CONCEPTS_LOADING,
        FETCH_LAB_CONCEPTS_LOADING,
        FETCH_LAB_CONCEPTS_FAILURE,
      ];
      const store = mockStore({ labConcepts: [] });
      return store.dispatch(fetchLabConcepts()).then(() => {
        const dispatchedActions = store.getActions();
        const dispatchedActionTypes = dispatchedActions.map(action => action.type);
        expect(dispatchedActionTypes).toEqual(expectedActions);
      });
    });
    it ('should throw an error if status code is not 200', () => {
      moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
              status: 204,
              response: {
                  statusText: 'failed'
              },
          });
      });
      const expectedActions = [
        FETCH_LAB_CONCEPTS_LOADING,
        FETCH_LAB_CONCEPTS_LOADING,
        FETCH_LAB_CONCEPTS_FAILURE,
      ];
      const store = mockStore({ labConcepts: []});
      return store.dispatch(fetchLabConcepts()).then(() => {
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

