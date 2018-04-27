import { LOADING } from './actionTypes';

const loading = (action, status) => ({ type: `${action}_LOADING`, status });

export default loading;
