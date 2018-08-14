import getOrderEntryConfigurations from '../../app/js/actions/orderEntryActions';
import {
    FETCH_ORDER_CONFIG_LOADING,
    FETCH_ORDER_CONFIG_SUCCESS
} from '../../app/js/actions/actionTypes';


describe('getOrderEntryConfigurations action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
  
    it(`creates FETCH_ORDER_CONFIG_LOADING and FETCH_ORDER_CONFIG_SUCCESS
    action types upon success response from server`, async (done) => {
      moxios.stubRequest(
        `${apiBaseUrl}/orderentryconfig?v=custom:(uuid,display)`,
        {
          status: 200,
          response: {
            data: {units: [{ id: 1, name: 'kilograms'}]},
          },
        },
      );
  
      const expectedTypes = [
        FETCH_ORDER_CONFIG_LOADING,
        FETCH_ORDER_CONFIG_SUCCESS,
      ];
      const store = mockStore({});
  
      return store.dispatch(getOrderEntryConfigurations()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        expect(actionTypes).toEqual(expectedTypes);
        done();
      });
    });
  });
