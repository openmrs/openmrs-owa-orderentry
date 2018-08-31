import { TOGGLE_DRAFT_LAB_ORDER_URGENCY } from './actionTypes';
import constants from '../utils/constants';

const toggleDraftLabOrderUrgency = (order) => {
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

export default toggleDraftLabOrderUrgency;
