import noteReducer from '../../app/js/reducers/noteReducer';

const defaultNote = mockData.defaultNote.results;

describe('Note Reducer', () => {
  describe('SET_NOTE', () => {
    it('set the patient with provided data', () => {
      const initialState = {
        note: []
      };

      const action = {
        type: 'SET_NOTE',
        note: defaultNote,
      };
      const newState = noteReducer(initialState, action);
      expect(newState.note).toEqual(defaultNote);
    });
  });

  it('set state to initial state when no new state is passed',
    () => {
      const action = {
        type: 'SET_NOTE',
        note: defaultNote,
      };
      const newState = noteReducer(undefined, action);
      expect(newState).toEqual({
        note: {
          note: []
        }
      });
    });
});
