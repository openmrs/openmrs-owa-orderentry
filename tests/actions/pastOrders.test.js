import {
  LOAD_PAST_ORDERS_SUCCESS,
  LOAD_PAST_ORDERS_LOADING
} from '../../app/js/actions/actionTypes';
import getPastOrders from '../../app/js/actions/pastOrders';

const limit = 10;
const startIndex = 0;
const patientUuid = '761d8414-6cb4-4456-be4f-232e6f819e06';
const careSetting = '46bd378e-2de1-4cf7-aa75-9351d030948e';
const sort = 'desc';

const { pastOrders } = mockData;

describe('getPastOrders action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it(`creates LOAD_PAST_ORDERS_LOADING and LOAD_PAST_ORDERS_SUCCESS
  action types upon success response from server`, async (done) => {
    moxios.stubRequest(
      `${apiBaseUrl}/order?totalCount=true&sort=${sort}&status=inactive&limit=${limit}&startIndex=${startIndex}&careSetting=${careSetting}&patient=${patientUuid}&t=drugorder&v=full`,
      {
        status: 200,
        response: pastOrders,
      },
    );

    const expectedTypes = [
      LOAD_PAST_ORDERS_LOADING,
      LOAD_PAST_ORDERS_SUCCESS,
    ];
    const store = mockStore({});

    return store.dispatch(getPastOrders(
      limit,
      startIndex,
      patientUuid,
      careSetting,
    )).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedTypes);
      done();
    });
  });
});
