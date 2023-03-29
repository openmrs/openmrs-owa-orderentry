import { SET_REDIRECT_TO_ADD_RESULTS } from './actionTypes';

// redirect is true/false whether to redirect to the add results page
const setRedirectToAddResults = redirectToAddResults => ({
    type: SET_REDIRECT_TO_ADD_RESULTS,
    redirectToAddResults,
});

export default setRedirectToAddResults;
