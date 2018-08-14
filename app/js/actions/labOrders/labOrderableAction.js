import axiosInstance from '../../config';


const getLabOrderablesConceptSet = value => ({
  type: 'FETCH_LAB_ORDERABLES',
  payload: axiosInstance.get(`/concept/${value}?v=full`),
});


export default getLabOrderablesConceptSet;
