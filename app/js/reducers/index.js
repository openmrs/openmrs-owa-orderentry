/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import { combineReducers } from 'redux';
import { reducers as openmrsReducers } from '@openmrs/react-components'; // eslint-disable-line
import { reducer as reduxFormReducer } from 'redux-form'; // eslint-disable-line
import pastOrdersReducer from "./pastOrdersReducer";
import locationReducer from './locationReducer';
import noteReducer from './noteReducer';
import patientReducer from './patientReducer';
import orderEntryConfigurations from './orderEntryReducer';
import careSettingReducer from './careSettingReducer';
import drugSearchReducer from './drugSearchReducer';
import encounterReducer from './encounterReducer';
import activeOrderReducer from './activeOrderReducer';
import settingEncounterTypeReducer from './settingEncounterTypeReducer';
import settingEncounterRoleReducer from './settingEncounterRoleReducer';
import encounterRoleReducer from './encounterRoleReducer';
import draftTableReducer from './draftTableReducer';
import addDrugOrderReducer from './addDrugOrderReducer';
import dateFormatReducer from './dateFormatReducer';
import draftLabOrderReducer from './draftLabOrderReducer';
import labOrderableReducer from './labOrders/labOrderableReducer';
import labConceptsReducer from './labOrders/labConceptsReducer';
import fetchLabOrderReducer from './labOrders/fetchLabOrderReducer';
import createLabOrderReducer from './createLabOrderReducer';
import getLabOrderablesReducer from './labOrders/settingLabOrderableReducer';

export default combineReducers({
  openmrs: openmrsReducers,
  form: reduxFormReducer,
  locationReducer,
  noteReducer,
  patientReducer,
  orderEntryConfigurations,
  careSettingReducer,
  drugSearchReducer,
  pastOrdersReducer,
  encounterReducer,
  activeOrderReducer,
  settingEncounterTypeReducer,
  settingEncounterRoleReducer,
  encounterRoleReducer,
  draftTableReducer,
  addDrugOrderReducer,
  dateFormatReducer,
  draftLabOrderReducer,
  labOrderableReducer,
  labConceptsReducer,
  fetchLabOrderReducer,
  createLabOrderReducer,
  getLabOrderablesReducer,
});
