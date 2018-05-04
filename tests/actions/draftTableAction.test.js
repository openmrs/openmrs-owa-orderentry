import {
  ADD_DRAFT_ORDER_SUCCESS,
  DELETE_DRAFT_ORDER_SUCCESS,
  DELETE_ALL_DRAFT_ORDERS_SUCCESS
} from '../../app/js/actions/actionTypes';
import {
  addDraftOrder,
  deleteDraftOrder,
  deleteAllDraftOrders,
} from '../../app/js/actions/draftTableAction';

describe('Discontinue Order Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch a draft order successfuly', async (done) => {
    const order = {
      action: 'DISCONTINUE',
      drugName: 'panadol',
      orderNumber: 3
    };

    const expectedActions = {
      ADD_DRAFT_ORDER_SUCCESS,
      order,
    }

    const store = mockStore({});

    await store.dispatch(addDraftOrder(order), () => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch deleting a draft order successfuly', async (done) => {
    const order = {
      action: 'DISCONTINUE',
      drugName: 'panadol',
      orderNumber: 3
    };

    const expectedActions = {
      DELETE_DRAFT_ORDER_SUCCESS,
      order,
    }

    const store = mockStore({});

    await store.dispatch(deleteDraftOrder(order), () => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch deleting all draft orders successfuly', async (done) => {
    const expectedActions = {
      DELETE_ALL_DRAFT_ORDERS_SUCCESS,
    }

    const store = mockStore({});

    await store.dispatch(deleteAllDraftOrders(), () => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
