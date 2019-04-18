import {
  call,
  take,
  takeEvery,
  fork,
  put,
  cancel,
  select,
} from 'redux-saga/effects';
import { format, addMinutes } from 'date-fns';
import encounterRest from '../rest/encounterRest';
import { getDateRange } from '../utils/helpers';
import { DISCONTINUE_ORDER } from '../actions/actionTypes';
import fetchLabOrders from '../actions/labOrders/fetchLabOrders';


// eslint-disable-next-line consistent-return
function* getMatchingEncounter(order) {
  const state = yield select();
  const patientUuid = order.patient;
  const encounterTypeUuid = order.encounterType;
  const locationUuid = order.location.uuid;
  const provider = state.encounterRoleReducer.encounterRole.uuid;
  const duration = format(addMinutes(new Date(), -60));

  try {
    const encounterResponse = yield call(
      encounterRest.fetchEncountersByPatient,
      patientUuid,
      encounterTypeUuid,
      provider,
      locationUuid,
    );
    if (encounterResponse.results.length) {
      const matched = getDateRange(
        encounterResponse.results,
        duration,
        new Date(),
        'encounterDatetime',
      );

      if (matched.length) {
        return {
          encounter: matched[0],
          matched: true,
        };
      }
      return {
        matched: false,
      };
    }
  } catch (e) {
    throw new Error(e);
  }
}


function* discontinueOrder(action) {
  try {
    const matchingEncounter = yield call(getMatchingEncounter, action.order);
    let encounterPayload = {
      ...action.order,
    };
    if (matchingEncounter.matched) {
      encounterPayload = {
        ...encounterPayload,
        uuid: matchingEncounter.encounter.uuid,
      };
      yield call(encounterRest.updateEncounter, encounterPayload);
    } else {
      yield call(encounterRest.createEncounter, encounterPayload);
    }
    window.location.reload();
  } catch (e) {
    throw new Error(e);
  }
}

export default function* discontinueOrderSaga() {
  yield takeEvery(DISCONTINUE_ORDER, discontinueOrder);
}

