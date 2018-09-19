import patientReducer from '../../app/js/reducers/patientReducer';

const patient = mockData.defaultPatient.patient;

describe('Patient Reducer', () => {
  describe('SET_PATIENT', () => {
    it('set the patient with provided data', () => {
      const initialState = {
        patient: []
      };

      const action = {
        type: 'SET_PATIENT',
        patient,
      };
      const newState = patientReducer(initialState, action);
      expect(newState.patient).toEqual(patient);
    });

    it('set the patient to empty array if the request fails', () => {
      const initialState = {
        patient: []
      };

      const action = {
        type: 'SET_PATIENT_FAILED',
      };
      const newState = patientReducer(initialState, action);
      expect(newState.patient).toEqual([]);
    });
  });

  it('set state to initial state when no new state is passed',
    () => {
      const action = {
        type: 'SET_PATIENT',
        patient,
      };
      const newState = patientReducer(undefined, action);
      expect(newState).toEqual({ patient });
    });
});
