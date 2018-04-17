import { LOADING } from './actionTypes';

const loading = (status, action) => ({ type: `LOADING_${action}`, status });

export default loading;
