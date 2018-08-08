import deepFreeze from 'deep-freeze';
import {
    fetchConfigurationsFailure,
    fetchConfigurationsLoading,
    fetchConfigurationsSuccess
} from '../../app/js/actions/orderEntryActions';
import orderEntryConfigurations from '../../app/js/reducers/orderEntryReducer';


describe('Order Entry Configurations reducer', () => {
    let initialState;
    beforeEach(() => {
        initialState = {
            configurations: [],
            isLoading: false,
            hasError: '',
        };
        deepFreeze(initialState);
    });

    it('should return the initial state', () => {
        const expectedState = orderEntryConfigurations(initialState, {});
        expect(initialState).toEqual(expectedState);
    });

    it('should handle `FETCH_ORDER_CONFIG_SUCCESS`', () => {
        const configurations = {
                careSettings: [{ id: 1, display: 'outpatient' }],
        };
        const expectedState = {
            configurations: {
                careSettings: [{ id: 1, display: 'outpatient' }]
            },
            isLoading: false,
            hasError: ''
        };
        const action = {
            type: 'FETCH_ORDER_CONFIG_SUCCESS',
            data: configurations,
        };
        const actualState = orderEntryConfigurations(initialState, action);
        expect(actualState).toEqual(expectedState);
    });

    it('should handle `FETCH_ORDER_CONFIG_FAILURE`', () => {
        const expectedState = {
            configurations: [],
            isLoading: false,
            hasError: 'Bad request'
        };
        const action = {
            type: 'FETCH_ORDER_CONFIG_FAILURE',
            payload: 'Bad request'
        };
        const actualState = orderEntryConfigurations(initialState, action);
        expect(actualState).toEqual(expectedState);
    });

    it('should set the loading status for fetching the order entry configuration',() => {
        const initialState = {};
        const action = {
          type: 'FETCH_ORDER_CONFIG_LOADING',
          status:true
        };
        const newState = orderEntryConfigurations(initialState, action);
        expect(newState.isLoading).toEqual(action.status);
      });
});
