import {
    POST_DRUG_ORDER_SUCCESS,
    POST_DRUG_ORDER_FAILURE
} from '../../app/js/actions/actionTypes';
import addDrugOrderReducer from '../../app/js/reducers/addDrugOrderReducer';

const addedOrder = mockData.addedOrder;
const error = mockData.addedOrderError

describe('addDrugOrderReducer reducer for post actions', () => {
    const initialState = {
        addedOrder: {},
        error: null,
      };
    it('should return addedOrder payload', () => {
        const action = {
            type: POST_DRUG_ORDER_SUCCESS,
            addedOrder,
        }
        const expected = {
            addedOrder: addedOrder.response,
            error: null,
        };
        const newSate = addDrugOrderReducer(initialState, action);
        expect(newSate).toEqual(expected);
    });
    it('should return an error', () => {
        const action = {
            type: POST_DRUG_ORDER_FAILURE,
            error,
        }
        const expected = {
            addedOrder: {},
            error: error.response,
        };
        const newSate = addDrugOrderReducer(initialState, action);
        expect(newSate).toEqual(expected);
    });
});
