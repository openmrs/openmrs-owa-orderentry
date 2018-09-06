import { TOGGLE_URGENCY } from '../actionTypes';

const toggleUrgency = (previousOrderId, newOrderId, newUrgency) => ({
  type: TOGGLE_URGENCY,
  previousOrderId,
  newOrderId,
  newUrgency,
});

export default toggleUrgency;
