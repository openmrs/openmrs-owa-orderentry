import { TOGGLE_DRAFT_LAB_ORDER_URGENCY } from '../../app/js/actions/actionTypes';

import toggleDraftLabOrderUrgency from '../../app/js/actions/draftActions';

describe('Draft Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it(`should dispatch TOGGLE_DRAFT_LAB_ORDER_URGENCY 
      and set order urgency to STAT if order has no urgency`, async (done) => {
      const labOrder = { uuid: 'abxzy-123'};
      const expectedActions = [{
        type: TOGGLE_DRAFT_LAB_ORDER_URGENCY,
        order: {
          orderUuid: labOrder.uuid, 
          orderUrgency: 'STAT',
        },
      }];
      const store = mockStore({});
      await store.dispatch(toggleDraftLabOrderUrgency(labOrder));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  it(`should dispatch TOGGLE_DRAFT_LAB_ORDER_URGENCY 
      and set order urgency to ROUTINE if urgency was STAT`, async (done) => {
      const labOrder = { uuid: 'abxzy-123', urgency: 'STAT' };
      const expectedActions = [{
        type: TOGGLE_DRAFT_LAB_ORDER_URGENCY,
        order: {
          orderUuid: labOrder.uuid, 
          orderUrgency: 'ROUTINE',
        },
      }];
      const store = mockStore({});
      await store.dispatch(toggleDraftLabOrderUrgency(labOrder));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
    it(`should dispatch TOGGLE_DRAFT_LAB_ORDER_URGENCY 
      and set order urgency to STAT if urgency was ROUTINE`, async (done) => {
      const labOrder = { uuid: 'abxzy-123', urgency: 'ROUTINE' };
      const expectedActions = [{
        type: TOGGLE_DRAFT_LAB_ORDER_URGENCY,
        order: {
          orderUuid: labOrder.uuid, 
          orderUrgency: 'STAT',
        },
      }];
      const store = mockStore({});
      await store.dispatch(toggleDraftLabOrderUrgency(labOrder))
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
});
