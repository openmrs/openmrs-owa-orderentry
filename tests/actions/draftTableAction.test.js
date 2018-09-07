import {
  ADD_DRAFT_DRUG_ORDER_SUCCESS,
  DELETE_DRAFT_DRUG_ORDER_SUCCESS,
  DELETE_ALL_DRAFT_DRUG_ORDERS_SUCCESS
} from '../../app/js/actions/actionTypes';
import {
  addDraftOrder,
  deleteDraftOrder,
  deleteAllDrugDraftOrders,
} from '../../app/js/actions/draftTableAction';

describe('Discontinue Order Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch ADD_DRAFT_DRUG_ORDER_SUCCESS successfully', async (done) => {
    const order = {
      action: 'DISCONTINUE',
      drugName: 'panadol',
      orderNumber: 3
    };

    const expectedActions = [{
      type: ADD_DRAFT_DRUG_ORDER_SUCCESS,
      order,
    }];

    const store = mockStore({});

    await store.dispatch(addDraftOrder(order));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it('should dispatch DELETE_DRAFT_DRUG_ORDER_SUCCESS successfully', async (done) => {
    const order = {
      action: 'DISCONTINUE',
      drugName: 'panadol',
      orderNumber: 3
    };

    const expectedActions = [{
      type: DELETE_DRAFT_DRUG_ORDER_SUCCESS,
      order,
    }];

    const store = mockStore({});

    await store.dispatch(deleteDraftOrder(order));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it('should dispatch DELETE_ALL_DRAFT_DRUG_ORDERS_SUCCESS successfully', async (done) => {
    const expectedActions = [{
      type: DELETE_ALL_DRAFT_DRUG_ORDERS_SUCCESS,
    }];

    const store = mockStore({});

    await store.dispatch(deleteAllDrugDraftOrders());
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });
});
