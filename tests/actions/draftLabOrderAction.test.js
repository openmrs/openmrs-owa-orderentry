import {
  ADD_DRAFT_LAB_ORDER,
  DELETE_DRAFT_LAB_ORDER,
} from '../../app/js/actions/actionTypes';
import {
  addDraftLabOrders,
  deleteDraftLabOrder,
} from '../../app/js/actions/draftLabOrderAction';

describe('Lab Order Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch a draft lab order successfuly', async (done) => {
    const orders = [
      { id: 1, test: 'Hemoglobin' },
      { id: 2, test: 'Hematocrit' },
      { id: 3, test: 'blood' },
    ];

    const expectedActions = {
      ADD_DRAFT_LAB_ORDER,
      orders,
    }

    const store = mockStore({});

    await store.dispatch(addDraftLabOrders(orders), () => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });


  it('should dispatch deleting a draft lab order successfuly', async (done) => {
    const order = { id: 1, test: 'Hemoglobin' };

    const expectedActions = {
      DELETE_DRAFT_LAB_ORDER,
      order,
    }

    const store = mockStore({});

    await store.dispatch(deleteDraftLabOrder(order), () => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
