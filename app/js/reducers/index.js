/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import { combineReducers } from 'redux';
import { reducers } from '@openmrs/react-components';
import { reducer } from 'redux-form';
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
import dateFormatReducer from './dateFormatReducer';
import labOrderableReducer from './labOrders/labOrderableReducer';
import labConceptsReducer from './labOrders/labConceptsReducer';
import fetchLabOrderReducer from './labOrders/fetchLabOrderReducer';
import createOrderReducer from './createOrderReducer';
import getLabOrderablesReducer from './labOrders/settingLabOrderableReducer';
import fetchOrdersReducer from './fetchOrdersReducer';
import orderSelectionReducer from './orderSelectionReducer';
import draftReducer from './draftReducer';
import contextReducer from "./contextReducer";

export default combineReducers({
  openmrs: reducers,
  form: reducer,
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
  draftReducer,
  dateFormatReducer,
  labOrderableReducer,
  labConceptsReducer,
  fetchLabOrderReducer,
  createOrderReducer,
  getLabOrderablesReducer,
  fetchOrdersReducer,
  orderSelectionReducer,
  contextReducer,
});
