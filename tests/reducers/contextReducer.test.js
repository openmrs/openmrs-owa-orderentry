import {
  SET_CONTEXT
} from '../../app/js/actions/actionTypes';
import contextReducer from '../../app/js/reducers/contextReducer';

describe('context reducer', () => {

  const initialState = {
    orderType: null
  };

  it('default order context should be null', () => {
    const newState = contextReducer(initialState, {});
    expect(newState.orderType).toBeNull();
  });


  it('should set order context', () => {
    const action = {
      type: SET_CONTEXT,
      orderType: "testorder"
    };
    const newState = contextReducer(initialState, action);
    expect(newState.orderType).toEqual("testorder");
  });


});
