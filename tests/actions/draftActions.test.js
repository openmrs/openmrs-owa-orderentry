import {
  TOGGLE_DRAFT_LAB_ORDER_URGENCY,
  SET_SELECTED_ORDER,
  DELETE_DRAFT_DRUG_ORDER_SUCCESS,
  SELECT_DRUG
} from '../../app/js/actions/actionTypes';
import { DRUG_ORDER } from '../../app/js/components/orderEntry/orderTypes';
import { editDraftDrugOrder, toggleDraftLabOrderUrgency } from '../../app/js/actions/draftActions';

describe('Draft Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('editDraftDrugOrder action creator', () => {
    it(`should dispatch SELECT_DRUG, SET_SELECTED_ORDER, DELETE_DRAFT_DRUG_ORDER_SUCCESS`, async (done) => {
      const drugOrder = {
        drug: '1asbcddd-tu7',
        // some other drug order property
      };
      const expectedActions = [
        { type: SELECT_DRUG, drug: drugOrder.drug },
        { type: SET_SELECTED_ORDER, currentOrderType: DRUG_ORDER, order: drugOrder, activity: 'DRAFT_ORDER_EDIT' },
        { type: DELETE_DRAFT_DRUG_ORDER_SUCCESS, order: drugOrder },
      ];
      const store = mockStore({});
      await store.dispatch(editDraftDrugOrder(drugOrder));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('toggleDraftLabOrderUrgency action creator', () => {
    it(`should dispatch TOGGLE_DRAFT_LAB_ORDER_URGENCY 
    and set order urgency to STAT if order has no urgency`, async (done) => {
        const labOrder = { uuid: 'abxzy-123' };
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
});
