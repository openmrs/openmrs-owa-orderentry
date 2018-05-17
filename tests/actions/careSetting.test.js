import {
    fetchPatientCareSettingActionCreator,
    fetchPatientCareSettingError,
    fetchPatientCareSetting,
} from '../../app/js/actions/careSetting';
import {
    PATIENT_CARESETTING_SUCCESS,
    PATIENT_CARESETTING_ERROR,
    NETWORK_ERROR,
} from '../../app/js/actions/actionTypes';

describe('Caresetting actions', () => {
    it('should fetch careSetting successfully', () => {
        const careSetting = 'outpatient';
        const expectedAction = {
            type: PATIENT_CARESETTING_SUCCESS,
            patientCareSetting: careSetting
        };
        expect(fetchPatientCareSettingActionCreator(careSetting)).toEqual(expectedAction);
    });

    it('should create an error action when there is an error', () => {
        const error = 'Not found';
        const expectedAction = {
            type: PATIENT_CARESETTING_ERROR,
            error,
        };
    });

    describe('should make api call for careSetting', () => {
        beforeEach(() => {
            moxios.install();
        });

        it('should dispatch `PATIENT_CARESETTING_SUCCESS` when successful', () => {
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: { results: [{outpatient: {uuid: 'AVBSJ-7886-YYBS-63663'}}] },
                });
            });

            const store = mockStore({});
            const expectedAction = {
                type: PATIENT_CARESETTING_SUCCESS
            }
            return store.dispatch(fetchPatientCareSetting())
            .then(() => {
                expect(store.getActions()).toEqual(expect.arrayContaining([expect.objectContaining(expectedAction)]));
            });
        });

        it('should dispatch `PATIENT_CARESETTING_ERROR` when there is an error', () => {
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.reject({
                    status: 404,
                    response: {
                        message: "Please login",
                    }
                });
            });

            const store = mockStore({});
            const expectedAction = {
                type: PATIENT_CARESETTING_ERROR
            }
            return store.dispatch(fetchPatientCareSetting())
            .then(() => {
                expect(store.getActions()).toEqual(expect.arrayContaining([expect.objectContaining(expectedAction)]));
            });
        });

        it ('should dispatch `NETWORK_ERROR` when there is a network error', () => {
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.reject({
                    status: 500,
                });
            });

            const store = mockStore({});
            const expectedAction = {
                type: NETWORK_ERROR
            }
            return store.dispatch(fetchPatientCareSetting())
            .then(() => {
                expect(store.getActions()).toEqual(expect.arrayContaining([expect.objectContaining(expectedAction)]));
            });
        });

        afterEach(() => {
            moxios.uninstall();
        });
    });
});
