import axios from 'axios';
import { SET_LOCATIONS, SET_CURRENT_SESSION } from './actionTypes';

const contextPath = window.location.href.split('/')[3];
const apiBaseUrl = `/${contextPath}/ws/rest/v1`;

export function fetchLocations() {
  return dispatch => axios.get(`${apiBaseUrl}/location`)
    .then((response) => {
      dispatch({
        type: SET_LOCATIONS,
        locationTags: response.data.results,
      });
    });
}

export function fetchCurrentSession() {
  return dispatch => axios.get(`${apiBaseUrl}/appui/session`)
    .then((response) => {
      dispatch({
        type: SET_CURRENT_SESSION,
        currentSession: response.data,
      });
    });
}

export function setCurrentLocation(locationUuid) {
  return dispatch => axios.post(`${apiBaseUrl}/appui/session`, { location: locationUuid })
    .then((response) => {
      dispatch({
        type: SET_CURRENT_SESSION,
        currentSession: response.data,
      });
    });
}
