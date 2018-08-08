import axiosInstance from '../config';

const fetchEncounterType = value => ({
  type: 'FETCH_ENCOUNTER_TYPE',
  payload: axiosInstance.get(`encountertype?q=${value}`),
});

export default fetchEncounterType;
