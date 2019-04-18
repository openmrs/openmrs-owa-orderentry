
import axiosInstance from '../config';

const api = {
  fetchEncountersByPatient: (patient, encounterType, provider, location) => axiosInstance.get(`encounter/?patient=${patient}&encounterType=${encounterType}&provider=${provider}&location=${location}&v=full`)
    .then((response) => {
      if (response.status !== 200) {
        throw response;
      } else {
        return response.data;
      }
    }),

  createEncounter: encounter => axiosInstance.post(`encounter`, encounter)
    .then((response) => {
      if (response.status !== 200) {
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
