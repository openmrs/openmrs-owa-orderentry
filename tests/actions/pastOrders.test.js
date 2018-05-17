import {
  LOAD_PAST_ORDERS_SUCCESS,
  LOAD_PAST_ORDERS_FAILURE,
  NETWORK_ERROR
} from '../../app/js/actions/actionTypes';
import { getPastOrders } from '../../app/js/actions/pastOrders';

const limit = 10;
const startIndex = 0;
const patientUuid = '761d8414-6cb4-4456-be4f-232e6f819e06';
const careSetting = '46bd378e-2de1-4cf7-aa75-9351d030948e';

describe('Past order actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should fetch past orders successfully', async (done) => {
    const { pastOrders } = mockData;
    const url = `${apiBaseUrl}/order?totalCount=true&limit=${limit}&startIndex=${startIndex}&careSetting=${careSetting}&patient=${patientUuid}&status=inactive&t=drugorder&v=full`;
    let request = moxios.requests.mostRecent();
    moxios.stubRequest(url,
      {
        status: 200,
        response: pastOrders
      });
    const expectedActions = {
      type: LOAD_PAST_ORDERS_SUCCESS,
    };
    const store = mockStore({});
    await store.dispatch(getPastOrders(limit, startIndex, patientUuid, careSetting))
      .then(() => {
        expect(store.getActions()).toEqual(expect.arrayContaining([expect.objectContaining(expectedActions)]));
      });
    done();
  });

  it('should respond to an error from the api call', async (done) => {
    const { pastOrders } = mockData;
    const url = `${apiBaseUrl}/order?totalCount=true&limit=${limit}&startIndex=${startIndex}&careSetting=${careSetting}&patient=${patientUuid}&status=inactive&t=drugorder&v=full`;
    let request = moxios.requests.mostRecent();
    moxios.stubRequest(url,
      {
        status: 404,
        error: {
          response: "Not found"
        }
      });
    const expectedActions = {
      type: LOAD_PAST_ORDERS_FAILURE,
    };
    const store = mockStore({});
    await store.dispatch(getPastOrders(limit, startIndex, patientUuid, careSetting))
      .then(() => {
        expect(store.getActions()).toEqual(expect.arrayContaining([expect.objectContaining(expectedActions)]));
      });
    done();
  });

  it ('should dispatch `NETWORK_ERROR` when there is a network error', () => {
    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({
            status: 500,
        });
    });

    const store = mockStore({});
    const expectedAction = {
        type: NETWORK_ERROR
    }
    return store.dispatch(getPastOrders(limit, startIndex, patientUuid, careSetting))
    .then(() => {
        expect(store.getActions()).toEqual(expect.arrayContaining([expect.objectContaining(expectedAction)]));
    });
  });
});
