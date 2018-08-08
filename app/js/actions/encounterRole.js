import axiosInstance from '../config';

const fetchEncounterRole = value => ({
  type: 'FETCH_ENCOUNTER_ROLE',
  payload: axiosInstance.get(`encounterrole?q=${value}`),
});

export default fetchEncounterRole;
