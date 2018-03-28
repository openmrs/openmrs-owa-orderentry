import React from 'react';
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import _ from 'lodash';

import ConnectedSearchDrug, {
  SearchDrug
} from '../../../app/js/components/searchDrug';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let props;
let mountedComponent;
let clock;

jest.useFakeTimers();

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<SearchDrug {...props} />);
  }
  return mountedComponent;
};

describe('Component: SearchDrug: Container', () => {
  beforeEach(() => {
    props = {
      drugSearch: {
        drugs: []
      },
      searchDrug: jest.fn(),
    };
    mountedComponent = undefined;
  });

  it('should render properly', () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });

  describe('Interactions', () => {
    beforeEach(function () {
      clock = sinon.useFakeTimers();
    });

    afterEach(function () {
      clock.restore();
    });

    it('should call searchDrug() with debounce feature', () => {
      const searchDrugSpy = sinon.spy(props, 'searchDrug');
      sinon.spy(getComponent().instance(), 'searchDrug');
      getComponent().instance().searchDrug('para');
      expect(getComponent().instance().searchDrug.calledOnce)
        .toEqual(true);

      clock.tick(500);
      expect(searchDrugSpy).toHaveBeenCalled();
    });

    it('should not call searchDrug()', () => {
      const searchDrugSpy = sinon.spy(props, 'searchDrug');
      sinon.spy(getComponent().instance(), 'searchDrug');
      getComponent().instance().searchDrug('  ');

      clock.tick(500);
      expect(searchDrugSpy).not.toHaveBeenCalled();
    });
  });


  describe('timer tests', function () {


  });

  describe('Connected SearchDrug component', () => {
    it('component successfully rendered', () => {
      const store = mockStore({
        drugSearchReducer: {
          drugs: [],
          loading: false,
          error: null
        }
      });
      const wrapper = shallow(<ConnectedSearchDrug store={store} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
