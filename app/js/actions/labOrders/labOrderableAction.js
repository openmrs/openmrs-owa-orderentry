import axiosInstance from '../../config';
import { CONCEPT_REP } from '../../utils/constants';

const getLabOrderablesConceptSet = value => ({
  type: 'FETCH_LAB_ORDERABLES',
  payload: axiosInstance.get(`/concept/${value}?v=${CONCEPT_REP}`),
});


export default getLabOrderablesConceptSet;
