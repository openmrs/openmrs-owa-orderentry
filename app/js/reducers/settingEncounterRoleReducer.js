import mockData from '../../../__mocks__/mockData';
import {
  SETTING_ENCOUNTER_ROLE_SUCCESS,
  SETTING_ENCOUNTER_ROLE_FAILURE,
  SETTING_ENCOUNTER_ROLE_LOADING,
} from '../../../app/js/actions/actionTypes';

const settingEncounterRoleReducer = (
  state = mockData.defaultSettingEncounterRole,
  action,
) => {
  switch (action.type) {
    case SETTING_ENCOUNTER_ROLE_SUCCESS:
      return { ...state, settingEncounterRole: action.configuration };
    case SETTING_ENCOUNTER_ROLE_LOADING:
      return { ...state, isLoading: action.status };
    case SETTING_ENCOUNTER_ROLE_FAILURE:
      return { ...state, roleError: action.error };
    default:
      return state;
  }
};

export default settingEncounterRoleReducer;
