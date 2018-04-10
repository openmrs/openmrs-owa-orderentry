import moxios from 'moxios';
import { 
  FETCH_ACTIVE_ORDER_SUCCESS,
  FETCH_ACTIVE_ORDER_ERROR 
} from '../../app/js/actions/actionTypes';
import activeOrderAction from '../../app/js/actions/activeOrderAction';

import mockData from '../../__mocks__/mockData';
import locationMock from '../../__mocks__/locationMock';
import apiBaseUrl from '../../app/js/actions/apiBaseUrl';

const careSetting = '6f0c9a92-6f24-11e3-af88-005056821db0';
const patientUuid = '8ef56d8e-9aa6-4713-8228-35c51edf1821';

window.location = locationMock;

describe('Active order actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should fetch active orders', (done) => {
    const { defaultpatientActiveOrder } = mockData;
    let request = moxios.requests.mostRecent();
    moxios.stubRequest(`/order?careSetting=${careSetting}&patient=${patientUuid}&t=drugorder&v=full`, {
      status: 200,
      response: defaultpatientActiveOrder
    });

    const expectedActions = [{
      type: FETCH_ACTIVE_ORDER_SUCCESS,
      activeOrders: defaultpatientActiveOrder.activeOrders
    }];

    const store = mockStore({});
    
    store.dispatch(activeOrderAction(careSetting, patientUuid))
      .then(() => {  
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
  });
});
