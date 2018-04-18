import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import moxios from 'moxios';

import mockData from '../__mocks__/mockData';
import locationMock from '../__mocks__/locationMock';

process.env.NODE_ENV = 'test';

// React 16 Enzyme adapter
configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const reader = new FileReader();

const contextPath = window.location.href.split('/')[3];
const apiBaseUrl = `/${contextPath}/ws/rest/v1`;

require.extensions['.css'] = () => null;
require.extensions['.png'] = () => null;
require.extensions['.jpg'] = () => null;

global.expect = expect;
global.mockData = mockData;
global.locationMock = locationMock;
global.apiBaseUrl = apiBaseUrl;
global.moxios = moxios;
global.mount = mount;
global.sinon = sinon;
global.shallow = shallow;
global.mockStore = mockStore;
global.navigator = {
    userAgent: 'node.js'
  };
global.document = document;


var documentRef = document;
