import { SELECT_DRUG } from './actionTypes';
import axiosInstance from '../config';

export const selectDrugSuccess = drugUuid => ({
  type: SELECT_DRUG,
  drug: drugUuid,
});

export const selectDrug = drugUuid => (dispatch) => {
  dispatch(selectDrugSuccess(drugUuid));
};

export const searchDrug = text => ({
  type: 'SEARCH_DRUGS',
  payload: axiosInstance.get(`drug?q=${text}`),
});
