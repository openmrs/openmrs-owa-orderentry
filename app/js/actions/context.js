import { SET_CONTEXT } from './actionTypes';

export const setContext = orderType => ({
  type: SET_CONTEXT,
  orderType,
});

export default setContext;
