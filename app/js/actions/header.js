import { SET_LOCATIONS, SET_CURRENT_SESSION } from './actionTypes';
import axiosInstance from '../config';

export function fetchLocations() {
  return dispatch => axiosInstance.get(`location`)
    .then((response) => {
      dispatch({
        type: SET_LOCATIONS,
        locationTags: response.data.results,
      });
    });
}

export function fetchCurrentSession() {
  return dispatch => axiosInstance.get(`appui/session`)
    .then((response) => {
      dispatch({
        type: SET_CURRENT_SESSION,
        currentSession: response.data,
      });
    });
}

export function setCurrentLocation(locationUuid) {
  return dispatch => axiosInstance.post(`appui/session`, { location: locationUuid })
    .then((response) => {
      dispatch({
        type: SET_CURRENT_SESSION,
        currentSession: response.data,
      });
    });
}
