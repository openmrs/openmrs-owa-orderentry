import {
  fetchPatientRecord,
  fetchPatientNote,
} from '../../app/js/actions/patient';
import {
  SET_PATIENT, SET_NOTE, SET_PATIENT_FAILED
} from '../../app/js/actions/actionTypes';

window.location = locationMock;

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

  it('fetch patient records failure case', async (done) => {
    let request = moxios.requests.mostRecent();
    moxios.stubRequest(`${apiBaseUrl}/patient/${uuid}?v=custom:(patientId,uuid,patientIdentifier:(uuid,identifier),person:(gender,age,birthdate,birthdateEstimated,personName,preferredAddress),attributes:(value,attributeType:(name)))`, {
      status: 400,
      response: { message: "No record found" }
    });
    const expectedActions = [{
      type: SET_PATIENT_FAILED,
    }];
    const store = mockStore({});
    await store.dispatch(fetchPatientRecord(uuid));
    expect(store.getActions()).toEqual(expectedActions);
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
