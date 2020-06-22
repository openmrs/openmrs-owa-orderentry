import {
  call,
  takeEvery,
  select,
  put,
} from 'redux-saga/effects';
import { format, addMinutes } from 'date-fns';
import encounterRest from '../rest/encounterRest';
import { DISCONTINUE_ORDER } from '../actions/actionTypes';
import { discontinueOrderSucceeded } from '../actions/createOrder';


const dateToInt = dateStr => new Date(dateStr).getTime();

const getDateRange = (
  data,
  from,
  to,
  path,
) => data.filter((item) => {
  if (item[path]) {
    return (dateToInt(from) <= dateToInt(item[path])) && (dateToInt(to) >= dateToInt(item[path]));
  }
  return true;
});

// eslint-disable-next-line consistent-return
function* getMatchingEncounter(order) {
  const state = yield select();
  const patientUuid = order.patient;
  const encounterTypeUuid = order.encounterType;
  const locationUuid = order.location.uuid;
  const provider = state.encounterRoleReducer.encounterRole.uuid;
  const sessionProvider = state.openmrs.session.currentProvider;
  const duration = format(addMinutes(new Date(), -60));

  try {
    const encounterResponse = yield call(
      encounterRest.fetchEncountersByPatient,
      patientUuid,
      encounterTypeUuid,
      provider,
      locationUuid,
      '(uuid,encounterDatetime,encounterProviders,location:(id,uuid,name))',

    );
    if (encounterResponse.results.length) {
      const withMatchingLocationAndProvider = encounters => encounters.filter((e) => {
        // some locations appear as null, we would just return false
        if (!e.location) return false;

        // if there are no encounterProviders just return false
        if (!e.encounterProviders.length) return false;

        // check for matching Location
        const hasMatchingLocation = e.location.uuid === locationUuid;

        // eslint-disable-next-line
        // loop through encounterProviders and check for matching encounterRole similar to orderentryowa.encounterRole
        // eslint-disable-next-line
        const matchingEncounterProvider = e.encounterProviders.filter(p => p.encounterRole.uuid === provider);

        if (!matchingEncounterProvider.length) return false;

        const matchedProvider = matchingEncounterProvider[0];

        const hasMatchingProvider = matchedProvider.provider.uuid === sessionProvider.uuid;
        return hasMatchingLocation && hasMatchingProvider;
      });
      const matched = withMatchingLocationAndProvider(getDateRange(
        encounterResponse.results,
        duration,
        new Date(),
        'encounterDatetime',
      ));


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
    yield put(discontinueOrderSucceeded(action.orderNumber));
  } catch (e) {
    throw new Error(e);
  }
}

export default function* discontinueOrderSaga() {
  yield takeEvery(DISCONTINUE_ORDER, discontinueOrder);
}
