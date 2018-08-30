import {
  ADD_PANEL_TO_DRAFT_LAB_ORDER,
  ADD_TEST_TO_DRAFT_LAB_ORDER,
  TOGGLE_DRAFT_LAB_ORDER_URGENCY,
  DELETE_PANEL_FROM_DRAFT_LAB_ORDER,
  DELETE_TEST_FROM_DRAFT_LAB_ORDER,
  DELETE_ALL_ITEMS_IN_DRAFT_LAB_ORDER,
} from '../../app/js/actions/actionTypes';
import {
  addTestToDraft,
  removeTestFromDraft,
  removeTestPanelFromDraft,
  addTestPanelToDraft,
  deleteDraftLabOrder,
} from '../../app/js/actions/draftLabOrderAction';

import { panelData, testsData } from '../../app/js/components/labOrderEntry/labData';

const mockLabDataPanel = panelData;
const mockTests = testsData;

describe('Lab Order Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch an action to delete all draftOrders', async (done) => {
    const expectedActions = {
      DELETE_ALL_ITEMS_IN_DRAFT_LAB_ORDER,
    }
    const store = mockStore({});
    await store.dispatch(deleteDraftLabOrder(), () => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch an action to add single tests to draftOrders', async (done) => {
    const order = mockTests[0];
    const expectedActions = {
      ADD_TEST_TO_DRAFT_LAB_ORDER,
      order,
    }
    const store = mockStore({});
    await store.dispatch(addTestToDraft(order), () => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch an action to remove single tests from the draftOrders', async (done) => {
    const order = mockTests[0];
    const expectedActions = {
      DELETE_TEST_FROM_DRAFT_LAB_ORDER,
      order,
    }
    const store = mockStore({});
    await store.dispatch(removeTestFromDraft(order), () => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch an action to remove a test panel from the draftOrder', async (done) => {
    const orders = mockLabDataPanel[0];
    const expectedActions = {
      DELETE_PANEL_FROM_DRAFT_LAB_ORDER,
      orders,
    }
    const store = mockStore({});
    await store.dispatch(removeTestPanelFromDraft(orders), () => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch an action to add a test panel to the draftOrder', async (done) => {
    const orders = mockLabDataPanel[0];
    const expectedActions = {
      ADD_PANEL_TO_DRAFT_LAB_ORDER,
      orders,
    }
    const store = mockStore({});
    await store.dispatch(addTestPanelToDraft(orders), () => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
