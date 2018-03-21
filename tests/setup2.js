import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
process.env.NODE_ENV = 'test';

// React 16 Enzyme adapter
configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const reader = new FileReader();

require.extensions['.css'] = () => null;
require.extensions['.png'] = () => null;
require.extensions['.jpg'] = () => null;

global.expect = expect;
global.mount = mount;
global.sinon = sinon;
global.shallow = shallow;
global.mockStore = mockStore;
global.navigator = {
    userAgent: 'node.js'
  };
global.document = document;

var documentRef = document;
