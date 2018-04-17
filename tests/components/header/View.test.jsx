import React from 'react';
import View from '../../../app/js/components/header/View';

let props;
let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<View {...props} />);
  }
  return mountedComponent;
};

describe('Component: Header: View', () => {
  beforeEach(() => {
    props = {
      currentUser: 'admin',
      currentLocation: {
        display: 'Laboratory'
      },
      locations: [{
        uuid: '6sedds-tahs7hh',
        display: 'Impatient'
      }],
      locationDropdown: true,
      setCurrentLocation: jest.fn(),
      toggleState: jest.fn(),
    };
    mountedComponent = undefined;
  });

  describe('Conditional rendering', () => {
    it('renders properly', () => {
      const component = getComponent();
      expect(component).toMatchSnapshot();
    });

    it('set location option as selected', () => {
      props.locations = [{
        uuid: '6sedds-tahs7hh',
        display: 'Laboratory'
      }];
      const component = getComponent();
      expect(component).toMatchSnapshot();
    });
  });

  describe('Change location action', () => {
    it('calls setCurrentLocation()', () => {
      const setCurrentLocationSpy = jest.spyOn(props, 'setCurrentLocation');
      const setCurrentLocationLink = getComponent().find('.location-container li').first();
      setCurrentLocationLink.simulate('click');

      expect(setCurrentLocationSpy).toHaveBeenCalledTimes(1);
    });
  });
});
