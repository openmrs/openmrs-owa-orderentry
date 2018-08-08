import {
  PATIENT_CARESETTING_SUCCESS,
  PATIENT_CARESETTING_ERROR,
} from './actionTypes';
import axiosInstance from '../config';

const fetchPatientCareSetting = () => ({
  type: 'PATIENT_CARESETTING',
  payload: axiosInstance.get(`caresetting`),
});
export default fetchPatientCareSetting;
