import { NETWORK_ERROR } from './actionTypes';

const networkError = error => ({
  type: NETWORK_ERROR,
  error,
});

export default networkError;
