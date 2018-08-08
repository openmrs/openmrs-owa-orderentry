import {
  FETCH_ACTIVE_ORDER_SUCCESS,
  FETCH_ACTIVE_ORDER_FAILURE,
  NETWORK_ERROR
} from '../../app/js/actions/actionTypes';
import activeOrderAction from '../../app/js/actions/activeOrderAction';

const limit = 10;
const startIndex = 0;
const patientUuid = '4389389b-8366-42fe-b38f-4d995cdf4b5a';
const careSetting = '6f0c9a92-6f24-11e3-af88-005056821db0';


describe('activeOrder action', () => {  
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should fetch active orders successfully', async (done) => {
    const { defaultpatientActiveOrder } = mockData;
    let request = moxios.requests.mostRecent();

    moxios.stubRequest(`${apiBaseUrl}/order?totalCount=true&sort=desc&status=active&limit=${limit}&startIndex=${startIndex}&careSetting=${careSetting}&patient=${patientUuid}&t=drugorder&v=full`, {
      status: 200,
      response: defaultpatientActiveOrder
    });

    const expectedActions = {
      type: FETCH_ACTIVE_ORDER_SUCCESS,
    };

    const store = mockStore({});
    await store.dispatch(activeOrderAction(limit, startIndex, patientUuid, careSetting))
    .then(() => {
      expect(store.getActions()).toEqual(expect.arrayContaining([expect.objectContaining(expectedActions)]));
    });
    done();
  });
});

