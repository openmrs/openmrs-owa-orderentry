import {
    postDrugOrder,
    postDrugOrders
} from '../../app/js/actions/addDrugOrder';

import activeOrderAction from '../../app/js/actions/activeOrderAction';
import getPastOrders from '../../app/js/actions/pastOrders';
import {
    POST_DRUG_ORDER_LOADING,
    POST_DRUG_ORDER_SUCCESS,
    POST_DRUG_ORDER_FAILURE,
    FETCH_ACTIVE_ORDER_LOADING,
    LOAD_PAST_ORDERS_LOADING,
    NETWORK_ERROR,
} from '../../app/js/actions/actionTypes';


describe('postDrugOrders action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
  
    it('should post drug orders successfully', async (done) => {
      const payload = "1 tablet twice daily for 3 days";
      moxios.stubRequest(`${apiBaseUrl}/encounter`, {
        status: 201,
      });
  
      const expectedTypes = [
        POST_DRUG_ORDER_LOADING,
        POST_DRUG_ORDER_SUCCESS,
      ];
      
      const store = mockStore({});
      return store.dispatch(postDrugOrders(payload)).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        expect(actionTypes).toEqual(expectedTypes);
        done();
      });
    });
  });

  describe('postDrugOrder action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
  
    it('should dispatch all the individual actions successfully', async (done) => {
      const payload = "1 tablet twice daily for 3 days";
      const limit = 10;
      const startIndex = 0;
      const patientUuid = '4389389b-8366-42fe-b38f-4d995cdf4b5a';
      const careSetting = '6f0c9a92-6f24-11e3-af88-005056821db0';

      moxios.stubRequest(`${apiBaseUrl}/encounter`, {
        status: 201,
      });

      const { defaultpatientActiveOrder, pastOrders } = mockData;  
      moxios.stubRequest(`${apiBaseUrl}/order?totalCount=true&sort=desc&status=active&limit=${limit}&startIndex=${startIndex}&careSetting=${careSetting}&patient=${patientUuid}&t=drugorder&v=full`, {
        status: 200,
        response: defaultpatientActiveOrder
      });

      moxios.stubRequest(`${apiBaseUrl}/order?totalCount=true&sort=desc&status=inactive&limit=${limit}&startIndex=${startIndex}&careSetting=${careSetting}&patient=${patientUuid}&t=drugorder&v=full`,
      {
        status: 200,
        response: pastOrders
      });

      const expectedTypes = [
        POST_DRUG_ORDER_LOADING,
        FETCH_ACTIVE_ORDER_LOADING,
        LOAD_PAST_ORDERS_LOADING
      ];
      
      const store = mockStore({});
      store.dispatch(postDrugOrder(
          payload,
          limit,
          startIndex,
          patientUuid,
          careSetting
      ));

      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedTypes);
      done();
    });
  });
