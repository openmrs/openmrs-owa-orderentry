import { DELETE_DRAFT_DRUG_ORDER_SUCCESS, TOGGLE_DRAFT_LAB_ORDER_URGENCY } from './actionTypes';
import { DRUG_ORDER } from '../components/orderEntry/orderTypes';
import { selectDrugSuccess } from './drug';
import { setSelectedOrder } from './orderAction';
import {
  removeTestFromDraft,
  removeTestPanelFromDraft,
  deleteDraftLabOrder,
} from '../actions/draftLabOrderAction';
import { deleteAllDrugDraftOrders } from './draftTableAction';
import constants from '../utils/constants';

export const toggleDraftLabOrderUrgency = (order) => {
  const urgencyTypeToggled = {
    ROUTINE: constants.STAT,
    STAT: constants.ROUTINE,
  };
  const orderUuid = order.uuid;
  let orderUrgency;
  const hasUrgencyProperty = Object.prototype.hasOwnProperty.call(order, 'urgency');
  orderUrgency = constants.STAT;
  if (hasUrgencyProperty) {
    orderUrgency = urgencyTypeToggled[order.urgency];
  }
  const draftOrder = {
    orderUuid,
    orderUrgency,
  };
  return {
    type: TOGGLE_DRAFT_LAB_ORDER_URGENCY,
    order: draftOrder,
  };
};

export const deleteDraftOrder = order => ({
  type: DELETE_DRAFT_DRUG_ORDER_SUCCESS,
  order,
});

export const editDraftDrugOrder = order => (dispatch) => {
  dispatch(selectDrugSuccess(order.drug));
  dispatch(setSelectedOrder({
    currentOrderType: DRUG_ORDER,
    order,
    activity: 'DRAFT_ORDER_EDIT',
  }));
  dispatch(deleteDraftOrder(order));
};

export const discardTestsInDraft = (test = {}) => (dispatch) => {
  if (test.draftType === 'single') return dispatch(removeTestFromDraft(test.order));
  if (test.draftType === 'panel') return dispatch(removeTestPanelFromDraft(test.order));
  if (test.draftType === 'drugorder') return dispatch(deleteDraftOrder(test.order));
  dispatch(deleteDraftLabOrder());
  return dispatch(deleteAllDrugDraftOrders());
};
