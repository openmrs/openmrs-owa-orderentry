import {
    POST_DRUG_ORDER_SUCCESS,
    POST_DRUG_ORDER_FAILURE
} from '../../app/js/actions/actionTypes';
import addDrugOrderReducer from '../../app/js/reducers/addDrugOrderReducer';

const addedOrder = mockData.addedOrder;
const error = mockData.addedOrderError

describe('addDrugOrderReducer reducer test-suite', () => {
    const initialState = {
        addedOrder: {},
        errorMessage: '',
        status: {
          error: false,
          added: false,
        },
      };
    it(`parses payload from action to key addedOrder and sets status key 
    added to true on POST_DRUG_ORDER_SUCCESS action type`, () => {
        const action = {
            type: POST_DRUG_ORDER_SUCCESS,
            data: { id: 1, type: 'drugorder'},
        }
        const expectedState = {
            ...initialState,
            addedOrder: { id: 1, type: 'drugorder'},
            status: {
              error: false,
              added: true,
            }
        };
        const newState = addDrugOrderReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });
    it(`parses payload error message from action to key errorMessage and
    sets status key error to true on POST_DRUG_ORDER_FAILURE action type`, () => {
        const action = {
            type: POST_DRUG_ORDER_FAILURE,
            payload: { response: { data: { error: { message: 'Another error' }}}},
        }
        const expectedState = {
            ...initialState,
            errorMessage: 'Another error',
            status: {
                error: true,
                added: false,
            }
        };
        const newState = addDrugOrderReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });
});
