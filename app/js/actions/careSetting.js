import axiosInstance from '../config';

const fetchPatientCareSetting = () => ({
  type: 'PATIENT_CARESETTING',
  payload: axiosInstance.get(`caresetting`),
});
export default fetchPatientCareSetting;
