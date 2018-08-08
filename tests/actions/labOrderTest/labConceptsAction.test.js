import fetchLabConcepts from '../../../app/js/actions/labOrders/labConceptsAction';
import {
  FETCH_LAB_CONCEPTS_SUCCESS,
  FETCH_LAB_CONCEPTS_FAILURE,
  FETCH_LAB_CONCEPTS_LOADING,
} from '../../../app/js/actions/actionTypes';

describe('Getting Lab Concepts action', () => {
  describe('Lab Concepts API call', () => {
    beforeEach(() => {
      moxios.install();
    });
    it('creates FETCH_LAB_CONCEPTS_SUCCESS and FETCH_LAB_CONCEPTS_SUCCESS after sucessfully fetching', () => {
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
        FETCH_LAB_CONCEPTS_SUCCESS,
      ];
      const store = mockStore({ labConcepts: [] });
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

