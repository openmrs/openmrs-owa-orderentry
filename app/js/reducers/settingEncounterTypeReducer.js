import mockData from '../../../__mocks__/mockData';
import {
  SETTING_ENCOUNTER_TYPE_SUCCESS,
  SETTING_ENCOUNTER_TYPE_FAILURE,
  SETTING_ENCOUNTER_TYPE_LOADING,
} from '../../../app/js/actions/actionTypes';

const settingEncounterTypeReducer = (
  state = mockData.defaultSettingEncounterType,
  action,
) => {
  switch (action.type) {
    case SETTING_ENCOUNTER_TYPE_SUCCESS:
      return { ...state, settingEncounterType: action.configuration };
    case SETTING_ENCOUNTER_TYPE_LOADING:
      return { ...state, isLoading: action.status };
    case SETTING_ENCOUNTER_TYPE_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default settingEncounterTypeReducer;
