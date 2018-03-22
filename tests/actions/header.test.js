import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {
  fetchLocations,
  fetchCurrentSession,
  setCurrentLocation
} from '../../app/js/actions/header';

import {
  SET_LOCATIONS, SET_CURRENT_SESSION
} from '../../app/js/actions/actionTypes';

import mockData from '../../__mocks__/mockData';
import locationMock from '../../__mocks__/locationMock';

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);
window.location = locationMock;

const contextPath = window.location.href.split('/')[3];
const apiBaseUrl = `/${contextPath}/ws/rest/v1`;

describe('Header actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('fetch app locations', async (done) => {
    const { defaultLocations } = mockData;
    let request = moxios.requests.mostRecent()
    moxios.stubRequest(`${apiBaseUrl}/location`, {
      status: 200,
      response: defaultLocations
    });
    const expectedActions = [{
      type: SET_LOCATIONS,
      locationTags: defaultLocations.results
    }];
    const store = mockStore({});
    await store.dispatch(fetchLocations())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('fetch current app session', async (done) => {
    const { defaultSession } = mockData;
    moxios.stubRequest(`${apiBaseUrl}/appui/session`, {
      status: 200,
      response: defaultSession
    });
    const expectedActions = [{
      type: SET_CURRENT_SESSION,
      currentSession: defaultSession
    }];
    const store = mockStore({});
    await store.dispatch(fetchCurrentSession())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('set app location', async (done) => {
    const { defaultSession } = mockData;
    moxios.stubRequest(`${apiBaseUrl}/appui/session`, {
      status: 200,
      response: defaultSession
    });
    const expectedActions = [{
      type: SET_CURRENT_SESSION,
      currentSession: defaultSession
    }];
    const store = mockStore({});
    await store.dispatch(setCurrentLocation('6ecsdfd-sdfdfnnond-dfsfsfs'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});

