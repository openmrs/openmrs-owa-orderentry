import React from 'react';
import _ from 'lodash';

import ConnectedSearchDrug, {
  SearchDrug
} from '../../../app/js/components/searchDrug';


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
        selected: {},
        drugs: []
      },
      value: 'paracetamol',
      searchDrug: jest.fn(),
      onChange: jest.fn(),
      onOptionSelected: jest.fn(),
      selectDrug: jest.fn(),
      onSelectDrug: jest.fn(),
      focused: false,
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

    it('should call onChange()', () => {
      const event = {
        target: {
          value: "Value"
        },
        preventDefault: jest.fn(),
      };
      sinon.spy(getComponent().instance(), 'onChange');
      getComponent().instance().onChange(event);
      expect(getComponent().instance().onChange.calledOnce)
        .toEqual(true);
    });

    it('should call onOptionSelected()', () => {
      sinon.spy(getComponent().instance(), 'onOptionSelected');
      getComponent().instance().onOptionSelected('6eecdsd-dfdfdfd', 'Panadol');
      expect(getComponent().instance().onOptionSelected.calledOnce)
        .toEqual(true);
    });
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
      const props = {
        onChange: jest.fn(),
        onSelectDrug: jest.fn(),
        focused: false,
      };
      const wrapper = shallow(<ConnectedSearchDrug store={store} {...props}/>);
      expect(wrapper.length).toBe(1);
    });
  });
});
