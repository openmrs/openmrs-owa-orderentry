import {
  LOAD_PAST_ORDERS_SUCCESS,
  LOAD_PAST_ORDERS_FAILURE
} from '../../app/js/actions/actionTypes';
import { getPastOrders } from '../../app/js/actions/pastOrders';

window.location = locationMock;

const uuid = '761d8414-6cb4-4456-be4f-232e6f819e06';
const careSetting = '46bd378e-2de1-4cf7-aa75-9351d030948e';

describe('Past order actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('fetch past orders', (done) => {
    const { pastOrders } = mockData;
    let request = moxios.requests.mostRecent();
    moxios.stubRequest(
    `${apiBaseUrl}/order?careSetting=${careSetting}&patient=${uuid}&status=inactive&t=drugorder&v=full`,
    {
    status: 200,
    response: pastOrders
    });
    const expectedActions = [{
      type: LOAD_PAST_ORDERS_SUCCESS,
      pastOrders:pastOrders
    }];
    const store = mockStore({});
    store.dispatch(getPastOrders(careSetting, uuid))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});
