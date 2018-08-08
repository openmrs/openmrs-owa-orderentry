import axiosInstance from '../../config';

const fetchLabConcepts = conceptUUID => ({
  type: 'FETCH_LAB_CONCEPTS',
  payload: axiosInstance.get(`/concept/${conceptUUID}`),

});

export default fetchLabConcepts;
