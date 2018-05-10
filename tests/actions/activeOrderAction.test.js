import {
  FETCH_ACTIVE_ORDER_SUCCESS,
  FETCH_ACTIVE_ORDER_ERROR
} from '../../app/js/actions/actionTypes';
import {
  activeOrderAction,
  activeOrderActionCreator,
  activeOrderActionError
} from '../../app/js/actions/activeOrderAction';

const careSetting = '6f0c9a92-6f24-11e3-af88-005056821db0';
const patientUuid = '8ef56d8e-9aa6-4713-8228-35c51edf1821';

describe('Active order actions', () => {  
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should fetch active orders', (done) => {
    const { defaultpatientActiveOrder } = mockData;
    let request = moxios.requests.mostRecent();
    moxios.stubRequest(`/order?totalCount=true&limit=10&startIndex=0&careSetting=${careSetting}&patient=${patientUuid}&t=drugorder&v=full`, {
      status: 200,
      response: defaultpatientActiveOrder
    });

    const expectedActions = [{
      type: FETCH_ACTIVE_ORDER_SUCCESS,
      activeOrders: defaultpatientActiveOrder.activeOrders
    }];

    const store = mockStore({});

    store.dispatch(activeOrderAction(10,'',careSetting, patientUuid))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
  });
  it('should dispatch FETCH_ACTIVE_ORDER_ERROR',(done) => {
    const store = mockStore({});
    moxios.stubRequest(`/order?totalCount=true&limit=10&startIndex=0&careSetting=${careSetting}&patient=${patientUuid}&t=drugorder&v=full`, {
        status: 500,
        error: {
            response: "Internal Server Error"
        }
    });
    const expectedActions = [
      FETCH_ACTIVE_ORDER_ERROR
    ]
    store.dispatch(activeOrderAction(10,'',careSetting, patientUuid))
    .then ( () => {
        const actionType = store.getActions().map(action => action.type);
        expect(actionType).toEqual(expectedActions);
    });
    done();
  });
  it('should dispatch FETCH_ACTIVE_ORDER_SUCCESS action', () => {
    const store = mockStore({});
    const expectedAction = [ FETCH_ACTIVE_ORDER_SUCCESS ]
    store.dispatch(activeOrderActionCreator([],1,''))
    const actionType = store.getActions().map(action => action.type);
    expect(actionType).toEqual(expectedAction);
  });

  it('should dispatch FETCH_ACTIVE_ORDER_ERROR action', () => {
    const store = mockStore({});
    const expectedAction = [FETCH_ACTIVE_ORDER_ERROR]
    store.dispatch(activeOrderActionError())
    const actionType = store.getActions().map(action => action.type);
    expect(actionType).toEqual(expectedAction);
});
});
