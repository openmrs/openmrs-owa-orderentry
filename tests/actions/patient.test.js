import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {
  fetchPatientRecord,
  fetchPatientNote,
} from '../../app/js/actions/patient';

import {
  SET_PATIENT, SET_NOTE
} from '../../app/js/actions/actionTypes';

import mockData from '../../__mocks__/mockData';
import locationMock from '../../__mocks__/locationMock';

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);
window.location = locationMock;

const contextPath = window.location.href.split('/')[3];
const apiBaseUrl = `/${contextPath}/ws/rest/v1`;
const uuid = '6cesf-4hijk-mkls';

describe('Patient actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('fetch patient records', async (done) => {
    const { defaultPatient } = mockData;
    let request = moxios.requests.mostRecent();
    moxios.stubRequest(`${apiBaseUrl}/patient/${uuid}?v=custom:(patientId,uuid,patientIdentifier:(uuid,identifier),person:(gender,age,birthdate,birthdateEstimated,personName,preferredAddress),attributes:(value,attributeType:(name)))`, {
      status: 200,
      response: defaultPatient
    });
    const expectedActions = [{
      type: SET_PATIENT,
      patient: defaultPatient
    }];
    const store = mockStore({});
    await store.dispatch(fetchPatientRecord(uuid))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('fetch patient\'s note', async (done) => {
    const { defaultNote } = mockData;
    moxios.stubRequest(`${apiBaseUrl}/obs?concept=162169AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA&patient=${uuid}&v=full`, {
      status: 200,
      response: defaultNote
    });
    const expectedActions = [{
      type: SET_NOTE,
      note: defaultNote.results
    }];
    const store = mockStore({});
    await store.dispatch(fetchPatientNote(uuid))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});

