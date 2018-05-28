import {
  GET_DATE_FAILURE,
  GET_DATE_SUCCESS,
} from '../../app/js/actions/actionTypes';
import dateFormatReducer from '../../app/js/reducers/dateFormatReducer';

describe('Date Format Reducer', () => {
  it('should set the state of a successful added date format', () => {
    const initialState = {
      dateFormat: '',
      error: null
    };

    const dateFormat = 'DD-MMM-YYYY HH:mm';

    const action = {
      type: GET_DATE_SUCCESS,
      dateFormat,
    }

    const newState = dateFormatReducer(initialState, action);
    expect(newState.dateFormat).toEqual(action.dateFormat);
  });

  it('should return an error', () => {
    const initialState = {
      dateFormat: '',
      error: null
    };

    const action = {
      type: GET_DATE_FAILURE,
      error: "User not logged in"
    }

    const newSate = dateFormatReducer(initialState, action);
    expect(newSate.error).toEqual(action.error);
  });
})
