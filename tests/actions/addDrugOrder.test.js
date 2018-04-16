import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import {
    postDrugOrderLoading,
    postDrugOrderSuccess,
    postDrugOrderFailure,
    postDrugOrder, 
} from '../../app/js/actions/addDrugOrder';
import {
    POST_DRUG_ORDER_LOADING,
    POST_DRUG_ORDER_SUCCESS,
    POST_DRUG_ORDER_FAILURE,
} from '../../app/js/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const contextPath = window.location.href.split('/')[3];
const apiBaseUrl = `/${contextPath}/ws/rest/v1`;

describe('addDrugOrder action creators', () => {
    it('should create POST_DRUG_ORDER_LOADING action', () => {
        const store = mockStore({});
        const expectedAction = [ POST_DRUG_ORDER_LOADING ]
        store.dispatch(postDrugOrderLoading())
        const actionType = store.getActions().map(action => action.type);
        expect(actionType).toEqual(expectedAction);
    });
    it('should create POST_DRUG_ORDER_SUCCESS action', () => {
        const store = mockStore({});
        const expectedAction = [ POST_DRUG_ORDER_SUCCESS ]
        store.dispatch(postDrugOrderSuccess())
        const actionType = store.getActions().map(action => action.type);
        expect(actionType).toEqual(expectedAction);
    });
    it('should create POST_DRUG_ORDER_FAILURE action', () => {
        const store = mockStore({});
        const expectedAction = [ POST_DRUG_ORDER_FAILURE]
        store.dispatch(postDrugOrderFailure())
        const actionType = store.getActions().map(action => action.type);
        expect(actionType).toEqual(expectedAction);
    });
});
describe('addDrugOrder post thunk', () => {
    beforeEach( () => {
        moxios.install();
    });
    afterEach( () => {
        moxios.uninstall();
    });
    it('should dispatch POST_DRUG_ORDER_SUCCESS on success', async (done) => {
        const payload = "1 tablet twice daily for 3 days";
        const store = mockStore({});
        moxios.stubRequest(`${apiBaseUrl}/encounter`, {
            status: 201, 
        });
        const expectedActions = [
            POST_DRUG_ORDER_LOADING,
            POST_DRUG_ORDER_SUCCESS
        ]
        await store.dispatch(postDrugOrder(payload))
        .then ( () => {
            const actionType = store.getActions().map(action => action.type);
            expect(actionType).toEqual(expectedActions);
        });
        done(); 
    });
    it('should dispatch POST_DRUG_ORDER_FAILURE on fail', async (done) => {
        const payload = {}
        const store = mockStore({});
        moxios.stubRequest(`${apiBaseUrl}/encounter`, {
            status: 400, 
            error: {
                response: "Bad request"
            }
        });
        const expectedActions = [
            POST_DRUG_ORDER_LOADING,
            POST_DRUG_ORDER_LOADING,
            POST_DRUG_ORDER_FAILURE
        ]
        await store.dispatch(postDrugOrder(payload))
        .then ( () => {
            const actionType = store.getActions().map(action => action.type);
            expect(actionType).toEqual(expectedActions);
        });
        done(); 
    });
});
