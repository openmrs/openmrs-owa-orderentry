import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actions from '../../app/js/actions/orderEntryActions';
import * as types from '../../app/js/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe ('Order entry configuration actions', () => {
    it('should create an action to store fetched configurations', () => {
        const configurations = {units: [{ id: 1, name: 'kilograms'}]};
        const expectedAction = {
            type: types.FETCH_ORDER_CONFIG_SUCCESS,
            configurations
        };
        expect(actions.fetchConfigurationsSuccess(configurations)).toEqual(expectedAction);
    });

    it('should create an action to log failure', () => {
        const error = 'No network connection';
        const expectedAction = {
            type: types.FETCH_ORDER_CONFIG_FAILURE,
            error
        };
        expect(actions.fetchConfigurationsFailure(error)).toEqual(expectedAction);
    });

    it('should create action for loading event', () => {
        const status = true;
        const expectedAction = {
            type: types.FETCH_ORDER_CONFIG_LOADING,
            status
        };
        expect(actions.fetchConfigurationsLoading(status)).toEqual(expectedAction);
    });

    describe ('Order Entry Configurations API call', () => {

        beforeEach(() => {
            moxios.install();
        });

        it ('should dispatch `FETCH_ORDER_CONFIG_SUCCESS` after sucessful fetching', () => {
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: {
                        data: []
                    },
                });
            });

            const expectedActions = [
                types.FETCH_ORDER_CONFIG_LOADING,
                types.FETCH_ORDER_CONFIG_LOADING,
                types.FETCH_ORDER_CONFIG_SUCCESS
            ];
            
            const store = mockStore({ configurations: []});

            return store.dispatch(actions.getOrderEntryConfigurations()).then(() => {
                const dispatchedActions = store.getActions();
                const dispatchedActionTypes = dispatchedActions.map(action => action.type);
                expect(dispatchedActionTypes).toEqual(expectedActions);
            });
        });

        it ('should dispatch `FETCH_ORDER_CONFIG_FAILURE` after an error', () => {
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 401,
                    response: {
                        error: 'Not authorised'
                    },
                });
            });

            const expectedActions = [
                types.FETCH_ORDER_CONFIG_LOADING,
                types.FETCH_ORDER_CONFIG_LOADING,
                types.FETCH_ORDER_CONFIG_FAILURE
            ];
            
            const store = mockStore({ configurations: []});

            return store.dispatch(actions.getOrderEntryConfigurations()).then(() => {
                const dispatchedActions = store.getActions();
                const dispatchedActionTypes = dispatchedActions.map(action => action.type);
                expect(dispatchedActionTypes).toEqual(expectedActions);
            });
        });

        afterEach(() => {
            moxios.uninstall();
        });
    });
});
