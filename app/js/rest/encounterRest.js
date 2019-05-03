
import axiosInstance from '../config';
import { DEFAULT_ENCOUNTER_REP } from '../utils/constants';

const api = {
  fetchEncountersByPatient: (patient, encounterType, provider, location, representation) => axiosInstance.get(`encounter/?patient=${patient}&encounterType=${encounterType}&provider=${provider}&location=${location}&v=custom:${representation || DEFAULT_ENCOUNTER_REP}`)
    .then((response) => {
      if (response.status !== 200) {
        throw response;
      } else {
        return response.data;
      }
    }),

  createEncounter: encounter => axiosInstance.post(`encounter`, encounter)
    .then((response) => {
      if (response.status !== 201) {
        throw response;
      } else {
        return response.data;
      }
    }),

  updateEncounter: encounter => axiosInstance.post(`encounter/${encounter.uuid}?v=full`, encounter)
    .then((response) => {
      if (response.status !== 200) {
        throw response;
      } else {
        return response.data;
      }
    }),


};

export default api;
